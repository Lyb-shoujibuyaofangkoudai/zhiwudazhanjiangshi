import { _decorator, BoxCollider2D, Component, Node, NodeEventType, size, UITransform } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
import { Constant } from "db://assets/scripts/utils/constant";
import { ClientEvent } from "db://assets/scripts/framework/ClientEvent";
const { ccclass, property } = _decorator;

@ccclass('Tile')
export class Tile extends Component {
    row = 0;
    col = 0;

    onLoad() {
        this.node.addComponent(Actor)
    }
    start() {
        const actor = this.node.getComponent(Actor)
        const uiTransform = this.node.getComponent(UITransform);
        actor.setGroup(Constant.RIGID_GROUP.TILE)
        actor.enabledContactListener = false
        actor.setColliderSize(uiTransform.width / 1.2, uiTransform.height / 1.2)
    }

    setTilePosition(row, col) {
        this.row = row;
        this.col = col;
    }
    handleTileHighlight(curNodeCollider:BoxCollider2D,itemCollider:BoxCollider2D) {
        console.log("监听到卡片和地板发生碰撞：", curNodeCollider, itemCollider)
    }
}


