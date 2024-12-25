import { _decorator, animation, Component, Node, Prefab, Vec3 } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
import { Constant } from "db://assets/scripts/utils/constant";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
import { ClientEvent } from "db://assets/scripts/framework/ClientEvent";

const { ccclass, requireComponent, property } = _decorator;

@ccclass('Zombie')
@requireComponent(Actor)
export class Zombie extends Component {
    actor: Actor | null = null;
    animationController: animation.AnimationController = null;
    private _oriPos: Vec3 = new Vec3(0, 0, 0)
    private _speed: number = 50
    private _canWalk: boolean = true


    get oriPos(): Vec3 {
        return this._oriPos;
    }

    set oriPos(value: Vec3) {
        this._oriPos = value;
    }

    /**
     *
     * @param zombiePrefab 僵尸预制体
     * @param zombieContainer 僵尸容器
     * @param zombiePos 僵尸出生位置
     */
    static createZombie(zombiePrefab: Prefab, zombieContainer: Node, zombiePos: Vec3) {
        if ( !zombiePrefab || !zombieContainer ) return
        const zombieNode = PoolManager.instance.getNode(zombiePrefab, zombieContainer)
        const zombieScript = zombieNode.getComponent(Zombie)
        zombieScript.oriPos = zombiePos
        zombieNode.setWorldPosition(zombiePos)
    }

    start() {
        this.animationController = this.getComponent(animation.AnimationController)
        this.animationController.setValue("isWalk", true)
        this.actor = this.node.getComponent(Actor);
        this.actor.setGroup(Constant.RIGID_GROUP.ZOMBIE) // 设置碰撞体分组
    }

    update(deltaTime: number) {
        if ( this._canWalk ) this.walk(deltaTime)
    }

    changeAnimation() {
        const hpPercent = this.actor.actorProperty.hpPercent
        if ( hpPercent <= .5 ) {
            this.animationController.setValue("isLosehead", true)
        } else {
        }
    }

    walk(dt: number) {
        this.oriPos.x -= this._speed * dt
        this.node.setWorldPosition(this.oriPos)
        if ( this.oriPos.x <= 750 ) {
            this._canWalk = false
            // 游戏失败 戴夫脑子被僵尸吃了
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.OVER,Constant.GAME_OVER_TYPE.LOSE)
        }
    }

}


