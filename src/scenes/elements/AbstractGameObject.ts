import { BodyType } from 'matter';
import * as Phaser from 'phaser'
import { Ball } from './Ball';
import { SceneObject } from './SceneObject';

export abstract class AbstractGameObject {

    private _sceneObject: SceneObject;

    constructor(sceneObject: SceneObject) {
        this._sceneObject = sceneObject;
    }

    abstract bind(ball: Ball): void;

    get sceneObject(): SceneObject {
        return this._sceneObject;
    }

    public get image(): Phaser.Physics.Matter.Image {
        return this._sceneObject.image;
    }

    public get body(): BodyType {
        return this._sceneObject.body;
    }

    public get text(): Phaser.GameObjects.Text {
        return this._sceneObject.text;
    }

    public setOnCollideWith(obj: AbstractGameObject, callback: () => void) {
        this.body.setOnCollideWith(obj.body, callback);
    }

    public toString(): string {
        return "name: " + this._sceneObject.name + "\n" +
            "type: " + this._sceneObject.type +
            JSON.stringify(Phaser.Utils.Objects.Pick(this.body, ['position', 'velocity']), null, 2);
    }
}