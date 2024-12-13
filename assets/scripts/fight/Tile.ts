import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tile')
export class Tile extends Component {
    row = 0;
    col = 0;

    start() {

    }

    setTilePosition(row, col) {
        this.row = row;
        this.col = col;
    }

}


