import * as Phaser from 'phaser';
import { AbstractGameObject } from './AbstractGameObject';
import { Board } from "./Board";
import { SceneObject } from "./SceneObject";

const VECTOR_MIN_Y = 0.5;

export class Ball extends AbstractGameObject {
    private _speed: number;

    constructor(sceneObject: SceneObject) {
        super(sceneObject);
        this._speed = 5;
        this.image.setFixedRotation();
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

    bind(ball: Ball) {
        this.body.onCollideEndCallback = (pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
            this.updateSpeed();
        }
    }

    updateSpeed(inc?: number) {
        if (inc) {
            this._speed = this._speed * inc;
        }
        const y = this.normaliseVectorY(this.body.velocity.y);
        const v = new Phaser.Math.Vector2(this.body.velocity.x, y)
            .normalize()
            .scale(this._speed);
        this.image.setVelocity(v.x, v.y);
    }

    private normaliseVectorY(y: number) {
        if (y > VECTOR_MIN_Y) {
            return y;
        }
        if (y < -VECTOR_MIN_Y) {
            return y;
        }
        if (y > 0) {
            return VECTOR_MIN_Y;
        }
        return -VECTOR_MIN_Y;
    }
}