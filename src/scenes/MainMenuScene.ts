import * as Phaser from "phaser";
import { STYLE_TEXT_BUTTON } from "../ui/GameStyles"
import TextButton from "../ui/common/TextButton";

export default class MainMenuScene extends Phaser.Scene {

    private _startBtn: TextButton;

    constructor() {
        super('main-menu')
    }

    preload() {
        //
    }

    create() {
        const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.text(centerX, centerY * 0.5, "A R K A N O I D", {
            color: "#00ff00",
            fontSize: "60px",
        }).setOrigin(0.5);

        this._startBtn = new TextButton(this, centerX, centerY, "start", STYLE_TEXT_BUTTON);
        this._startBtn.onClick = () => this.startGame();

        this.add.existing(this._startBtn);
    }

    startGame() {
        this.scene.start('GameScene');
    }

}