import { context_bg } from './index.js'

export class SpriteSheet {
    constructor(png_file) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = png_file;
    }

    drawSprite(sprite_no, x, y, flip) {
        let sx = (sprite_no % 8) *8;
        let sy = Math.floor(sprite_no / 8)*8;
        if (flip) {
            context_bg.save();
            context_bg.scale(-1,1);
            context_bg.drawImage(this.spriteSheet, sx, sy, 8, 8, -x-8, y, 8, 8);
            context_bg.restore();
        } else {
            context_bg.drawImage(this.spriteSheet, sx, sy, 8, 8, x, y, 8, 8);
        }
    }
}

