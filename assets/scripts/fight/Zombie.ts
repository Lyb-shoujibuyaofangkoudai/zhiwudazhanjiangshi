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
    private _speed: number = 20
    private _canWalk: boolean = true


    get canWalk(): boolean {
        return this._canWalk;
    }

    set canWalk(value: boolean) {
        if ( !value ) {
            this.animationController.setValue("isWalk", false)
        }
        this._canWalk = value;
    }

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
        if ( this.canWalk ) this.walk(deltaTime)
    }

    changeAnimation() {
        const hpPercent = this.actor.actorProperty.hpPercent
        const isWalk = this.animationController.getValue("isWalk")
        const canAtk = this.animationController.getValue("canAtk")
        const isDie = this.animationController.getValue("isDie")
        const isLoseHead = this.animationController.getValue("isLosehead")

        if ( !isLoseHead ) {
            if ( !isWalk) {
                if(!isDie && hpPercent > .5) {
                    this.animationController.setValue("canAtk", true)
                } else if(!isDie && hpPercent <= .5) {
                    // 在攻击的时候失去头部
                    this.animationController.setValue("isLosehead", true)
                } else if ( hpPercent <= 0 ) {
                    // 僵尸死亡
                    this.animationController.setValue("isDie", true)
                    this.animationController.setValue("canAtk", false)
                    this.die()
                }
            } else {
                if(hpPercent <= .5) {
                    // 在行走的过程中失去头部
                    this.animationController.setValue("isLosehead", true)
                    this.animationController.setValue("canAtk", false)
                } else if ( hpPercent <= 0 ) {
                    this.animationController.setValue("isDie", true)
                    this.animationController.setValue("canAtk", false)
                    this.animationController.setValue("canAtk", false)
                    this.die()
                }
            }

        } else {
            if(!isWalk) {
                if(hpPercent <= 0) {
                    this.animationController.setValue("isDie", true)
                    this.animationController.setValue("canAtk", false)
                    this.die()
                } else {
                    // 失去头部正在攻击
                    this.animationController.setValue("canAtk", true)
                }
            } else {
                if ( hpPercent <= 0 ) {
                    this.animationController.setValue("isDie", true)
                    this.animationController.setValue("canAtk", false)
                    this.die()
                } else if ( hpPercent <= .5 ) {
                    this.animationController.setValue("isLosehead", true)
                    this.animationController.setValue("canAtk", false)
                }
            }
        }
    }

    die() {
        this.scheduleOnce(() => {
            PoolManager.instance.putNode(this.node)
        },1)
    }

    walk(dt: number) {
        this.oriPos.x -= this._speed * dt
        this.node.setWorldPosition(this.oriPos)
        if ( this.oriPos.x <= 750 ) {
            this.canWalk = false
            // 游戏失败 戴夫脑子被僵尸吃了
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.OVER, Constant.GAME_OVER_TYPE.LOSE)
        }
    }

    /**
     * 开始攻击
     */
    attack(attackTargetNode: Node) {
        const cb = () => {
            const attackTargetActorScript = attackTargetNode.getComponent(Actor)
            attackTargetActorScript.actorProperty.hp -= this.actor.actorProperty.attack
            if( attackTargetActorScript.actorProperty.hp <= 0) {
                this.canWalk = true
                this.unschedule(cb)
            }
        }
        this.schedule(cb,1)
    }


}


