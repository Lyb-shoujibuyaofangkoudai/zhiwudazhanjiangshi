import { _decorator, Component, EventTouch, NodeEventType,Vec3,UITransform,CCBoolean } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Drag')
export class Drag extends Component {
    set canDrag(value: boolean) {
        this._canDrag = value;
    }
    private _nodeNeedBack = false // 拖拽结束后的节点是否需要回归原位
    private _canDrag = false // 是否允许拖动
    @property({
        type: CCBoolean,
        displayName: "结束回归原位",
        tooltip: "拖拽结束后的节点是否需要回归原位"
    })
    set nodeNeedBack(value: boolean) {
        this._nodeNeedBack = value;
    }

    private _originalWorldPosition: Vec3 = new Vec3();
    private _nodeHeight = 0
    private _nodeWidth = 0

    start() {
        console.log("查看节点的位置",this.node.name, this.node.worldPosition)
        this._originalWorldPosition = this.node.worldPosition.clone()
        const uiTransform = this.node.getComponent(UITransform);
        this._nodeHeight = uiTransform?.height || 0
        this._nodeWidth = uiTransform?.width || 0



        this.node.on(NodeEventType.TOUCH_START, this._dragStart, this)
        this.node.on(NodeEventType.TOUCH_MOVE, this._dragMove, this)
        this.node.on(NodeEventType.TOUCH_END, this._dragEnd, this)
    }

    onDestroy() {
        this.node.off(NodeEventType.TOUCH_START, this._dragStart, this)
        this.node.off(NodeEventType.TOUCH_MOVE, this._dragMove, this)
        this.node.off(NodeEventType.TOUCH_END, this._dragEnd, this)
    }

    _dragStart(event: EventTouch) {
        // console.log("开始拖拽", event)
    }

    _dragMove(event: EventTouch) {
        // console.log("拖拽开始移动", )
        if(!this._canDrag) return
        const x = event.getUILocation().x
        const y = event.getUILocation().y - this._nodeHeight / 2
        this.node.setWorldPosition(x,y,1)
    }

    _dragEnd(event: EventTouch) {
        if(this._nodeNeedBack && this._canDrag)
            this.node.setWorldPosition(this._originalWorldPosition.x, this._originalWorldPosition.y,this._originalWorldPosition.z)
    }

    //     获取节点中心位置
    getNodeCenterPoint() {
        const worldPosition = new Vec3();
        this.node.getWorldPosition(worldPosition);
        const uiTransform = this.node.getComponent(UITransform);
        // 获取节点的宽度和高度
        const width = uiTransform?.width || 0;
        const height = uiTransform?.height || 0;

        // 获取节点的锚点
        const anchorX = uiTransform.anchorX;
        const anchorY = uiTransform.anchorY;

        // 计算中心位置
        const centerX = worldPosition.x + (width * (0.5 - anchorX));
        const centerY = worldPosition.y + (height * (0.5 - anchorY));

        return new Vec3(centerX, centerY,1)
    }
}


