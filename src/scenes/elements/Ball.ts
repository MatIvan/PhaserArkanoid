import * as Phaser from 'phaser';
import { AbstractGameObject } from './AbstractGameObject';
import { Board } from "./Board";
import { SceneObject } from "./SceneObject";

export class Ball extends AbstractGameObject {
    private _speed: number;

    constructor(sceneObject: SceneObject) {
        super(sceneObject);
        this._speed = 5;
    }

    getSpeedAsString(): string {
        const { x, y } = this.body.velocity;
        const length = Math.sqrt(x * x + y * y);
        const speed = Math.round(length * 10) / 10;
        return speed.toString();
    }

    flipVelocityX() {
        const { x, y } = this.body.velocity;
        this.image.setVelocity(-x, y);
    }

    flipVelocityY() {
        const { x, y } = this.body.velocity;
        this.image.setVelocity(x, -y);
    }

    start() {
        const d = Phaser.Math.FloatBetween(-0.2, 0.2);
        const v = new Phaser.Math.Vector2(d, -1).scale(this._speed);
        this.image.setVelocity(v.x, v.y);
    }

    update(board: Board, isFollow: boolean) {
        if (isFollow) {
            const { x, y, height } = board.image;
            this.image.setVelocity(0, 0);
            this.image.setPosition(x, y - height);
        }
    }
}