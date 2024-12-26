import { _decorator, Component, error, Prefab, resources, UITransform, Vec3 } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
import { Constant } from "db://assets/scripts/utils/constant";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
import { Bullet } from "db://assets/scripts/fight/Bullet";

const { ccclass, property, requireComponent } = _decorator;

@ccclass('Pease')
@requireComponent(Actor)
export class Pease extends Component {
    actor: Actor | null = null;

    start() {
        this.actor = this.node.getComponent(Actor);
        this.attack()
    }

    attack() {
        resources.load(Constant.PATH.FIGHT + Constant.PREFAB_PATH.BULLET, Prefab, (err: any, res: any) => {
            if(err) {
                error("加载子弹预制体失败：",err)
                return
            }
            const cb = () => {
                const bullet = PoolManager.instance.getNode(res, this.node)
                const bulletScript =  bullet.getComponent(Bullet)
                bulletScript.parentNode = this.node
                bulletScript.originPos = new Vec3(this.node.worldPosition.x + bullet.getComponent(UITransform).width * 2 + 8, this.node.worldPosition.y + 23, this.node.worldPosition.z)
            }
            this.schedule(cb,1)
        })
    }

}


