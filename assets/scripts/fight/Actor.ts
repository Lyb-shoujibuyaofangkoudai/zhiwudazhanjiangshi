import { _decorator, Component, Node,CCInteger,Animation,RigidBody,Collider,ICollisionEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Actor')
export class Actor extends Component {
    @property({
        type: CCInteger,
        tooltip: "生命值",
        displayName: "血量"
    })
    private hp = 100;
    @property({
        type: CCInteger,
        tooltip: "攻击力",
        displayName: "攻击力"
    })
    private atk = 10;

    rigidbody:RigidBody = null
    collider:Collider = null

    start() {
        this.rigidbody = this.node.getComponent(RigidBody);
        this.collider = this.node.getComponent(Collider);
        this.collider?.on("onTriggerEnter", this.onTriggerEnter, this);
    }

    onDestroy() {
        this.collider?.off("onTriggerEnter", this.onTriggerEnter, this);
    }

    init() {

    }

    startAnimation(name: string) {
        const anim = this.node.getComponent(Animation)
        anim.play(name)
    }

    onTriggerEnter(event: ICollisionEvent) {
        console.log("开始碰撞")
    }
}


