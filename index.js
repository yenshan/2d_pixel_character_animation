import { UserInput } from "./UserInput.js"

// background canvas
const canvas_bg = document.getElementById('canvasBg');
const context_bg = canvas_bg.getContext('2d');

// display canvas
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

const State = {
    STANDING: 0,
    MOVE_LEFT: 1,
    MOVE_RIGHT: 2,
}

class Chara {
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
        drawSprite(this.sprite, this.x, this.y, this.flip);
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

class Monster extends Chara {
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

// 入力ハンドラー
export const input = new UserInput(document);


function createBoy(x, y) {
    return new Chara(x,y,
        [
            {state_name: 'STANDING', move_count: 0, frames: [0,1], frame_interval: 60},
            {state_name: 'MOVE_LEFT', move_count: 9, frames: [2,3,4], frame_interval: 3},
            {state_name: 'MOVE_RIGHT', move_count: 9, frames: [2,3,4], frame_interval: 3},
        ]);
}

function createMonster(x, y) {
    return new Monster(x,y,
        [
            {state_name: 'STANDING', move_count: 8, frames: [8,10], frame_interval: 50},
            {state_name: 'MOVE_LEFT', move_count: 8, frames: [8,9,11], frame_interval: 2},
            {state_name: 'MOVE_RIGHT', move_count: 8, frames: [8,9,11], frame_interval: 2},
        ], 4);
}

function drawSprite(sprite_no, x, y, flip) {
    let sx = (sprite_no % 8) *8;
    let sy = Math.floor(sprite_no / 8)*8;
    if (flip) {
        context_bg.save();
        context_bg.scale(-1,1);
        context_bg.drawImage(spriteSheet, sx, sy, 8, 8, -x-8, y, 8, 8);
        context_bg.restore();
    } else {
        context_bg.drawImage(spriteSheet, sx, sy, 8, 8, x, y, 8, 8);
    }
}

// スプライトシートのロード
const spriteSheet = new Image();
spriteSheet.src = "./spritesheet.png";

let player = createBoy(5,10);
let monster = createMonster(40,20);
monster.setTarget(player);

let chara_list = [player, monster];

function update() {
    // オリジナルサイズをバックグランドバッファに描画
    context_bg.clearRect(0, 0, canvas_bg.width, canvas_bg.height);

    if (input.left) {
        player.move_left();
    }
    if (input.right) {
        player.move_right();
    }

    for (let o of chara_list) {
        o.update();
        o.draw();
    }

    // 表示用に拡大する
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(canvas_bg, 0, 0, canvas_bg.width, canvas_bg.height, 0, 0, canvas.width, canvas.height);
}

setInterval(update, 20);
