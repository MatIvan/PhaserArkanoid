import { AbstractGameObject } from "./AbstractGameObject";
import { Ball } from "./Ball";
import { SceneObject } from "./SceneObject";
import { fireBrickDestroed } from '../GameSceneEmitter';
export class Brick2 extends AbstractGameObject {

    constructor(sceneObject: SceneObject) {
        super(sceneObject);
    }

    bind(ball: Ball) {
        this.setOnCollideWith(ball, () => {
            this.image.destroy();
            fireBrickDestroed(this);
        });
    }
}