import { _decorator, Component, Node } from 'cc';
import { MapManager } from "db://assets/scripts/framework/MapManager";
import { AudioManager } from "db://assets/scripts/framework/AudioManager";
import { Constant } from "db://assets/scripts/utils/constant";
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(MapManager)
    mapManager: MapManager = null;
    start() {
        this.mapManager.initPlantTileGrid()
        this.mapManager.initCards()
        AudioManager.instance.init()
        AudioManager.instance.playMusic(Constant.SOUND.BGN, true) // 播放bgm
    }

    update(deltaTime: number) {

    }
}


