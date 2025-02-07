function rebuyableCost(initialCost, increment, id) {
  return initialCost * Math.pow(increment, player.celestials.teresa.perkShop[id]);
}
function rebuyable(config) {
  const { id, otherReq, cap, costCap, description, formatEffect, formatCost } = config;
  return {
    id,
    cost: () => (config.cost ? config.cost() : rebuyableCost(config.initialCost, config.increment, config.id)),
    otherReq,
    cap,
    costCap,
    description,
    effect: () => config.effect(player.celestials.teresa.perkShop[config.id]),
    formatEffect,
    formatCost,
    rebuyable: true
  };
}

export const perkShop = {
  glyphLevel: rebuyable({
    id: 0,
    initialCost: 1,
    increment: 2,
    description: () => $t("perk_shop_upgrade_0_description", formatPercents(0.05)),
    effect: bought => Math.pow(1.05, bought),
    formatEffect: value => formatX(value, 2, 2),
    formatCost: value => format(value, 2),
    costCap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 1048576 : 2048),
    cap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? Math.pow(1.05, 20) : Math.pow(1.05, 11))
  }),
  rmMult: rebuyable({
    id: 1,
    initialCost: 1,
    increment: 2,
    description: () => $t("perk_shop_upgrade_1_description"),
    effect: bought => Math.pow(2, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    costCap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 1048576 : 2048),
    cap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 1048576 : 2048)
  }),
  bulkDilation: rebuyable({
    id: 2,
    initialCost: 100,
    increment: 2,
    description: () => $t("perk_shop_upgrade_2_description"),
    effect: bought => Math.pow(2, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    costCap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 1638400 : 1600),
    cap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 16384 : 16),
  }),
  autoSpeed: rebuyable({
    id: 3,
    initialCost: 1000,
    increment: 2,
    description: () => $t("perk_shop_upgrade_3_description", formatX(2)),
    effect: bought => Math.pow(2, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    costCap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 64000 : 4000),
    cap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 64 : 4)
  }),
  musicGlyph: rebuyable({
    id: 4,
    description: () => $t("perk_shop_upgrade_4_description", formatPercents(0.8)),
    cost: () => 1,
    formatCost: value => formatInt(value),
    costCap: () => Number.MAX_VALUE,
    cap: () => Number.MAX_VALUE
  }),
  // Only appears with the perk shop increase upgrade
  fillMusicGlyph: rebuyable({
    id: 5,
    description: () => $t("perk_shop_upgrade_5_description"),
    cost: () => Math.clampMin(GameCache.glyphInventorySpace.value, 1),
    otherReq: () => GameCache.glyphInventorySpace.value > 0,
    formatCost: value => formatInt(value),
    costCap: () => Number.MAX_VALUE,
    cap: () => Number.MAX_VALUE
  }),
};
