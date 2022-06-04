import * as Phaser from "phaser";

export type StyleTextButton = {
    enabled: Phaser.Types.GameObjects.Text.TextStyle,
    disabled: Phaser.Types.GameObjects.Text.TextStyle,
    hover: Phaser.Types.GameObjects.Text.TextStyle,
    active: Phaser.Types.GameObjects.Text.TextStyle,
}

export default class TextButton extends Phaser.GameObjects.Text {

    private _style: StyleTextButton;
    private _enabled: boolean;
    private _onClick: () => void;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, style: StyleTextButton) {
        super(scene, x, y, text, style.enabled);
        this._style = style;
        this._enabled = true;

        this.setOrigin(0.5);
        this.setInteractive({ useHandCursor: true })
            .on('pointerover', () => this._hover())
            .on('pointerout', () => this._rest())
            .on('pointerdown', () => this._active())
            .on('pointerup', () => this._up());
    }

    override setStyle(newStyle: Phaser.Types.GameObjects.Text.TextStyle) {
        if (this._enabled) {
            super.setStyle(newStyle);
        }
        return this;
    }

    private _hover() {
        this.setStyle(this._style.hover);
    }

    private _rest() {
        this.setStyle(this._style.enabled);
    }

    private _active() {
        this.setStyle(this._style.active);
    }

    private _disable() {
        this.setStyle(this._style.disabled);
    }

    private _up() {
        this._hover();
        if (this._enabled && this._onClick) {
            this._onClick();
        }
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(isEnabled: boolean) {
        this._enabled = isEnabled;
        if (this._enabled) {
            this._rest();
        } else {
            this._disable();
        }
    }

    public set onClick(handler: () => void) {
        this._onClick = handler;
    }
}
