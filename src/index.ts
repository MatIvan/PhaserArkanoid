import * as Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import MainMenuScene from './scenes/MainMenuScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			debug: true,
			gravity: {
				y: 0
			},
		}
	},
	parent: "content-box",
	scene: [MainMenuScene, GameScene]
}

export default new Phaser.Game(config);
