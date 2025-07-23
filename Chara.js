import { spritesheet } from './index.js'

const State = {
    STANDING: 0,
    MOVE_LEFT: 1,
    MOVE_RIGHT: 2,
}

const anime_table = [
    {state_name: 'STANDING', move_count: 0, frames: [0,1], frame_interval: 60},
    {state_name: 'MOVE_LEFT', move_count: 9, frames: [2,3,4], frame_interval: 3},
    {state_name: 'MOVE_RIGHT', move_count: 9, frames: [2,3,4], frame_interval: 3},
];

export class Chara {
    constructor(x,y, anime_table, wait_time=0) {
        this.x = x;
        this.y = y;
        this.anime_count = 0;
        this.anime_index = 0;
        this.move_count = 0;
        this.state = State.STANDING;
        this.flip = false;
        this.anime_table = anime_table;
        this.wait_time = wait_time;
        this.wait_count = this.wait_time;
        this.next_action_input = State.STANDING;
    }

    static create(x,y) {
        return new Chara(x,y,anime_table);
    }

    update() {
        if (this.wait_count > 0) {
            this.wait_count--;
            return;
        }

        this.next_action();

        switch(this.state) {
        case State.STANDING:
            this.next_action();
            // do nothing
            break;
        case State.MOVE_RIGHT:
            this.count_move(1, 0);
            break;
        case State.MOVE_LEFT:
            this.count_move(-1, 0);
            break;
        }

        this.anime_update();
        this.wait_count = this.wait_time;
    }

    next_action() {
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
            this.stop_move();
            return;
        }
        this.x += dx;
        this.y += dy;
    }

    stop_move() {
        this.change_state(State.STANDING);
    }

    move_right() {
        this.change_state(State.MOVE_RIGHT);
        this.flip = false;
    }

    move_left() {
        this.change_state(State.MOVE_LEFT);
        this.flip = true;
    }
}
