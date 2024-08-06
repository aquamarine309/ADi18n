import { DC } from "../../constants.js";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.reality.rebuyables[props.id],
    1e30,
    props.initialCost,
    props.costMult,
    props.costMult / 10,
    DC.E309,
    1e3,
    props.initialCost * props.costMult
  );
  const { effect } = props;
  props.effect = () => Math.pow(
    effect + ImaginaryUpgrade(props.id).effectOrDefault(0),
    player.reality.rebuyables[props.id] * getAdjustedGlyphEffect("realityrow1pow"));
  props.description = () => $t(`reality_upgrade_${props.id - 1}_description`,
    ImaginaryUpgrade(props.id).effectValue === 0
      ? formatInt(effect)
      : format(effect + ImaginaryUpgrade(props.id).effectValue, 2, 2));
  props.formatEffect = value => formatX(value, 2, 0);
  props.formatCost = value => format(value, 2, 0);
  return props;
};


export const realityUpgrades = [
  rebuyable({
    id: 1,
    initialCost: 1,
    costMult: 30,
    effect: 3
  }),
  rebuyable({
    id: 2,
    initialCost: 1,
    costMult: 30,
    effect: 3
  }),
  rebuyable({
    id: 3,
    initialCost: 2,
    costMult: 30,
    effect: 3
  }),
  rebuyable({
    id: 4,
    initialCost: 2,
    costMult: 30,
    effect: 3
  }),
  rebuyable({
    id: 5,
    initialCost: 3,
    costMult: 50,
    effect: 5
  }),
  {
    id: 6,
    cost: 15,
    requirement: "Complete your first manual Eternity without using Replicanti Galaxies",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => !(player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities),
    checkRequirement: () => player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: "gain a Replicanti Galaxy",
    description: () => $t("reality_upgrade_5_description"),
    effect: () => 1 + Replicanti.galaxies.total / 50,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 7,
    cost: 15,
    requirement: "Complete your first Infinity with at most 1 Antimatter Galaxy",
    hasFailed: () => !(player.galaxies <= 1 && player.requirementChecks.reality.noInfinities),
    checkRequirement: () => player.galaxies <= 1 && player.requirementChecks.reality.noInfinities,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    canLock: true,
    lockEvent: "gain another Antimatter Galaxy",
    description: () => $t("reality_upgrade_6_description"),
    effect: () => 1 + player.galaxies / 30,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 8,
    cost: 15,
    requirement: "Manually Eternity without any automatic Achievements",
    hasFailed: () => player.reality.gainedAutoAchievements,
    checkRequirement: () => !player.reality.gainedAutoAchievements,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    // We don't have lockEvent because the modal can never show up for this upgrade
    description: () => $t("reality_upgrade_7_description"),
    effect: () => Math.sqrt(Achievements.power),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 9,
    cost: 15,
    requirement: () => `Eternity for ${format("1e4000")} Eternity Points using
      only a single Glyph which must be level ${formatInt(3)}+.`,
    hasFailed: () => {
      const invalidEquippedGlyphs = Glyphs.activeWithoutCompanion.length > 1 ||
        (Glyphs.activeWithoutCompanion.length === 1 && Glyphs.activeWithoutCompanion[0].level < 3);
      const hasValidGlyphInInventory = Glyphs.inventory.countWhere(g => g && g.level >= 3) > 0;
      return invalidEquippedGlyphs || (Glyphs.activeWithoutCompanion.length === 0 && !hasValidGlyphInInventory);
    },
    checkRequirement: () => Currency.eternityPoints.exponent >= 4000 &&
      Glyphs.activeWithoutCompanion.length === 1 && Glyphs.activeWithoutCompanion[0].level >= 3,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    // There are two locking events - equipping a glyph with too low a level, and equipping a second glyph
    description: () => $t("reality_upgrade_8_description"),
    effect: () => 1
  },
  {
    id: 10,
    cost: 15,
    requirement: () => `Complete your first manual Eternity with at least ${formatPostBreak(DC.E400)} Infinity Points`,
    hasFailed: () => !player.requirementChecks.reality.noEternities,
    checkRequirement: () => Currency.infinityPoints.exponent >= 400 &&
      player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: "Eternity",
    bypassLock: () => Currency.infinityPoints.exponent >= 400,
    description: () => $t("reality_upgrade_9_description", formatInt(100)),
    automatorPoints: 15,
    shortDescription: () => $t("reality_upgrade_9_short_description", formatInt(100)),
    effect: () => 100
  },
  {
    id: 11,
    cost: 50,
    requirement: () => `${format(Currency.infinitiesBanked.value, 2)}/${format(DC.E12)} Banked Infinities`,
    checkRequirement: () => Currency.infinitiesBanked.exponent >= 12,
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.REALITY_FIRST_UNLOCKED],
    description: () => $t("reality_upgrade_10_description", formatPercents(0.1)),
    automatorPoints: 5,
    shortDescription: () => $t("reality_upgrade_10_short_description"),
    effect: () => gainedInfinities().times(0.1),
    formatEffect: value => `${format(value)} ${$t("ec7_reward_effect")}`
  },
  {
    id: 12,
    cost: 50,
    requirement: () => `Eternity for ${format(DC.E70)} Eternity Points without completing Eternity Challenge 1`,
    hasFailed: () => EternityChallenge(1).completions !== 0,
    checkRequirement: () => Currency.eternityPoints.exponent >= 70 && EternityChallenge(1).completions === 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: "complete Eternity Challenge 1",
    description: () => $t("reality_upgrade_11_description"),
    effect: () => Currency.timeTheorems.value
      .minus(DC.E3).clampMin(2)
      .pow(Math.log2(Math.min(Currency.realities.value, 1e4))).clampMin(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 13,
    cost: 50,
    requirement: () => `Eternity for ${format(DC.E4000)} Eternity Points without Time Dim. 5-8`,
    hasFailed: () => !Array.range(5, 4).every(i => TimeDimension(i).amount.equals(0)),
    checkRequirement: () => Currency.eternityPoints.exponent >= 4000 &&
      Array.range(5, 4).every(i => TimeDimension(i).amount.equals(0)),
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: "purchase a Time Dimension above the 4th TD",
    description: () => $t("reality_upgrade_12_description", formatX(5)),
    automatorPoints: 10,
    shortDescription: () => $t("reality_upgrade_12_description", formatX(5)),
  },
  {
    id: 14,
    cost: 50,
    requirement: () => `${format(Currency.eternities.value, 2)}/${format(1e7)} Eternities`,
    checkRequirement: () => Currency.eternities.gte(1e7),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.REALITY_FIRST_UNLOCKED],
    description: () => $t("reality_upgrade_13_description"),
    automatorPoints: 5,
    shortDescription: () => $t("reality_upgrade_13_description"),
    effect: () => Currency.realities.value * Ra.unlocks.continuousTTBoost.effects.eternity.effectOrDefault(1),
    formatEffect: value => `${format(value)} ${$t("ec7_reward_effect")}`
  },
  {
    id: 15,
    cost: 50,
    requirement: () => `Have ${format(DC.E10)} Eternity Points without purchasing
      the ${formatX(5)} Eternity Point upgrade`,
    hasFailed: () => player.epmultUpgrades !== 0,
    checkRequirement: () => Currency.eternityPoints.exponent >= 10 && player.epmultUpgrades === 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: () => `purchase a ${formatX(5)} EP upgrade`,
    description: () => $t("reality_upgrade_14_description", formatX(5)),
    effect: () => Math.max(Math.sqrt(Decimal.log10(EternityUpgrade.epMult.effectValue)) / 9, 1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 16,
    cost: 1500,
    requirement: () => `Reality with ${formatInt(4)} Glyphs equipped of uncommon or better rarity
      (${formatInt(Glyphs.activeWithoutCompanion.countWhere(g => g && g.strength >= 1.5))} equipped)`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere(g => g && g.strength >= 1.5);
      const equipped = Glyphs.activeWithoutCompanion.countWhere(g => g.strength >= 1.5);
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length;
      return equipped + Math.min(availableGlyphs, availableSlots) < 4;
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere(g => g.strength >= 1.5) === 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => $t("reality_upgrade_15_description"),
    effect: 1.3,
    formatCost: value => format(value, 1, 0)
  },
  {
    id: 17,
    cost: 1500,
    requirement: () => `Reality with ${formatInt(4)} Glyphs equipped, each having at least ${formatInt(2)} effects
      (${formatInt(Glyphs.activeWithoutCompanion.countWhere(g => g && countValuesFromBitmask(g.effects) >= 2))}
      equipped)`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere(g => g && countValuesFromBitmask(g.effects) >= 2);
      const equipped = Glyphs.activeWithoutCompanion.countWhere(g => countValuesFromBitmask(g.effects) >= 2);
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length;
      return equipped + Math.min(availableGlyphs, availableSlots) < 4;
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere(g => countValuesFromBitmask(g.effects) >= 2) === 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => $t("reality_upgrade_16_description", formatPercents(0.5)),
    effect: 0.5,
    formatCost: value => format(value, 1, 0)
  },
  {
    id: 18,
    cost: 1500,
    requirement: () => `Reality with ${formatInt(4)} Glyphs equipped, each at level ${formatInt(10)} or higher
      (${formatInt(Glyphs.activeWithoutCompanion.countWhere(g => g && g.level >= 10))} equipped)`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere(g => g && g.level >= 10);
      const equipped = Glyphs.activeWithoutCompanion.countWhere(g => g.level >= 10);
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length;
      return equipped + Math.min(availableGlyphs, availableSlots) < 4;
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere(g => g.level >= 10) === 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => $t("reality_upgrade_17_description"),
    effect: () => Math.max(Math.sqrt(Currency.eternities.value.plus(1).log10()) * 0.45, 1),
    formatCost: value => format(value, 1, 0)
  },
  {
    id: 19,
    cost: 1500,
    requirement: () => `Have a total of ${formatInt(30)} or more Glyphs at once
      (You have ${formatInt(Glyphs.allGlyphs.countWhere(g => g.type !== "companion"))})`,
    hasFailed: () => Glyphs.allGlyphs.countWhere(g => g.type !== "companion") < 30,
    checkRequirement: () => Glyphs.allGlyphs.countWhere(g => g.type !== "companion") >= 30,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => $t("reality_upgrade_18_description"),
    formatCost: value => format(value, 1, 0)
  },
  {
    id: 20,
    cost: 1500,
    requirement: () => `${formatInt(100)} days total play time after unlocking the Black Hole
      (Currently: ${Time.timeSinceBlackHole.toStringShort(false)})`,
    hasFailed: () => !BlackHole(1).isUnlocked && Currency.realityMachines.lt(100),
    checkRequirement: () => Time.timeSinceBlackHole.totalDays >= 100 && BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("reality_upgrade_19_description"),
    automatorPoints: 10,
    shortDescription: () => () => $t("reality_upgrade_19_short_description"),
    formatCost: value => format(value, 1, 0)
  },
  {
    id: 21,
    cost: 100000,
    requirement: () => `${formatInt(Replicanti.galaxies.total + player.galaxies +
      player.dilation.totalTachyonGalaxies)}/${formatInt(2800)} total Galaxies from all types`,
    checkRequirement: () =>
      Replicanti.galaxies.total + player.galaxies + player.dilation.totalTachyonGalaxies >= 2800,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("reality_upgrade_20_description", formatInt(1e5)),
    effect: 1e5
  },
  {
    id: 22,
    cost: 100000,
    requirement: () => `${format(Currency.timeShards.value, 1)}/${format(DC.E28000)} Time Shards`,
    checkRequirement: () => Currency.timeShards.exponent >= 28000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("reality_upgrade_21_description"),
    effect: () => Decimal.pow10(Math.pow(1 + 2 * Math.log10(Time.thisReality.totalDays + 1), 1.6)),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 23,
    cost: 100000,
    requirement: () => `Reality in under ${formatInt(15)} minutes of game time
      (Fastest: ${Time.bestReality.toStringShort()})`,
    hasFailed: () => Time.thisReality.totalMinutes >= 15,
    checkRequirement: () => Time.thisReality.totalMinutes < 15,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => $t("reality_upgrade_22_description"),
    effect: () => 15 / Math.clamp(Time.bestReality.totalMinutes, 1 / 12, 15),
    cap: 180,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    id: 24,
    cost: 100000,
    requirement: () => `Reality for ${formatInt(5000)} Reality Machines without equipped Glyphs`,
    hasFailed: () => Glyphs.activeWithoutCompanion.length > 0,
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(5000) &&
      Glyphs.activeWithoutCompanion.length === 0,
    canLock: true,
    lockEvent: "equip a non-Companion Glyph",
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => $t("reality_upgrade_23_description"),
    effect: () => 1
  },
  {
    id: 25,
    cost: 100000,
    requirement: () => `Reach ${format(DC.E11111)} EP (Best: ${format(player.records.bestReality.bestEP, 2)} EP)`,
    checkRequirement: () => player.records.bestReality.bestEP.exponent >= 11111,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    description: () => $t("reality_upgrade_24_description"),
    automatorPoints: 100,
    shortDescription: () => () => $t("reality_upgrade_24_short_description"),
  },
];
