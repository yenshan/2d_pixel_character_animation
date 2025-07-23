import { input } from './index.js'
import { GameObject } from './GameObject.js'

const State = {
    STANDING: 'STANDING',
    MOVE_LEFT: 'MOVE_LEFT',
    MOVE_RIGHT: 'MOVE_RIGHT',
}

const anime_table = {
    STANDING: {move_count: 0, frames: [0,1], frame_interval: 60},
    MOVE_LEFT: {move_count: 9, frames: [2,3,4], frame_interval: 3},
    MOVE_RIGHT: {move_count: 9, frames: [2,3,4], frame_interval: 3},
}


export class Chara extends GameObject {
    static create(x,y) {
        return new Chara(x, y, anime_table, State.STANDING);
    }

    update() {
        this.next_action();

        switch(this.state) {
        case State.STANDING:
            // do nothing
            break;
        case State.MOVE_RIGHT:
            if (this.count_move(1, 0).finished) {
                this.stop_move();
            }
            break;
        case State.MOVE_LEFT:
            if (this.count_move(-1, 0).finished) {
                this.stop_move();
            }
            break;
        }
        super.update();
    }

    next_action() {
        if (input.left) {
            this.move_left();
        }
        if (input.right) {
            this.move_right();
        }
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
