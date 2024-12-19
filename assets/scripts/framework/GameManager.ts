import { _decorator, Component, EPhysics2DDrawFlags, Node, PhysicsSystem2D } from 'cc';
import { MapManager } from "db://assets/scripts/framework/MapManager";
import { AudioManager } from "db://assets/scripts/framework/AudioManager";
import { Constant } from "db://assets/scripts/utils/constant";
import { UiManger } from '../ui/UiManger';
const { ccclass, property,requireComponent } = _decorator;

@ccclass('GameManager')
@requireComponent(UiManger)
export class GameManager extends Component {
    @property(MapManager)
    mapManager: MapManager = null;
    @property({ type: Boolean })
    private isDebug = false;

    uiManger: UiManger = null
    start() {
        this.showDebug(this.isDebug)
        this.uiManger = this.getComponent(UiManger)
        this.mapManager.initPlantTileGrid()
        this.mapManager.initCards()
        this.mapManager.initSun()
        this.uiManger.init()
        // AudioManager.instance.init()
        // AudioManager.instance.playMusic(Constant.SOUND.BGN, true) // 播放bgm
    }

    update(deltaTime: number) {

    }

    showDebug(isDebug = true) {
        if ( isDebug ) {
            PhysicsSystem2D.instance.debugDrawFlags =
                EPhysics2DDrawFlags.Aabb |
                EPhysics2DDrawFlags.CenterOfMass |
                EPhysics2DDrawFlags.Joint |
                EPhysics2DDrawFlags.Shape;
        } else {
            // 关闭调试区域
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None;
        }
    }

}


