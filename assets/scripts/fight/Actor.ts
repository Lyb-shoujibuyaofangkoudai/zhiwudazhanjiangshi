import {
    _decorator,
    Animation,
    BoxCollider2D,
    Component,
    Contact2DType,
    ERigidBody2DType,
    ICollisionEvent,
    RigidBody2D,
    size,
    UITransform,
    Vec2,
    Vec3
} from 'cc';
import { ClientEvent } from '../framework/ClientEvent';
import { Constant } from "db://assets/scripts/utils/constant";
import { ColliderManger } from "db://assets/scripts/framework/ColliderManger";

const { ccclass, property } = _decorator;

@ccclass('Actor')
export class Actor extends Component {
    set enabledContactListener(value: boolean) {
        if ( !value ) {
            this.rigidbody.enabledContactListener = value
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onTriggerEnter, this);
            this.collider.off(Contact2DType.END_CONTACT, this.onTriggerEnter, this);
        }
        this._enabledContactListener = value;
    }

    private _hp = 100;
    private _atk = 10;

    set hp(value: number) {
        this._hp = value;
    }

    set atk(value: number) {
        this._atk = value;
    }

    rigidbody: RigidBody2D = null
    collider: BoxCollider2D = null
    private _enabledContactListener: boolean = true

    onLoad() {
        this.rigidbody = this.node.addComponent(RigidBody2D)
        this.collider = this.node.addComponent(BoxCollider2D)
        this.rigidbody.enabledContactListener = this._enabledContactListener
        // this.collider.size = size(this.node.getComponent(UITransform).width,this.node.getComponent(UITransform).height)
        this.updateCollider()
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onTriggerEnter, this);
        this.collider.on(Contact2DType.END_CONTACT, this.onTriggerExit, this);
    }

    start() {
        this.setRigidBodyType(ERigidBody2DType.Static) // 默认静态
    }

    onDestroy() {
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onTriggerEnter, this);
        this.collider.off(Contact2DType.END_CONTACT, this.onTriggerExit, this);
    }

    setRigidBodyType(type: ERigidBody2DType) {
        if ( this.rigidbody ) this.rigidbody.type = type
    }

    setGroup(group: number) {
        if ( this.rigidbody ) this.rigidbody.group = group
        if ( this.collider ) this.collider.group = group
    }

    startAnimation(name: string) {
        const anim = this.node.getComponent(Animation)
        anim.play(name)
    }

    onTriggerEnter(curNodeCollider:BoxCollider2D,itemCollider:BoxCollider2D) {
        console.log("开始碰撞", curNodeCollider.node.name, itemCollider.node.name,this.node.name)
        ColliderManger.instance.handleColliderEnter(curNodeCollider,itemCollider,`${curNodeCollider.group}_${itemCollider.group}`)
    }

    onTriggerExit(curNodeCollider:BoxCollider2D,itemCollider:BoxCollider2D) {
        console.log("碰撞结束：", curNodeCollider.node.name, itemCollider.node.name,this.node.name)
        ColliderManger.instance.handleColliderExit(itemCollider,curNodeCollider,`${itemCollider.group}_${curNodeCollider.group}`)
    }

    updateCollider() {
        const uiTransform = this.node.getComponent(UITransform);
        if ( !uiTransform ) {
            console.error("UITransform 组件未找到");
            return;
        }

        const width = uiTransform.width;
        const height = uiTransform.height;

        // 设置碰撞体的大小
        this.collider.size = size(width, height);

        // 根据锚点 调整碰撞体的位置
        const anchorX = uiTransform.anchorX;
        const anchorY = uiTransform.anchorY;
        const offset = new Vec3(
            (anchorX - 0.5) * width,
            (anchorY - 0.5) * height,
            0
        );

        // 更新碰撞体的世界位置
        const worldPosition = this.node.worldPosition.clone();
        worldPosition.subtract(offset);
        const pos = worldPosition.subtract(this.node.worldPosition)
        this.collider.offset = new Vec2(pos.x, pos.y);
    }

    setColliderSize(width: number, height: number) {
        this.collider.size = size(width, height)
    }
}


