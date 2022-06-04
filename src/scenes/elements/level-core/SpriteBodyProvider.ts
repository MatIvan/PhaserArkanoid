import * as Phaser from 'phaser';
import { GameObjectType } from '../GameObjectType';
import { TMap, TTile } from './TInterfaces';

const POLIGON = "polygon";
const CIRCLE = "circle";

const NO_FRICTION = {
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    restitution: 1,
};

const spriteBodyMap = new Map<string, SpriteBody>();

export type SpriteBody = {
    setterConf: Phaser.Types.Physics.Matter.MatterSetBodyConfig;
    bodyConf: Phaser.Types.Physics.Matter.MatterBodyConfig;
}

export function get(type: string) {
    return spriteBodyMap.get(type);
}

export function load(tmap: TMap) {
    tmap.tilesets[0].tiles.forEach((tile: TTile) => {
        const body = factory(tile);
        if (body) {
            spriteBodyMap.set(tile.type, body);
        }
    });
}

function factory(tile: TTile): SpriteBody {
    switch (tile.type) {

        case GameObjectType.BOARD:
            return {
                setterConf: {
                    type: POLIGON
                },
                bodyConf: {
                    ...NO_FRICTION,
                    isStatic: true,
                    vertices: tile.objectgroup.objects[0].polygon
                }
            }

        case GameObjectType.BRICK1:
            return {
                setterConf: {
                    type: POLIGON
                },
                bodyConf: {
                    ...NO_FRICTION,
                    isStatic: true,
                    vertices: tile.objectgroup.objects[0].polygon
                }
            }

        case GameObjectType.BALL:
            return {
                setterConf: {
                    type: CIRCLE,
                    radius: 8,
                },
                bodyConf: {
                    ...NO_FRICTION
                }
            }
    }

    return null;
}