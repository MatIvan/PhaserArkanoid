import { Scene } from 'phaser'
import { GameObjectType } from './elements/GameObjectType';

export const SCENE_MAP = 'map';

export function preload(scene: Scene) {
    scene.load.image(GameObjectType.BOARD, `assets/${GameObjectType.BOARD}.png`);
    scene.load.image(GameObjectType.BALL, `assets/${GameObjectType.BALL}.png`);
    scene.load.image(GameObjectType.BRICK1, `assets/${GameObjectType.BRICK1}.png`);
    scene.load.image(GameObjectType.BRICK2, `assets/${GameObjectType.BRICK2}.png`);
    scene.load.image(GameObjectType.BACKGROUND, `assets/${GameObjectType.BACKGROUND}.png`);

    scene.load.json(SCENE_MAP, 'assets/map.json');

    loadFont("Roboto Mono", "style/RobotoMono-Regular.ttf");
}

function loadFont(name: string, url: string) {
    const newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}