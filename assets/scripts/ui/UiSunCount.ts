import { _decorator, Component, Label, Layout, Node, resources, Sprite, SpriteFrame, UITransform, Widget } from 'cc';
import { Constant } from "db://assets/scripts/utils/constant";
import { ClientEvent } from "db://assets/scripts/framework/ClientEvent";

const { ccclass, property } = _decorator;

@ccclass('UiSunCount')
export class UiSunCount extends Component {
    get count(): number {
        return this._count;
    }

    set count(value: number) {
        this._count = value;
        this._lb.string = value.toString()
        ClientEvent.dispatchEvent(Constant.EVENT_TYPE.SUN_COUNT_CHANGE, value)
    }

    private _count = 0;
    private _lb: Label = null;

    start() {

    }

    update(deltaTime: number) {

    }

    static createSunCount(): Node {
        const curNode = new Node('sunCount');
        const ly = curNode.addComponent(Layout)
        ly.type = Layout.Type.HORIZONTAL;
        ly.spacingX = 5;

        const spriteNode = new Node('spriteNode');
        const labelNode = new Node('labelNode');
        const usc = curNode.addComponent(UiSunCount);
        const sp = spriteNode.addComponent(Sprite);
        const spTf = spriteNode.getComponent(UITransform)

        // 注意：加载SpriteFrame资源要加上/spriteFrame，不然会报错
        resources.load(`${ Constant.PATH.IMG }sun/spriteFrame`, SpriteFrame, (err, res) => {
            if ( err ) {
                console.error("加载sun图片资源失败:", err);
                return;
            }
            sp.spriteFrame = res;
            spTf.setContentSize(60, 60)
        })
        const lb = labelNode.addComponent(Label);
        lb.string = usc.count.toString();
        usc._lb = lb
        curNode.addChild(spriteNode)
        curNode.addChild(labelNode)
        // 将 curNode 固定到屏幕左上角
        const widget = curNode.addComponent(Widget);
        widget.isAlignLeft = true;
        widget.isAlignTop = true;
        widget.left = 100;
        widget.top = 0;

        return curNode
    }
}


