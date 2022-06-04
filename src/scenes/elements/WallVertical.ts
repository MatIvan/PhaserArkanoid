import { AbstractGameObject } from './AbstractGameObject';
import { Ball } from './Ball';
import { SceneObject } from './SceneObject';

export class WallVertical extends AbstractGameObject {

    constructor(sceneObject: SceneObject) {
        super(sceneObject);
    }

    bind(ball: Ball) {
        this.setOnCollideWith(ball, () => {
            ball.flipVelocityX();
        });
    }
}
