import { AbstractGameObject } from "./AbstractGameObject";
import { Ball } from "./Ball";
import { SceneObject } from "./SceneObject";

export class TextLabel extends AbstractGameObject {

    constructor(sceneObject: SceneObject) {
        super(sceneObject);
    }

    setText(text: string) {
        this.text.setText(text);
    }

    bind(ball: Ball) {
        //do nothing
    }
}