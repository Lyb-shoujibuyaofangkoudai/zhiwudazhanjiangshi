import { _decorator, Component } from "cc";
import { UiSunCount } from "db://assets/scripts/ui/UiSunCount";

const { ccclass, property } = _decorator;
@ccclass('UiManger')
export class UiManger extends Component {
    start() {

    }
    init() {
        const node = UiSunCount.createSunCount()
        this.node.parent.addChild(node)
        return node
    }
}
