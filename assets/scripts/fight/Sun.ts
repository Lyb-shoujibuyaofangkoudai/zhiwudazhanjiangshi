import { _decorator, Component, Node, NodeEventType, Prefab, UITransform, Vec3 } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
import { util } from "db://assets/scripts/utils/util";
import { Constant } from '../utils/constant';
import { ClientEvent } from "db://assets/scripts/framework/ClientEvent";
import { Drag } from "db://assets/scripts/utils/Drag";

const { ccclass, requireComponent, property } = _decorator;

@ccclass('Sun')
@requireComponent(Actor)
export class Sun extends Component {
    private _downSpeed = 200
    private _sunAreaNode: Node = null;
    private _originPos: Vec3 = new Vec3(0, 0, 0)
    private _targetPos: Vec3 = new Vec3(0, 0, 0)
    private _curNode: Node = null
    actor: Actor | null = null;
    private _liveTime = 20 // 阳光存在时长

    update(deltaTime: number) {
        this.startDropAnimation(deltaTime)
    }

    start() {
        this.node.on(NodeEventType.TOUCH_END, this._catchSun, this)
        this.initSunPos()
        this.actor = this.node.getComponent(Actor);
        this.actor.startAnimation(Constant.ANIMATION.SUN)
        this.actor.setGroup(Constant.RIGID_GROUP.DEFAULT)
        this.actor.enabledContactListener = false
        this.scheduleOnce(() => {
            this.destroySun()
        }, this._liveTime)
    }

    onDestroy() {
        this.node.off(NodeEventType.TOUCH_END, this._catchSun, this)
    }

    initSunPos() {
        const x = util.getRandom(0, this.node.parent.getComponent(UITransform).width)
        const y = util.getRandom(0, this.node.parent.getComponent(UITransform).height)
        this._originPos = new Vec3(x, 0, 0)
        this._targetPos = new Vec3(x, -y, 0)
        // console.log("初始化阳光位置",this._id, this._originPos, this._targetPos)
        this.node.setPosition(this._originPos)
    }

    static createSun(sunPrefab: Prefab, sunAreaNode: Node) {
        if (!sunPrefab || !sunAreaNode) return;
        const sunNode = PoolManager.instance.getNode(sunPrefab, sunAreaNode);
        sunNode.addComponent(Sun)
        sunNode.getComponent(Actor).atk = 0
        // 需要这样子获取实例，不然this指向会有问题
        const sunComponent = sunNode.getComponent(Sun);
        sunComponent._sunAreaNode = sunAreaNode;
        sunComponent._curNode = sunComponent.node; // 使用当前节点
    }

    startDropAnimation(deltaTime: number) {
        if ( Math.abs(this._originPos.y) <= Math.abs(this._targetPos.y) ) {
            this._originPos.y -= this._downSpeed * deltaTime
            this.node.setPosition(this._originPos)
        }
    }

    destroySun() {
        this.node.removeFromParent()
        PoolManager.instance.putNode(this.node); // 在节点销毁后归还到对象池
        this.node.destroy(); // 销毁节点
    }

    _catchSun(event: any) {
        ClientEvent.dispatchEvent(Constant.EVENT_TYPE.CAPTURE_SUN)
        this.unscheduleAllCallbacks()
        this.destroySun()
    }
}


