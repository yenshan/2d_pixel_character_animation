import { GameObject } from './GameObject.js'

const State = {
    STANDING: 'STANDING',
    MOVE_LEFT: 'MOVE_LEFT',
    MOVE_RIGHT: 'MOVE_RIGHT',
}

const anime_table = {
    STANDING: {move_count: 8, frames: [8,10], frame_interval: 50},
    MOVE_LEFT: {move_count: 8, frames: [8,9,11], frame_interval: 2},
    MOVE_RIGHT: {move_count: 8, frames: [8,9,11], frame_interval: 2},
}

export class Monster extends GameObject {
    constructor(x, y, anime_table, initial_state, wait_time=4) {
        super(x, y, anime_table, initial_state);
        this.wait_time = wait_time;
        this.wait_count = this.wait_time;
    }

    static create(x,y) {
        return new Monster(x, y, anime_table, State.STANDING);
    }

    setTarget(target) {
        this.target = target;
    }

    update() {
        if (this.wait_count > 0) {
            this.wait_count--;
            return;
        }

        switch(this.state) {
        case State.STANDING:
            this.next_action();
            break;
        case State.MOVE_RIGHT:
            if (this.count_move(1, 0).finished) {
                this.stop_move();
            };
            break;
        case State.MOVE_LEFT:
            if (this.count_move(-1, 0).finished) {
                this.stop_move();
            }
            break;
        }

        this.wait_count = this.wait_time;
        super.update();
    }

    next_action() {
        if (this.x < this.target.x) {
            this.move_right();
        } else if (this.x > this.target.x) {
            this.move_left();
        } else {
            this.stop_move();
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

