import { _decorator, Component, Prefab, UIOpacity,Node, CCInteger, resources, error, Vec3 } from 'cc';
import { Tile } from "db://assets/scripts/fight/Tile";
import { PoolManager } from "db://assets/scripts/framework/PoolManager";
import { Constant } from "db://assets/scripts/utils/constant";
import { Card } from "db://assets/scripts/fight/Card";
import { Sun } from "db://assets/scripts/fight/Sun";
import { Zombie } from "db://assets/scripts/fight/Zombie";

const { ccclass, property } = _decorator;

@ccclass('MapManager')
export class MapManager extends Component {
    @property({ type: Prefab })
    private tilePrefab:Prefab = null
    @property({ type: Node,displayName: "卡片展示区域" })
    private cardsNode:Node = null
    @property({ type: Node,displayName: "植物坑位生成范围节点" })
    private planeMapNode = null
    @property({ type: Node,displayName: "僵尸生成范围节点" })
    private zombieMapNode = null
    @property({
        type: Node,
        displayName: "阳光生成范围节点"
    })
    private sunAreaNode = null
    @property({ type: CCInteger,displayName: "行",group: "生成可种植植物坑位的行列",tooltip: "可以放置植物的坑位行数" })
    private row:number = 5
    @property({ type: CCInteger,displayName: "列",group: "生成可种植植物坑位的行列",tooltip: "可以放置植物的坑位列数" })
    private col = 9

    // 僵尸生成位置数组，一共row个起始位置
    private _zombiePosArr: Vec3[] = []



    start() {
    }

    update(deltaTime: number) {
        if(this._zombiePosArr.length == 0) {
            this.planeMapNode.children.forEach(n => {
                if(n.name[n.name.length - 1] == this.col - 1) {
                    this._zombiePosArr.push(n.worldPosition)
                }
            })
            this.scheduleOnce(() => {
                this.initZombie()
            }, 5);
        }
    }


    /**
     * 初始化放置植物的坑位
     */
    initPlantTileGrid(rows:number = this.row,cols:number = this.col) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const tile = PoolManager.instance.getNode(this.tilePrefab,this.planeMapNode)
                tile.name = `tile_${i}_${j}`
                tile.getComponent(Tile).setTilePosition(i,j)
                tile.getComponent(UIOpacity).opacity = 0; // 设置透明度
            }
         }
    }

    initCards() {
        this.cardsNode.setScale(2,2,1)
        resources.loadDir(Constant.PATH.CARDS,Prefab,(err,prefabs) => {
            if (err) {
                console.error('加载卡片资源失败:', err);
                return;
            }
            for (let i = 0; i < prefabs.length; i++) {
                const prefab = prefabs[i];
                Card.createCards(this.cardsNode,prefab,Constant.CARD_PRICE[Constant.CARD_TYPE[prefab.name]])
            }
        })

    }

    initSun() {
        resources.load(`${Constant.PATH.FIGHT}${Constant.PREFAB_PATH.SUN}`,Prefab,(err,sun) => {
            if (err) {
                error('加载太阳资源预制体失败:', err);
                return;
            }

            const cb = () => {
                Sun.createSun(sun, this.sunAreaNode);
            }
            this.schedule(cb,5)
        })
    }

    initZombie() {
        resources.load(`${Constant.PATH.FIGHT}${Constant.PREFAB_PATH.ZOMBIE}`,Prefab,(err,zombie) => {
            if (err) {
                error('加载僵尸资源预制体失败:', err);
                return;
            }

            const randomCol = Math.floor(Math.random() * this.row);
            const pos = new Vec3(this._zombiePosArr[randomCol].x, this._zombiePosArr[randomCol].y, this._zombiePosArr[randomCol].z);
            Zombie.createZombie(zombie, this.zombieMapNode, pos)
        })
    }
}


