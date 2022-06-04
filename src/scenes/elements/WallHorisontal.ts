import { AbstractGameObject } from './AbstractGameObject';
import { Ball } from './Ball';
import { SceneObject } from './SceneObject';

export class WallHorisontal extends AbstractGameObject {

    constructor(sceneObject: SceneObject) {
        super(sceneObject);
    }

    bind(ball: Ball) {
        this.setOnCollideWith(ball, () => {
            ball.flipVelocityY();
        });
    }
}
