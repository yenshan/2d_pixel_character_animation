import { UserInput } from './UserInput.js'
import { SpriteSheet } from './SpriteSheet.js'
import { Chara } from './Chara.js'
import { Monster } from './Monster.js'


// background canvas
const canvas_bg = document.getElementById('canvasBg');
export const context_bg = canvas_bg.getContext('2d');

// display canvas
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;


// 入力イベント処理
export const input = new UserInput(document);

// スプライト管理
export const spritesheet = new SpriteSheet('./spritesheet.png');

let player = Chara.create(5,10);
let monster = Monster.create(40,20);

monster.setTarget(player);

function update() {
    // オリジナルサイズをバックグランドバッファに描画
    context_bg.clearRect(0, 0, canvas_bg.width, canvas_bg.height);

    if (input.left) {
        player.move_left();
    }
    if (input.right) {
        player.move_right();
    }

    for (let o of [player, monster]) {
        o.update();
        o.draw();
    }

    // バックグランドバッファを表示用に拡大する
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(canvas_bg, 0, 0, canvas_bg.width, canvas_bg.height, 0, 0, canvas.width, canvas.height);
}

setInterval(update, 20);
