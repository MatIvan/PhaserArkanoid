export interface TMap {
    layers: TLayer[];
    tilesets: TTileset[];
}

export interface TLayer {
    id: number;
    name: string;
    objects: TObject[];
}

export interface TObject {
    id: number;
    gid: number;
    name: string;
    width: number;
    height: number;
    x: number;
    y: number;
    rotation: number;
    type: string;
    visible: true;
    text: TText;
}

export interface TText {
    color: string,
    fontfamily: string,
    pixelsize: number,
    text: string,
    wrap: boolean
}

export interface TTileset {
    name: string;
    tiles: TTile[];
}

export interface TTile {
    id: number;
    image: string;
    type: string;
    imageheight: number;
    imagewidth: number;
    objectgroup: TObjectGroup;
}

export interface TObjectGroup {
    id: number;
    name: string;
    objects: TBody[];
}

export interface TBody {
    id: number;
    name: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    ellipse: boolean;
    polygon: TPoint[];
}

export interface TPoint {
    x: number;
    y: number;
}
