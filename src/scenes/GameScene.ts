import * as Phaser from 'phaser'
import { Ball } from './elements/Ball';
import { Board } from './elements/Board';
import { Brick1 } from './elements/Brick1';
import { GameObjectType } from './elements/GameObjectType';
import * as SpriteBodyProvider from './elements/level-core/SpriteBodyProvider';
import { TMap } from './elements/level-core/TInterfaces';
import { Sensor } from './elements/Sensor';
import * as GameScenePreloader from './GameScenePreloader';
import * as GameSceneCreator from './GameSceneCreator';

const ObjectNames = {
    BALL: "ball",
    BOARD: "board",
    SENSOR: {
        TOP: "sensor-top",
        BOTTOM: "sensor-bottom",
        LEFT: "sensor-left",
        RIGHT: "sensor-right",
    }
}

export default class GameScene extends Phaser.Scene {
    private _ball: Ball;
    private _board: Board;
    private _sensTop: Sensor;
    private _sensBottom: Sensor;
    private _sensLeft: Sensor;
    private _sensRight: Sensor;

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

        const sceneMap: TMap = this.cache.json.get(GameScenePreloader.SCENE_MAP) as TMap;
        SpriteBodyProvider.load(sceneMap);
        GameSceneCreator.load(sceneMap, this);

        this._ball = new Ball(GameSceneCreator.get(ObjectNames.BALL));
        this._board = new Board(GameSceneCreator.get(ObjectNames.BOARD));
        this._sensTop = new Sensor(GameSceneCreator.get(ObjectNames.SENSOR.TOP));
        this._sensBottom = new Sensor(GameSceneCreator.get(ObjectNames.SENSOR.BOTTOM));
        this._sensLeft = new Sensor(GameSceneCreator.get(ObjectNames.SENSOR.LEFT));
        this._sensRight = new Sensor(GameSceneCreator.get(ObjectNames.SENSOR.RIGHT));

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

        this._ball.setOnCollideWith(this._sensTop, () => {
            this._ball.flipVelocityY();
        });

        this._ball.setOnCollideWith(this._sensBottom, () => {
            this.looseBall();
        });

        this._ball.setOnCollideWith(this._sensLeft, () => {
            this._ball.flipVelocityX();
        });

        this._ball.setOnCollideWith(this._sensRight, () => {
            this._ball.flipVelocityX();
        });
    }

    update(): void {
        this._board.update(this.input);
        this._ball.update(this._board, this._isFollow);
        this._text.setText(this._ball.getSpeedAsString());
        this._dev.setText(this._ball.toString() + this._board.toString());
    }

    looseBall() {
        this._isFollow = true;
    }
}