import { BodyType } from "matter";
import * as Phaser from 'phaser'

export class SceneObject {
    private _type: string;
    private _name: string;
    private _image: Phaser.Physics.Matter.Image;
    private _text: Phaser.GameObjects.Text;

    private _body: BodyType;

    constructor(name: string, type: string) {
        this._name = name;
        this._type = type;
    }

    public get image(): Phaser.Physics.Matter.Image {
        return this._image;
    }

    public set image(value: Phaser.Physics.Matter.Image) {
        this._image = value;
        this.body = this._image.body as BodyType;
    }

    public get body(): BodyType {
        return this._body;
    }

    public set body(value: BodyType) {
        this._body = value;
    }

    public get type(): string {
        return this._type;
    }

    public get name(): string {
        return this._name;
    }

    public get text(): Phaser.GameObjects.Text {
        return this._text;
    }

    public set text(value: Phaser.GameObjects.Text) {
        this._text = value;
    }
}