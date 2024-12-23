import { _decorator, Component, EPhysics2DDrawFlags, PhysicsSystem2D } from 'cc';
import { MapManager } from "db://assets/scripts/framework/MapManager";
import { UiManger } from '../ui/UiManger';
import { PlayData } from "db://assets/scripts/framework/PlayData";

const { ccclass, property, requireComponent } = _decorator;

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
        const playDataComp = this.node.addComponent(PlayData);
        this.uiManger = this.getComponent(UiManger)
        playDataComp.sunCountUi = this.uiManger.init()
        this.mapManager.initPlantTileGrid()
        this.mapManager.initCards()
        this.mapManager.initSun()
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


