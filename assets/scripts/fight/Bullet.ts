import { _decorator, Component, Node, Vec3 } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
import { Constant } from "db://assets/scripts/utils/constant";
const { ccclass,requireComponent, property } = _decorator;

@ccclass('Bullet')
@requireComponent(Actor)
export class Bullet extends Component {
    private _speed = 200
    private _originPos: Vec3 = new Vec3(0,0,0)
    // 子弹从什么节点创建出来的
    private _parentNode:Node = null
    actor: Actor | null = null;

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    get originPos(): Vec3{
        return this._originPos;
    }
    set originPos(value:Vec3) {
        this.node.setWorldPosition(value)
        this._originPos = value;
    }

    get parentNode():Node {
        return this._parentNode;
    }
    set parentNode(value:Node) {
        this._parentNode = value;
    }

    start() {
        this.actor = this.node.getComponent(Actor);
        this.actor.setGroup(Constant.RIGID_GROUP.BULLET) // 设置碰撞体分组
    }

    update(deltaTime: number) {
        if(!this.parentNode) return
        this.move(deltaTime)
    }

    move(dt: number) {
        this.originPos.x += this.speed * dt
        this.node.setWorldPosition(this.originPos)
    }
}




