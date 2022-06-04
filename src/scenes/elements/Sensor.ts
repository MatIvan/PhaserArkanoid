import { AbstractGameObject } from './AbstractGameObject';
import { SceneObject } from './SceneObject';

export class Sensor extends AbstractGameObject {

    constructor(sceneObject: SceneObject) {
        super(sceneObject);
    }

}
