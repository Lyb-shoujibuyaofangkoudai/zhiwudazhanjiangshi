import { _decorator, Component, Node } from 'cc';
import { Actor } from "db://assets/scripts/fight/Actor";
const { ccclass, property,requireComponent } = _decorator;

@ccclass('Nut')
@requireComponent(Actor)
export class Nut extends Component {
    actor: Actor | null = null;
    start() {
        this.actor = this.node.getComponent(Actor);
    }

}


