import { AbstractGameObject } from "./elements/AbstractGameObject";
import { Ball } from "./elements/Ball";

const emitter = new Phaser.Events.EventEmitter();

export function onLooseBall(callback: (ball: Ball) => void): void {
    emitter.on('onLooseBall', callback);
}

export function fireLooseBall(ball: Ball) {
    emitter.emit('onLooseBall', ball);
}

export function onBrickTouched(callback: (brick: AbstractGameObject) => void): void {
    emitter.on('onBrickTouched', callback);
}

export function fireBrickTouched(brick: AbstractGameObject) {
    emitter.emit('onBrickTouched', brick);
}

export function onBrickDestroed(callback: (brick: AbstractGameObject) => void): void {
    emitter.on('onBrickDestroed', callback);
}

export function fireBrickDestroed(brick: AbstractGameObject) {
    emitter.emit('onBrickDestroed', brick);
}
