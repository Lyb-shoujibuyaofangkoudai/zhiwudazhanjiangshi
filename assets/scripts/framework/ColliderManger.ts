import { BoxCollider2D, Prefab, UIOpacity, resources } from "cc";
import { Constant } from "db://assets/scripts/utils/constant";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
import { ClientEvent } from "db://assets/scripts/framework/ClientEvent";
import { Actor } from "db://assets/scripts/fight/Actor";
import { Zombie } from "db://assets/scripts/fight/Zombie";

// 碰撞管理器
export class ColliderManger {

    private static _instance: ColliderManger;
    static get instance() {
        return this._instance || (this._instance = new ColliderManger());
    }

    static COLLIDER_MAP = {
        [Constant.COLLISION_TYPE.ZOMBIE_PLANT]: {
            enter: (zombieNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                // console.log("僵尸和植物发生碰撞：", zombieNodeCollider, itemCollider)
                const zombieScript = zombieNodeCollider.node.getComponent(Zombie)
                // 僵尸停止移动
                zombieScript.canWalk = false
                zombieScript.changeAnimation()
                zombieScript.attack(itemCollider.node)

            },
            end: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                // console.log("僵尸和植物结束碰撞：", curNodeCollider, itemCollider)
            }
        },
        [Constant.COLLISION_TYPE.ZOMBIE_BULLET]: {
            enter: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                // console.log("僵尸和子弹发生碰撞：", curNodeCollider.node.name, itemCollider.node.name)
                const bulletAtk = itemCollider.node.getComponent(Actor).actorProperty.attack
                curNodeCollider.node.getComponent(Actor).actorProperty.hp -= bulletAtk // 僵尸血量减少
                curNodeCollider.node.getComponent(Zombie).changeAnimation()
                PoolManager.instance.putNode(itemCollider.node)
            },
            end: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                // console.log("僵尸和子弹结束碰撞：", curNodeCollider, itemCollider)
            }
        },

        [Constant.COLLISION_TYPE.CARD_TILE]: {
            enter: (cardNodeCollider: BoxCollider2D, tileItemCollider: BoxCollider2D) => {
                // console.log("卡片和地板发生碰撞：", cardNodeCollider, tileItemCollider)
                const node = tileItemCollider.node
                node.getComponent(UIOpacity).opacity = 100;
                ClientEvent.dispatchEvent(Constant.EVENT_TYPE.SET_TARGET_TILE,node)

            },
            end: (cardNodeCollider: BoxCollider2D, tileItemCollider: BoxCollider2D) => {
                // console.log("卡片和地板结束碰撞：", cardNodeCollider, tileItemCollider)
                tileItemCollider.node.getComponent(UIOpacity).opacity = 0;
            }
        }
    }

    handleColliderEnter(curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D, type: string) {
        const curNode = curNodeCollider.node;
        const itemNode = itemCollider.node;

        ColliderManger.COLLIDER_MAP[type]?.enter(curNodeCollider, itemCollider)

    }

    handleColliderExit(curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D, type: string) {
        ColliderManger.COLLIDER_MAP[type]?.end(curNodeCollider, itemCollider)
    }
}
