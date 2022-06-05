import { AbstractGameObject } from "./AbstractGameObject";
import { Ball } from "./Ball";
import { Board } from "./Board";
import { Brick1 } from "./Brick1";
import { TextLabel } from "./TextLabel";
import { GameObjectNames, GameObjectType } from "./GameObjectType";
import { LooseBallSensor } from "./LooseBallSensor";
import { SceneObject } from "./SceneObject";
import { WallHorisontal } from "./WallHorisontal";
import { WallVertical } from "./WallVertical";

export function create(sceneObj: SceneObject): AbstractGameObject {
    let obj: AbstractGameObject = null;
    obj = createByName(sceneObj);
    if (obj === null) {
        obj = createByType(sceneObj);
    }
    return obj;
}

function createByName(sceneObj: SceneObject): AbstractGameObject {
    switch (sceneObj.name) {

        case GameObjectNames.BALL:
            return new Ball(sceneObj);

        case GameObjectNames.BOARD:
            return new Board(sceneObj);

        case GameObjectNames.SENSOR.TOP:
            return new WallHorisontal(sceneObj);

        case GameObjectNames.SENSOR.LEFT:
            return new WallVertical(sceneObj);

        case GameObjectNames.SENSOR.RIGHT:
            return new WallVertical(sceneObj);

        case GameObjectNames.SENSOR.BOTTOM:
            return new LooseBallSensor(sceneObj);

    }
    return null;
}

function createByType(sceneObj: SceneObject): AbstractGameObject {
    switch (sceneObj.type) {

        case GameObjectType.BRICK1:
            return new Brick1(sceneObj);

        case GameObjectType.TEXT:
            return new TextLabel(sceneObj);

    }
    return null;
}
