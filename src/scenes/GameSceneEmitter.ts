import { Ball } from "./elements/Ball";

const emitter = new Phaser.Events.EventEmitter();
// emitter.emit('addImage', 200, 300);

export function onLooseBall(callback: (ball: Ball) => void): void {
    emitter.on('onLooseBall', callback);
}

export function fireLooseBall(ball: Ball) {
    emitter.emit('onLooseBall', ball);
}
