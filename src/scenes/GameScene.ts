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

const SCORE_PER_BRICK = 10;

export default class GameScene extends Phaser.Scene {
    private _sceneTMap: TMap;
    private _ball: Ball;
    private _board: Board;

    private _textScore: TextLabel;
    private _textStage: TextLabel;
    private _textSpeed: TextLabel;

    private _dev: Phaser.GameObjects.Text;

    private _level = 0;
    private _isFollow = true;
    private _score = 0;
    private _bricks = 0;

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
        this._updateScore();
        this.nextLevel();
    }

    nextLevel() {
        this._level++;
        this._textStage.setText(this._level.toString());
        this._isFollow = true;
        this.createObjects("level-" + this._level.toString());
    }

    bind() {
        this.input.on('pointerup', (pointer: PointerEvent) => {
            if (pointer.button === 0 && this._isFollow) {
                this._isFollow = false;
                this._ball.start();
            }
        });

        GameSceneEmitter.onLooseBall((ball) => { this.looseBall(ball) });
        GameSceneEmitter.onBrickDestroed((brick) => { this.onBrickDestroed(brick) });
    }

    update(): void {
        this._board.update(this.input);
        this._ball.update(this._board, this._isFollow);
        this._textSpeed.setText(this._ball.getSpeedAsString());
        this._dev.setText(
            this._ball.toString() + "\n" +
            this._board.toString() + "\n" +
            "Bricks: " + this._bricks.toString()
        );
    }

    looseBall(ball: Ball) {
        this._isFollow = true;
    }

    onBrickDestroed(brick: AbstractGameObject) {
        this._score += SCORE_PER_BRICK;
        this._updateScore();
        this._bricks--;
        if (this._bricks <= 0) {
            this.nextLevel();
        }
    }

    private _updateScore() {
        this._textScore.setText(this._score.toString());
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
        const t = gameObject.sceneObject.type;
        if (t === GameObjectType.BRICK1 || t === GameObjectType.BRICK2) {
            this._bricks++;
        }
    }
}