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


export default class GameScene extends Phaser.Scene {
    private _sceneTMap: TMap;
    private _ball: Ball;
    private _board: Board;

    private _text: Phaser.GameObjects.Text;
    private _dev: Phaser.GameObjects.Text;

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

        //ui
        this._text = this.add.text(642, 217, "0", { color: '#00ff00', fontSize: "26px", });
        this._dev = this.add.text(0, 0, "", { fontSize: "10px", });

        this.bind();
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
        this._text.setText(this._ball.getSpeedAsString());
        this._dev.setText(this._ball.toString() + this._board.toString());
    }

    looseBall(ball: Ball) {
        this._isFollow = true;
    }

    createObjects(layerName: string) {
        const gameObjArray: AbstractGameObject[] = [];
        const objMap = GameSceneCreator.load(this._sceneTMap, this, layerName);

        //create
        objMap.forEach(sceneObj => {
            const gameObject = GameObjectFactory.create(sceneObj);
            if (gameObject) {
                gameObjArray.push(gameObject);
                if (sceneObj.name === GameObjectNames.BALL) {
                    this._ball = gameObject as Ball;
                } else if (sceneObj.name === GameObjectNames.BOARD) {
                    this._board = gameObject as Board;
                }
            }
        });

        //bind
        gameObjArray.forEach(gameObject => gameObject.bind(this._ball));
    }

}