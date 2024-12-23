import { BoxCollider2D, Prefab, UIOpacity, resources } from "cc";
import { Constant } from "db://assets/scripts/utils/constant";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";

// 碰撞管理器
export class ColliderManger {

    private static _instance: ColliderManger;
    static get instance() {
        return this._instance || (this._instance = new ColliderManger());
    }

    static COLLIDER_MAP = {
        [Constant.COLLISION_TYPE.ZOMBIE_PLANT]: {
            enter: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                console.log("僵尸和植物发生碰撞：", curNodeCollider, itemCollider)
            },
            end: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                console.log("僵尸和植物结束碰撞：", curNodeCollider, itemCollider)
            }
        },
        [Constant.COLLISION_TYPE.ZOMBIE_BULLET]: {
            enter: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                console.log("僵尸和子弹发生碰撞：", curNodeCollider, itemCollider)
            },
            end: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                console.log("僵尸和子弹结束碰撞：", curNodeCollider, itemCollider)
            }
        },
        [Constant.COLLISION_TYPE.PLANT_BULLET]: {
            enter: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                console.log("植物和子弹发生碰撞：", curNodeCollider, itemCollider)
            },
            end: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                console.log("植物和子弹结束碰撞：", curNodeCollider, itemCollider)
           }
        },
        [Constant.COLLISION_TYPE.PLANT_TILE]: {
            enter: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                console.log("植物和地板发生碰撞：", curNodeCollider, itemCollider)
            },
            end: (curNodeCollider: BoxCollider2D, itemCollider: BoxCollider2D) => {
                console.log("植物和地板结束碰撞：", curNodeCollider, itemCollider)
            }
        },
        [Constant.COLLISION_TYPE.CARD_TILE]: {
            enter: (cardNodeCollider: BoxCollider2D, tileItemCollider: BoxCollider2D) => {
                // console.log("卡片和地板发生碰撞：", cardNodeCollider, tileItemCollider)
                const node = tileItemCollider.node
                node.getComponent(UIOpacity).opacity = 100;
                // const prefabName = node.name.split("_")[1]
                // resources.load(Constant.PATH.FIGHT + prefabName.toLowerCase(), Prefab, (err, prefab) => {
                //     if(err) {
                //         console.error(`加载预制体${prefabName.toLowerCase()}失败`, err);
                //         return;
                //     }
                //     PoolManager.instance.getNode(prefab, node)
                // })
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
