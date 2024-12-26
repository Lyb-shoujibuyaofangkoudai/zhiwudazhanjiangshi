import { _decorator, Component, Node, animation,Animation } from "cc";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
import { util } from "db://assets/scripts/utils/util";
const { ccclass, property } = _decorator;

@ccclass("ZombieDie")
export class ZombieDie extends animation.StateMachineComponent {

    /**
     * Called right after a motion state is entered.
     * @param controller The animation controller it within.
     * @param motionStateStatus The status of the motion.
     */
    public onMotionStateEnter (controller: animation.AnimationController, motionStateStatus: Readonly<animation.MotionStateStatus>): void {
        // Can be overrode
        console.log("onMotionStateEnter")
    }

    /**
     * Called when a motion state is about to exit.
     * @param controller The animation controller it within.
     * @param motionStateStatus The status of the motion.
     */
    public onMotionStateExit (controller: animation.AnimationController, motionStateStatus: Readonly<animation.MotionStateStatus>): void {
        // Can be overrode
        console.log("onMotionStateExit",motionStateStatus)
    }

    /**
     * Called when a motion state updated except for the first and last frame.
     * @param controller The animation controller it within.
     * @param motionStateStatus The status of the motion.
     */
    public onMotionStateUpdate (controller: animation.AnimationController, motionStateStatus: Readonly<animation.MotionStateStatus>): void {
        // Can be overrode
        console.log("状态变化：",motionStateStatus)
        // PoolManager.instance.putNode(controller.node)
        util.debounce(() => {
            PoolManager.instance.putNode(controller.node)
        },50)

    }

    /**
     * Called right after a state machine is entered.
     * @param controller The animation controller it within.
     */
    public onStateMachineEnter (controller: animation.AnimationController) {
        // Can be overrode
        console.log("onStateMachineEnter")

    }

    /**
     * Called right after a state machine is entered.
     * @param controller The animation controller it within.
     */
    public onStateMachineExit (controller: animation.AnimationController) {
        // Can be overrode
        console.log("onStateMachineExit")
    }

}
