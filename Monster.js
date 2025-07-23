import { Chara } from './Chara.js'

const anime_table = [
    {state_name: 'STANDING', move_count: 8, frames: [8,10], frame_interval: 50},
    {state_name: 'MOVE_LEFT', move_count: 8, frames: [8,9,11], frame_interval: 2},
    {state_name: 'MOVE_RIGHT', move_count: 8, frames: [8,9,11], frame_interval: 2},
];

export class Monster extends Chara {
    static create(x,y) {
        return new Monster(x,y,anime_table,4);
    }

    setTarget(target) {
        this.target = target;
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
}

