import { Scene } from 'phaser'
import { GameObjectType } from './elements/GameObjectType';
import { TMap, TObject } from './elements/level-core/TInterfaces';
import { SceneObject } from './elements/SceneObject';
import * as SpriteBodyProvider from './elements/level-core/SpriteBodyProvider';

const LAYER = "objects";
const sceneObjectMap = new Map<string, SceneObject>(); //object name
let _scene: Scene;

export function load(tmap: TMap, scene: Scene) {
    _scene = scene;
    tmap.layers.forEach(lay => {
        if (lay.name === LAYER) {
            lay.objects.forEach(obj => createObject(obj));
        }
    });
}

export function get(name: string): SceneObject {
    return sceneObjectMap.get(name);
}

function createObject(obj: TObject) {
    const sceneObject = factory(obj);
    if (sceneObject) {
        sceneObjectMap.set(obj.name, sceneObject);
    }
}

function factory(obj: TObject): SceneObject {
    switch (obj.type) {

        case GameObjectType.BALL:
            return createSceneObjectWithImage(obj);

        case GameObjectType.BOARD:
            return createSceneObjectWithImage(obj);

        case GameObjectType.SENSOR:
            return createSensor(obj);
    }

    return null;
}

function createSceneObjectWithImage(obj: TObject): SceneObject {
    const sceneObject = new SceneObject(obj.name, obj.type);
    sceneObject.image = createImage(obj);
    return sceneObject;
}

function createImage(obj: TObject): Phaser.Physics.Matter.Image {
    const x = obj.x + obj.width / 2;
    const y = obj.y - obj.height / 2;
    const image = _scene.matter.add.image(x, y, obj.name);
    const body = SpriteBodyProvider.get(obj.type);
    if (body) {
        image.setBody(body.setterConf, body.bodyConf);
    }
    return image;
}

function createSensor(obj: TObject): SceneObject {
    const sceneObject = new SceneObject(obj.name, obj.type);
    const centerX = obj.x + obj.width / 2;
    const centerY = obj.y + obj.height / 2;
    sceneObject.body = _scene.matter.add.rectangle(centerX, centerY, obj.width, obj.height, {
        isStatic: true,
        isSensor: true,
    });
    return sceneObject;
}
