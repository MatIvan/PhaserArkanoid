import * as Phaser from 'phaser'
import { Ball } from './elements/Ball';
import { Board } from './elements/Board';
import { GameObjectNames, GameObjectType } from './elements/GameObjectType';
import * as SpriteBodyProvider from './elements/level-core/SpriteBodyProvider';
import { TMap } from './elements/level-core/TInterfaces';
import * as GameScenePreloader from './GameScenePreloader';
import * as GameSceneCreator from './GameSceneCreator';
import * as GameObjectFactory from './elements/GameObjectFactory';
import { AbstractGameObject } from './elements/AbstractGameObject';
import * as GameSceneEmitter from './GameSceneEmitter';
import { TextLabel } from './elements/TextLabel';


export default class GameScene extends Phaser.Scene {
    private _sceneTMap: TMap;
    private _ball: Ball;
    private _board: Board;

    private _textScore: TextLabel;
    private _textStage: TextLabel;
    private _textSpeed: TextLabel;

    private _dev: Phaser.GameObjects.Text;

    private _level: number;
    private _isFollow = true;

    constructor() {
        super('GameScene')
    }

    preload() {
        GameScenePreloader.preload(this);
    }

    create() {
        this.add.image(0, 0, GameObjectType.BACKGROUND).setOrigin(0);

        this._sceneTMap = this.cache.json.get(GameScenePreloader.SCENE_MAP) as TMap;
        SpriteBodyProvider.load(this._sceneTMap);
        this.createObjects("objects");

        this._dev = this.add.text(0, 0, "", { fontSize: "10px", });

        this.bind();

        this.setLevel(1);
    }

    setLevel(lvl: number) {
        this._level = lvl;
        this._textStage.setText(this._level.toString());

        this.createObjects("level-1");
    }

    bind() {
        this.input.on('pointerup', (pointer: PointerEvent) => {
            if (pointer.button === 0 && this._isFollow) {
                this._isFollow = false;
                this._ball.start();
            }
        });

        GameSceneEmitter.onLooseBall((ball) => { this.looseBall(ball) });
    }

    update(): void {
        this._board.update(this.input);
        this._ball.update(this._board, this._isFollow);
        this._textSpeed.setText(this._ball.getSpeedAsString());
        this._dev.setText(this._ball.toString() + this._board.toString());
    }

    looseBall(ball: Ball) {
        this._isFollow = true;
    }

    createObjects(layerName: string) {
        const gameObjArray: AbstractGameObject[] = [];
        const objArray = GameSceneCreator.load(this._sceneTMap, this, layerName);

        //create
        objArray.forEach(sceneObj => {
            const gameObject = GameObjectFactory.create(sceneObj);
            if (gameObject) {
                gameObjArray.push(gameObject);
                this.saveObject(gameObject);
            }
        });

        //bind
        gameObjArray.forEach(gameObject => gameObject.bind(this._ball));
    }

    saveObject(gameObject: AbstractGameObject) {
        switch (gameObject.sceneObject.name) {

            case GameObjectNames.BALL:
                this._ball = gameObject as Ball;
                break;

            case GameObjectNames.BOARD:
                this._board = gameObject as Board;
                break;

            case GameObjectNames.TEXT.SCORE:
                this._textScore = gameObject as TextLabel;
                break;

            case GameObjectNames.TEXT.STAGE:
                this._textStage = gameObject as TextLabel;
                break;

            case GameObjectNames.TEXT.SPEED:
                this._textSpeed = gameObject as TextLabel;
                break;
        }
    }
}