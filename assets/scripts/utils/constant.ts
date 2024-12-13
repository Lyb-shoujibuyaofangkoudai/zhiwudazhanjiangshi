export class Constant {
    static readonly SOUND = {
        BGN: "bgm", // 背景音乐
        ENEMY_DIE: "enemyDie", // 戴夫脑子被吃的声音
        PLANT: "plant", // 植物种植音效
        PLANT_ATTACKED: "plantAttacked", // 植物被僵尸吃的声音
        WIN: "win", // 通关音效
        REPEATER_ATTACK: "repeaterAttack", // 植物攻击命中僵尸音效
    }

    static readonly ANIMATION = {
        SUNFLOWER: "sunflower", // 太阳花动画
        NUT: "nut", // 坚果动画
        ZOMBIE_ATTACK: "zombie_attack", // 僵尸攻击动画
        PEASE: "pease", // 豌豆动画
    }

    static readonly CARD_TYPE = {
        SUNFLOWER: "sunflower", // 太阳花卡片
        NUT: "nut", // 坚果卡片
        PEASE: "pease", // 豌豆卡片
        CHERRY: "cherry", // 辣椒卡片
    }

    static readonly CARD_PRICE = {
        [Constant.CARD_TYPE.SUNFLOWER]: 50, // 太阳花卡片价格
        [Constant.CARD_TYPE.NUT]: 100, // 坚果卡片价格
        [Constant.CARD_TYPE.PEASE]: 150, // 豌豆卡片价格
        [Constant.CARD_TYPE.CHERRY]: 200, // 樱桃卡片价格
    }

    static readonly PATH = {
        CARDS: "prefab/cards/"
    }
}
