import { _decorator, Component, Node,animation } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
const { ccclass, property } = _decorator;

@ccclass('Zombie')
export class Zombie extends Actor {

    animationController:animation.AnimationController = null;
    start() {
        this.animationController = this.getComponent(animation.AnimationController)
    }

    update(deltaTime: number) {

    }
}


