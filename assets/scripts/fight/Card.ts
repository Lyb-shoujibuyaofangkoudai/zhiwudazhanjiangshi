import { _decorator, Component, Node,Prefab,Label, UITransform, ERigidBody2DType, NodeEventType, Sprite, Color } from 'cc';
import { Constant } from "db://assets/scripts/utils/constant";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
import { Drag } from "db://assets/scripts/utils/Drag";
import { Actor } from "db://assets/scripts/fight/Actor";
import { ClientEvent } from "db://assets/scripts/framework/ClientEvent";
const { ccclass,requireComponent, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    private _price = 0
    private actor = null
    private countDownNode:Node = null
    private _dragComp:Drag = null

    onLoad() {
        this.node.addComponent(Actor)
        this._dragComp = this.node.addComponent(Drag)
    }

    start() {
        this.actor = this.node.getComponent(Actor)
        this.actor.setGroup(Constant.RIGID_GROUP.CARD)
        this.actor.setColliderSize(20,20)
        const dragCpt = this.node.getComponent(Drag)
        dragCpt.nodeNeedBack = true // 卡片拖拽结束时，需要返回原位置

        this.node.on(NodeEventType.TOUCH_START, this._touchStart, this)
        this.node.on(NodeEventType.TOUCH_END, this._touchEnd, this)
        ClientEvent.on(Constant.EVENT_TYPE.SUN_COUNT_CHANGE,this._onSunCountChange,this)
    }

    onDestroy() {
        this.node.off(NodeEventType.TOUCH_START, this._touchStart, this)
        this.node.off(NodeEventType.TOUCH_END, this._touchEnd, this)
        ClientEvent.off(Constant.EVENT_TYPE.SUN_COUNT_CHANGE,this._onSunCountChange,this)
    }

    /**
     * 创建卡片
     * @param cardsAreaNode 放置卡片的区域
     * @param cardPrefab 当前卡片的预制体
     * @param price 价格
     */
    static createCards(cardsAreaNode: Node,cardPrefab:Prefab,price:number) {
        const node = PoolManager.instance.getNode(cardPrefab,cardsAreaNode);
        node.addComponent(Card)
        node.name = `CARD_${node.name}`
        const card = node.getComponent(Card) // 获取添加到卡片上的脚本，保证this指向正确
        card._price = price
        const cd = node.getChildByName("price")
        card.countDownNode = node.getChildByName("countdown")
        cd.getComponent(Label).string = card._price.toString()
    }

    _touchStart(event) {
    }

    _touchEnd() {
        ClientEvent.dispatchEvent(Constant.EVENT_TYPE.PLANT_TO_TILE,this.node.name.split("_")[1])
    }

    _onSunCountChange(curCount:number) {
        const sp = this.countDownNode.getComponent(Sprite)
        if(curCount >= this._price) {
            sp.color = new Color(0,0,0,0)
            this._dragComp.canDrag = true
        } else {
            sp.color = new Color(0,0,0,70)
            this._dragComp.canDrag = false
        }
    }
}


