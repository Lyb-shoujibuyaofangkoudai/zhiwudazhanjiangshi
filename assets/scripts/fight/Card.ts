import { _decorator, Component, Node,Prefab,Label } from 'cc';
import { Constant } from "db://assets/scripts/utils/constant";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card {
    private _price = 0
    constructor(price:number) {
        this._price = price
    }

    createCards(cardsAreaNode: Node,cardPrefab:Prefab) {
        const node = PoolManager.instance.getNode(cardPrefab,cardsAreaNode);
        const cd = node.getChildByName("price")
        console.log("查看节点：",cd)
        cd.getComponent(Label).string = this._price.toString()

    }
}


