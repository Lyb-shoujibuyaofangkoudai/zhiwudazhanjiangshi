import { math, _decorator } from 'cc';

/**
 * Actor 属性
 */
export class ActorProperty {

    /**
     * 最大生命值
     */
    maxHp : number = 100;

    /**
     * 生命
     */
    hp: number = this.maxHp;

    /**
     * 攻击力
     */
    attack: number = 10;

    /**
     * 价格
     */
    price: number = 0


    /**
     * 获取血量百分比
     */
    get hpPercent():number{
        return math.clamp01(this.hp/this.maxHp);
    }
}

