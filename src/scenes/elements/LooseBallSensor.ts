import { AbstractGameObject } from './AbstractGameObject';
import { Ball } from './Ball';
import { SceneObject } from './SceneObject';
import { fireLooseBall } from '../GameSceneEmitter';

export class LooseBallSensor extends AbstractGameObject {

    constructor(sceneObject: SceneObject) {
        super(sceneObject);
    }

    bind(ball: Ball) {
        this.setOnCollideWith(ball, () => {
            fireLooseBall(ball);
        });
    }
}
