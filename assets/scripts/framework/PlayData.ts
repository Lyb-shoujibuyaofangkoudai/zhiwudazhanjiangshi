import { _decorator, Component, Label, Node } from 'cc';
import { ClientEvent } from "db://assets/scripts/framework/ClientEvent";
import { Constant } from "db://assets/scripts/utils/constant";
import { UiSunCount } from "db://assets/scripts/ui/UiSunCount";
const { ccclass, property } = _decorator;

@ccclass('PlayData')
export class PlayData extends Component {

    get sunCountUi(): UiSunCount {
        return this._sunCountUi;
    }

    set sunCountUi(value: any) {
        this._sunCountUi = value;
    }
    private _sunCount = 0 // 当前阳光数量
    @property({type:Node})
    private _sunCountUi = null

    get targetTile():Node {
        return this._targetTile;
    }
    set targetTile(value:Node) {
        this._targetTile = value;
    }
    private _targetTile:Node = null // 植物需要种植到的格子


    start() {
        ClientEvent.on(Constant.EVENT_TYPE.CAPTURE_SUN, this.onSunCatch,this)
        ClientEvent.on(Constant.EVENT_TYPE.PLANT_TO_TILE, this.onPlantToTile,this)
    }

    onDestroy() {
        ClientEvent.off(Constant.EVENT_TYPE.CAPTURE_SUN, this.onSunCatch,this)
        ClientEvent.off(Constant.EVENT_TYPE.PLANT_TO_TILE, this.onPlantToTile,this)
    }

    onSunCatch() {
        console.log("用户捕获（点击）阳光事件",this.sunCountUi)
        this._sunCount += 50
        this.sunCountUi.getComponent(UiSunCount).count = this._sunCount
    }
    onPlantToTile(plantName: string) {
        console.log("种植植物到地板上",plantName)
    }
}


