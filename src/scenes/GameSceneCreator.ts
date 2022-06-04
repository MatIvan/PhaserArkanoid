import { Scene } from 'phaser'
import { GameObjectType } from './elements/GameObjectType';
import { TMap, TObject } from './elements/level-core/TInterfaces';
import { SceneObject } from './elements/SceneObject';
import * as SpriteBodyProvider from './elements/level-core/SpriteBodyProvider';

export function load(tmap: TMap, scene: Scene, layerName: string): Map<string, SceneObject> {
    const sceneObjectMap = new Map<string, SceneObject>(); //object name
    tmap.layers.forEach(lay => {
        if (lay.name === layerName) {
            lay.objects.forEach(obj => {
                const sceneObject = factory(obj, scene);
                if (sceneObject) {
                    sceneObjectMap.set(obj.name, sceneObject);
                }
            });
        }
    });
    return sceneObjectMap;
}

function factory(obj: TObject, scene: Scene): SceneObject {
    switch (obj.type) {

        case GameObjectType.BALL:
            return createSceneObjectWithImage(obj, scene);

        case GameObjectType.BOARD:
            return createSceneObjectWithImage(obj, scene);

        case GameObjectType.SENSOR:
            return createSensor(obj, scene);
    }

    return null;
}

function createSceneObjectWithImage(obj: TObject, scene: Scene): SceneObject {
    const sceneObject = new SceneObject(obj.name, obj.type);
    sceneObject.image = createImage(obj, scene);
    return sceneObject;
}

function createImage(obj: TObject, scene: Scene): Phaser.Physics.Matter.Image {
    const x = obj.x + obj.width / 2;
    const y = obj.y - obj.height / 2;
    const image = scene.matter.add.image(x, y, obj.name);
    const body = SpriteBodyProvider.get(obj.type);
    if (body) {
        image.setBody(body.setterConf, body.bodyConf);
    }
    return image;
}

function createSensor(obj: TObject, scene: Scene): SceneObject {
    const sceneObject = new SceneObject(obj.name, obj.type);
    const centerX = obj.x + obj.width / 2;
    const centerY = obj.y + obj.height / 2;
    sceneObject.body = scene.matter.add.rectangle(centerX, centerY, obj.width, obj.height, {
        isStatic: true,
        isSensor: true,
    });
    return sceneObject;
}
