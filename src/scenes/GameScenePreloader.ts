import { Scene } from 'phaser'
import { GameObjectType } from './elements/GameObjectType';

export const SCENE_MAP = 'map';

export function preload(scene: Scene) {
    scene.load.image(GameObjectType.BOARD, `assets/${GameObjectType.BOARD}.png`);
    scene.load.image(GameObjectType.BALL, `assets/${GameObjectType.BALL}.png`);
    scene.load.image(GameObjectType.BRICK1, `assets/${GameObjectType.BRICK1}.png`);
    scene.load.image(GameObjectType.BACKGROUND, `assets/${GameObjectType.BACKGROUND}.png`);

    scene.load.json(SCENE_MAP, 'assets/map.json');
}