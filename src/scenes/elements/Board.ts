import * as Phaser from 'phaser';
import { AbstractGameObject } from './AbstractGameObject';
import { Ball } from './Ball';
import { SceneObject } from "./SceneObject";

export class Board extends AbstractGameObject {

    constructor(sceneObject: SceneObject) {
        super(sceneObject);
    }

    update(input: Phaser.Input.InputPlugin) {
        let bx = input.x;
        if (bx > 482) {
            bx = 482;
        } else if (bx < 50) {
            bx = 50;
        }
        this.image.setX(bx);
    }

    bind(ball: Ball) {
        this.setOnCollideWith(ball, () => {
            console.log("Collide with: ", this.toString());
        });
    }
}