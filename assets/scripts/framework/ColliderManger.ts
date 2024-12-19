import { BoxCollider2D } from "cc";
import { Constant } from "db://assets/scripts/utils/constant";

// 碰撞管理器
export class ColliderManger {

    private static _instance: ColliderManger;
    static get instance () {
        return this._instance || (this._instance = new ColliderManger());
    }

    handleCollider(curNodeCollider:BoxCollider2D,itemCollider:BoxCollider2D,type:string) {
        const curNode = curNodeCollider.node;
        const itemNode = itemCollider.node;

        switch (type) {
            case Constant.COLLISION_TYPE.ZOMBIE_PLANT: {
             break
            }
            case Constant.COLLISION_TYPE.ZOMBIE_BULLET: {
                break
            }
            case Constant.COLLISION_TYPE.PLANT_BULLET: {
                break
            }
            case Constant.COLLISION_TYPE.PLANT_TILE: {
                break
            }
            case Constant.COLLISION_TYPE.CARD_TILE: {
                break
            }
            default:
                break

        }

    }
}
