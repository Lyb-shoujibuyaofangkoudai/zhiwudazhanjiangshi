import { _decorator, Component, Node, Prefab, resources } from 'cc';
import { ClientEvent } from "db://assets/scripts/framework/ClientEvent";
import { Constant } from "db://assets/scripts/utils/constant";
import { UiSunCount } from "db://assets/scripts/ui/UiSunCount";
import { PoolManager } from './PoolManager';

const { ccclass, property } = _decorator;

@ccclass('PlayData')
export class PlayData extends Component {
    get plantContainerNode():Node {
        return this._plantContainerNode;
    }
    set plantContainerNode(value:Node) {
        this._plantContainerNode = value;
    }

    get sunCountUi(): UiSunCount {
        return this._sunCountUi;
    }

    set sunCountUi(value: any) {
        this._sunCountUi = value;
    }

    private _sunCount = 0 // 当前阳光数量
    @property({ type: Node })
    private _sunCountUi = null

    get targetTile(): Node {
        return this._targetTile;
    }

    set targetTile(value: Node) {
        this._targetTile = value;
    }

    private _targetTile: Node = null // 植物需要种植到的格子

    private _plantContainerNode: Node = null


    start() {
        ClientEvent.on(Constant.EVENT_TYPE.CAPTURE_SUN, this._onSunCatch, this)
        ClientEvent.on(Constant.EVENT_TYPE.PLANT_TO_TILE, this._onPlantToTile, this)
        ClientEvent.on(Constant.EVENT_TYPE.SET_TARGET_TILE, this._onSetTargetTile, this)
    }

    onDestroy() {
        ClientEvent.off(Constant.EVENT_TYPE.CAPTURE_SUN, this._onSunCatch, this)
        ClientEvent.off(Constant.EVENT_TYPE.PLANT_TO_TILE, this._onPlantToTile, this)
        ClientEvent.off(Constant.EVENT_TYPE.SET_TARGET_TILE, this._onSetTargetTile, this)
    }

    _onSunCatch() {
        console.log("用户捕获（点击）阳光事件", this.sunCountUi)
        this._sunCount += 50
        this.sunCountUi.getComponent(UiSunCount).count = this._sunCount
    }

    _onPlantToTile(plantName: string) {
        if(!this.targetTile) return
        const prefabName = plantName.toLowerCase()
        resources.load(Constant.PATH.FIGHT + prefabName, Prefab, (err, prefab) => {
            if(err) {
                console.error(`加载预制体${prefabName.toLowerCase()}失败`, err);
                return;
            }
            const node = PoolManager.instance.getNode(prefab, this.plantContainerNode)
            node.setWorldPosition(this.targetTile.worldPosition)
        })
    }

    _onSetTargetTile(targetTile: Node) {
        if ( targetTile ) this.targetTile = targetTile
    }
}


