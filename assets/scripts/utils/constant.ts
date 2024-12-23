export class Constant {
    static readonly SOUND = {
        // 背景音乐
        BGN: "bgm",
        // 戴夫脑子被吃的声音
        ENEMY_DIE: "enemyDie",
        // 植物种植音效
        PLANT: "plant",
        // 植物被僵尸吃的声音
        PLANT_ATTACKED: "plantAttacked",
        // 通关音效
        WIN: "win",
        // 植物攻击命中僵尸音效
        REPEATER_ATTACK: "repeaterAttack",
    }

    static readonly ANIMATION = {
        // 太阳花动画
        SUNFLOWER: "sunflower",
        // 坚果动画
        NUT: "nut",
        // 僵尸攻击动画
        ZOMBIE_ATTACK: "zombie_attack",
        // 豌豆动画
        PEASE: "pease",
        SUN: "sun"
    }

    static readonly CARD_TYPE = {
        // 太阳花卡片
        SUNFLOWER: "sunflower",
        // 坚果卡片
        NUT: "nut",
        // 豌豆卡片
        PEASE: "pease",
        // 辣椒卡片
        CHERRY: "cherry",
    }

    static readonly CARD_PRICE = {
        // 太阳花卡片价格
        [Constant.CARD_TYPE.SUNFLOWER]: 50,
        // 坚果卡片价格
        [Constant.CARD_TYPE.NUT]: 100,
        // 豌豆卡片价格
        [Constant.CARD_TYPE.PEASE]: 150,
        // 樱桃卡片价格
        [Constant.CARD_TYPE.CHERRY]: 200,
    }

    static readonly PATH = {
        CARDS: "prefab/cards/", // 卡片
        FIGHT: "prefab/fight/", // 战斗相关资源的路径
        IMG: "img/"
    }

    static readonly PREFAB_PATH = {
        // 太阳花
        SUNFLOWER: "sunflower",
        // 坚果
        NUT: "nut",
        // 豌豆
        PEASE: "pease",
        // 樱桃
        CHERRY: "cherry",
        // 太阳
        SUN: "sun",
    }

    static readonly EVENT_TYPE = {
        // 用户捕获（点击）阳光事件
        CAPTURE_SUN: "capture_sun",
        // 阳光数量变化事件
        SUN_COUNT_CHANGE: "sun_count_change",
        // 种植植物到地板上
        PLANT_TO_TILE: "plant_to_tile"
    }

    // 碰撞分组
    static readonly RIGID_GROUP = {
        // 默认
        DEFAULT: 1<<0,
        // 僵尸
        ZOMBIE: 1<<1,
        // 植物
        PLANT: 1<<2,
        // 子弹
        BULLET: 1<<3,
        // 卡片
        CARD: 1<<4,
        // 地板
        TILE: 1<<5,
    }

//     碰撞事件
    static readonly COLLISION_TYPE = {
        // 僵尸和植物发生碰撞
        ZOMBIE_PLANT: `${Constant.RIGID_GROUP.ZOMBIE}_${Constant.RIGID_GROUP.PLANT}`,
        // 僵尸和子弹发生碰撞
        ZOMBIE_BULLET: `${Constant.RIGID_GROUP.ZOMBIE}_${Constant.RIGID_GROUP.BULLET}`,
        // 植物和子弹发生碰撞
        PLANT_BULLET: `${Constant.RIGID_GROUP.PLANT}_${Constant.RIGID_GROUP.BULLET}`,
        // 植物和地板发生碰撞
        PLANT_TILE: `${Constant.RIGID_GROUP.PLANT}_${Constant.RIGID_GROUP.TILE}`,
        // 卡片和地板发生碰撞
        CARD_TILE: `${Constant.RIGID_GROUP.CARD}_${Constant.RIGID_GROUP.TILE}`,
    }
}
