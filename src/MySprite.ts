import { PIXISprite, Rectangle } from './aliases';

export class MySprite extends PIXISprite {
    constructor(texture: PIXI.Texture, x?: number, y?: number) {
        super(texture);
        this.anchor.set(0.5);

        if (x) this.position.x = x;

        if (y) this.position.y = y;
    }
}

export class Background extends PIXISprite {
    constructor(texture: PIXI.Texture, w: number, h: number) {
        let rectangle = new Rectangle(155, 0, w - 2, h);
        texture.frame = rectangle;
        super(texture);
    }
}

export class Card extends MySprite {
    constructor(
        texture: PIXI.Texture,
        cover: MySprite,
        cb?: Function,
        cb2?: Function,
    ) {
        super(texture);

        cover.interactive = true;
        cover.buttonMode = true;

        cover.on('pointerdown', () => {
            cb && cb(this.card);
            this.removeChildren();
            this.covered = false;
        });

        cover.on('pointerover', () => {
            if (cb2) cb2();
        });

        const res = this.texture.textureCacheIds[0].match(
            /(leaf|rope|bow|bonfire|tent)/,
        );

        this.card = res ? res[0] : 'none';

        this.addChild(cover);
        this.covered = true;
    }

    card: string;
    covered: boolean;
}
