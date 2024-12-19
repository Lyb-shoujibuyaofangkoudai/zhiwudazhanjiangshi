import { _decorator, Component, Node,tween,Vec3,Prefab } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
import { Constant } from "db://assets/scripts/utils/constant";
const { ccclass, requireComponent } = _decorator;

@ccclass('Sunflower')
@requireComponent(Actor)
export class Sunflower extends Component {
    actor: Actor | null = null;


    start() {
        this.actor = this.node.getComponent(Actor);
        this.actor.startAnimation(Constant.ANIMATION.SUNFLOWER)
    }
}


