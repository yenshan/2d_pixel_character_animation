const keyMap = {
    'Left': 'left',
    'Right': 'right',
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
}

export class UserInput {
    constructor(doc) {
        this.left = false;
        this.right = false;

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);

        doc.addEventListener('keydown', this.keyDownHandler, false);
        doc.addEventListener('keyup', this.keyUpHandler, false);
    }

    set_key_input(key, val) {
        const prop = keyMap[key];
        this[prop] = val;
    }

    keyDownHandler(event) {
        this.set_key_input(event.key, true);
    }

    keyUpHandler(event) {
        this.set_key_input(event.key, false);
    }
}
