import { _decorator, Component, Prefab, UIOpacity,Node, CCInteger, resources } from 'cc';
import { Tile } from "db://assets/scripts/fight/Tile";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
import { Constant } from "db://assets/scripts/utils/constant";
import { Card } from "db://assets/scripts/fight/Card";

const { ccclass, property } = _decorator;

@ccclass('MapManager')
export class MapManager extends Component {
    @property({ type: Prefab })
    private tilePrefab:Prefab = null
    @property({ type: Node,displayName: "卡片展示区域" })
    private cardsNode:Node = null
    @property({ type: Node,displayName: "植物坑位生成范围节点" })
    private planeMapNode = null
    @property({
        type: Node,
        displayName: "阳光生成范围节点"
    })
    private sunMapNode = null

    @property({ type: CCInteger,displayName: "行",group: "生成可种植植物坑位的行列",tooltip: "可以放置植物的坑位行数" })
    private row:number = 5
    @property({ type: CCInteger,displayName: "列",group: "生成可种植植物坑位的行列",tooltip: "可以放置植物的坑位列数" })
    private col = 9



    /**
     * 初始化放置植物的坑位
     */
    initPlantTileGrid(rows:number = this.row,cols:number = this.col) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const tile = PoolManager.instance.getNode(this.tilePrefab,this.planeMapNode)
                tile.getComponent(Tile).setTilePosition(i,j)
                tile.getComponent(UIOpacity).opacity = 0; // 设置透明度
            }
         }
    }

    initCards() {
        resources.loadDir(Constant.PATH.CARDS,Prefab,(err,prefabs) => {
            if (err) {
                console.error('加载资源失败:', err);
                return;
            }
            for (let i = 0; i < prefabs.length; i++) {
                const prefab = prefabs[i];
                new Card(Constant.CARD_PRICE[Constant.CARD_TYPE[prefab.name]]).createCards(this.cardsNode,prefab)
            }
        })

    }
}


