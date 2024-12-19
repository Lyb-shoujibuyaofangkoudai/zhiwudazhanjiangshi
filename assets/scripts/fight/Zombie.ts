import { _decorator, Component, Node,animation, RigidBody2D } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
const { ccclass,requireComponent, property } = _decorator;

@ccclass('Zombie')
@requireComponent(Actor)
export class Zombie extends Component {

    animationController:animation.AnimationController = null;
    start() {
        this.animationController = this.getComponent(animation.AnimationController)
    }

    update(deltaTime: number) {

    }
}


