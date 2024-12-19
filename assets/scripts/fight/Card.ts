import { _decorator, Component, Node,Prefab,Label, UITransform, ERigidBody2DType, NodeEventType } from 'cc';
import { Constant } from "db://assets/scripts/utils/constant";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
import { Drag } from "db://assets/scripts/utils/Drag";
import { Actor } from "db://assets/scripts/fight/Actor";
const { ccclass,requireComponent, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    private _price = 0
    actor = null

    onLoad() {
        this.node.addComponent(Actor)
        this.node.addComponent(Drag)
    }

    start() {
        this.actor = this.node.getComponent(Actor)
        this.actor.setGroup(Constant.RIGID_GROUP.CARD)
        this.actor.setColliderSize(30,30)
        const dragCpt = this.node.getComponent(Drag)
        dragCpt.nodeNeedBack = true // 卡片拖拽结束时，需要返回原位置

        this.node.on(NodeEventType.TOUCH_START, this._touchStart, this)
        this.node.on(NodeEventType.TOUCH_END, this._touchEnd, this)
    }

    onDestroy() {
        this.node.off(NodeEventType.TOUCH_START, this._touchStart, this)
        this.node.off(NodeEventType.TOUCH_END, this._touchEnd, this)
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
        cd.getComponent(Label).string = card._price.toString()
    }

    _touchStart(event) {
        this.actor.setColliderSize(20,20)
    }

    _touchEnd() {
        this.actor.setColliderSize(30,30)
    }
}


