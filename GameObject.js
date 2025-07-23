import { spritesheet } from './index.js'

export class GameObject {
    constructor(x, y, anime_table, initial_state) {
        this.x = x;
        this.y = y;
        this.anime_count = 0;
        this.anime_index = 0;
        this.move_count = 0;
        this.state = initial_state;
        this.flip = false;
        this.anime_table = anime_table;
    }

    update() {
        this.anime_update();
    }

    anime_update() {
        let frames = this.anime_table[this.state].frames;
        let frame_interval = this.anime_table[this.state].frame_interval;

        if (this.anime_count >= frame_interval) {
            this.anime_index = (this.anime_index+1) % frames.length;
            this.anime_count = 0;
        }
        this.sprite = frames[this.anime_index];
        this.anime_count++;
    }

    draw() {
        spritesheet.drawSprite(this.sprite, this.x, this.y, this.flip);
    }

    change_state(state) {
        if (state == this.state) {
            return;
        }
        this.state = state;
        this.anime_index = 0; 
        this.anime_count = 0;
        this.move_count = this.anime_table[this.state].move_count;
    }

    count_move(dx, dy) {
        this.move_count--;
        if (this.move_count < 0) {
            return { finished: true} ;
        }
        this.x += dx;
        this.y += dy;
        return { finished: false};
    }

}

