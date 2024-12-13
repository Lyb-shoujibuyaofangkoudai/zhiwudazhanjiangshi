import { _decorator, Component, Node,tween,Vec3,Prefab } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
import { Constant } from "db://assets/scripts/utils/constant";
const { ccclass, property } = _decorator;

@ccclass('Sunflower')
export class Sunflower extends Actor {

    start() {
        super.startAnimation(Constant.ANIMATION.SUNFLOWER)
    }
}


