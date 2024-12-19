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
        SUN: "sun"
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
        CARDS: "prefab/cards/", // 卡片
        FIGHT: "prefab/fight/", // 战斗相关资源的路径
        IMG: "img/"
    }

    static readonly PREFAB_PATH = {
        SUNFLOWER: "sunflower", // 太阳花
        NUT: "nut", // 坚果
        PEASE: "pease", // 豌豆
        CHERRY: "cherry", // 樱桃
        SUN: "sun", // 太阳
    }

    static readonly EVENT_TYPE = {
        CAPTURE_SUN: "capture_sun", // 用户捕获（点击）阳光事件
    }

    // 碰撞分组
    static readonly RIGID_GROUP = {
        DEFAULT: 1<<0, // 默认
        ZOMBIE: 1<<1, // 僵尸
        PLANT: 1<<2, // 植物
        BULLET: 1<<3, // 子弹
        CARD: 1<<4, // 卡片
        TILE: 1<<5, // 地板
    }

//     碰撞事件
    static readonly COLLISION_TYPE = {
        ZOMBIE_PLANT: "zombie_plant", // 僵尸和植物发生碰撞
        ZOMBIE_BULLET: "zombie_bullet", // 僵尸和子弹发生碰撞
        PLANT_BULLET: "plant_bullet", // 植物和子弹发生碰撞
        PLANT_TILE: "plant_tile", // 植物和地板发生碰撞
        CARD_TILE: "card_tile", // 卡片和地板发生碰撞
    }
}
