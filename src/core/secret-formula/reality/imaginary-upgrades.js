import { DC } from "../../constants.js";

const rebuyable = props => {
  props.cost = () => props.initialCost * Math.pow(props.costMult, player.reality.imaginaryRebuyables[props.id]);
  const { effect } = props;
  if (props.isDecimal) props.effect = () => Decimal.pow(effect, player.reality.imaginaryRebuyables[props.id]);
  else props.effect = () => effect * player.reality.imaginaryRebuyables[props.id];
  if (!props.formatEffect) props.formatEffect = value => `+${format(value, 2, 2)}`;
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const imaginaryUpgrades = [
  rebuyable({
    id: 1,
    initialCost: 3,
    costMult: 60,
    description: () => $t("imaginary_upgrade_0_description", format(0.15, 2, 2)),
    effect: 0.15
  }),
  rebuyable({
    id: 2,
    initialCost: 4,
    costMult: 60,
    description: () => $t("imaginary_upgrade_1_description", format(0.15, 2, 2)),
    effect: 0.15
  }),
  rebuyable({
    id: 3,
    initialCost: 1,
    costMult: 40,
    description: () => $t("imaginary_upgrade_2_description", format(0.4, 2, 2)),
    effect: 0.4
  }),
  rebuyable({
    id: 4,
    initialCost: 5,
    costMult: 80,
    description: () => $t("imaginary_upgrade_3_description", format(0.15, 2, 2)),
    effect: 0.15
  }),
  rebuyable({
    id: 5,
    initialCost: 1,
    costMult: 30,
    description: () => $t("imaginary_upgrade_4_description", format(0.6, 2, 2)),
    effect: 0.6
  }),
  rebuyable({
    id: 6,
    initialCost: 1e4,
    costMult: 500,
    description: () => $t("imaginary_upgrade_5_description", formatX(1e100)),
    effect: 1e100,
    formatEffect: value => formatX(value),
    isDecimal: true
  }),
  rebuyable({
    id: 7,
    initialCost: 2e5,
    costMult: 500,
    description: () => $t("imaginary_upgrade_6_description", formatInt(200)),
    effect: 200,
    formatEffect: value => $t("imaginary_upgrade_6_effect", formatInt(value))
  }),
  rebuyable({
    id: 8,
    initialCost: 1e7,
    costMult: 800,
    description: () => $t("imaginary_upgrade_7_description", format("1e100000")),
    effect: DC.E100000,
    formatEffect: value => `${formatX(value)}`,
    isDecimal: true
  }),
  rebuyable({
    id: 9,
    initialCost: 1e9,
    costMult: 1000,
    description: () => $t("imaginary_upgrade_8_description"),
    effect: 0.03,
    formatEffect: value => `+${formatPercents(value)}`,
  }),
  rebuyable({
    id: 10,
    initialCost: 8e9,
    costMult: 2000,
    description: () => $t("imaginary_upgrade_9_description"),
    effect: 1,
    formatEffect: value => `${formatX(1 + value, 2)}`
  }),
  {
    id: 11,
    cost: 5e7,
    requirement: () => $t("imaginary_upgrade_10_reuirement", format(1e90), format(player.celestials.effarig.relicShards, 2)),
    hasFailed: () => false,
    checkRequirement: () => player.celestials.effarig.relicShards >= 1e90,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    description: () => $t("imaginary_upgrade_10_description"),
    effect: () => 1 + Math.log10(player.records.totalAntimatter.log10()) / 100,
    formatEffect: value => `${formatPow(value, 0, 4)}`,
    isDisabledInDoomed: true
  },
  {
    id: 12,
    cost: 5e7,
    requirement: () => `Make a level ${formatInt(9000)} Glyph with a single Glyph level factor weight at
    ${formatInt(100)}`,
    hasFailed: () => false,
    checkRequirement: () => Object.values(player.celestials.effarig.glyphWeights).some(w => w === 100) &&
      gainedGlyphLevel().actualLevel >= 9000,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => $t("imaginary_upgrade_11_description"),
    effect: () => 2e4 * ImaginaryUpgrades.totalRebuyables,
    formatEffect: value => `${format(value, 1)}`,
    isDisabledInDoomed: true
  },
  {
    id: 13,
    cost: 5e7,
    requirement: () => `Reach ${format(Number.MAX_VALUE, 2)} projected Reality Machines within
      The Nameless Ones' Reality`,
    hasFailed: () => !Nameless.isRunning,
    // This is for consistency with the UI, which displays an amplified "projected RM" value on the reality button
    checkRequirement: () => Nameless.isRunning &&
      MachineHandler.uncappedRM.times(simulatedRealityCount(false) + 1).gte(Number.MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("imaginary_upgrade_12_description"),
    effect: () => 1 + ImaginaryUpgrades.totalRebuyables / 20 + ImaginaryUpgrades.totalSinglePurchase / 2,
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: true
  },
  {
    id: 14,
    cost: 3.5e8,
    formatCost: x => format(x, 1),
    requirement: () => `Reach a tickspeed of ${format("1e75000000000")} / sec within Eternity Challenge 5`,
    hasFailed: () => false,
    checkRequirement: () => EternityChallenge(5).isRunning && Tickspeed.perSecond.exponent >= 7.5e10,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("imaginary_upgrade_13_description", formatPow(1.5, 0, 1)),
    effect: 1.5,
    isDisabledInDoomed: true
  },
  {
    id: 15,
    cost: 1e9,
    requirement: () => `Reach ${format("1e1500000000000")} antimatter without
      ever having any 1st Infinity Dimensions`,
    hasFailed: () => player.requirementChecks.reality.maxID1.gt(0),
    checkRequirement: () => player.requirementChecks.reality.maxID1.eq(0) && player.antimatter.exponent >= 1.5e12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    // This upgrade lock acts in multiple different conditions, but isn't 100% foolproof and also blocks a few edge
    // cases which technically should be allowed but would be hard to communicate in-game. Forbidden actions are:
    // - Purchasing any ID (edge case: this is acceptable for ID2-8 inside EC2 or EC10)
    // - Purchasing any TD with any amount of EC7 completions (edge case: acceptable within EC1 or EC10)
    // - Entering EC7 with any amount of purchased TD
    description: () => $t("imaginary_upgrade_14_description")
  },
  {
    id: 16,
    cost: 3.5e9,
    formatCost: x => format(x, 1),
    requirement: () => `Destabilize Lai'tela's Reality in under ${formatInt(30)} seconds twice`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.maxAllowedDimension <= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("imaginary_upgrade_15_description"),
  },
  {
    id: 17,
    cost: 6e9,
    requirement: () => `Automatically condense at least ${formatInt(20)} Singularities at once`,
    hasFailed: () => false,
    checkRequirement: () => Singularity.singularitiesGained >= 20 &&
      Currency.darkEnergy.gte(Singularity.cap * SingularityMilestone.autoCondense.effectOrDefault(Infinity)),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE,
    description: () => $t("imaginary_upgrade_16_description"),
  },
  {
    id: 18,
    cost: 1.5e10,
    formatCost: x => format(x, 1),
    requirement: () => `Have ${formatInt(80000)} total Galaxies`,
    hasFailed: () => false,
    checkRequirement: () => Replicanti.galaxies.total + player.galaxies +
      player.dilation.totalTachyonGalaxies >= 80000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("imaginary_upgrade_17_description"),
  },
  {
    id: 19,
    cost: 2.8e10,
    formatCost: x => format(x, 1),
    requirement: () => `Reach ${formatInt(3.85e6)} Tickspeed Continuum without ever having more than
      ${formatInt(8)} Time Studies in this Reality`,
    hasFailed: () => player.requirementChecks.reality.maxStudies > 8,
    checkRequirement: () => player.requirementChecks.reality.maxStudies <= 8 &&
      Tickspeed.continuumValue >= 3.85e6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: () => `purchase more than ${formatInt(8)} Time Studies`,
    description: () => $t("imaginary_upgrade_18_description")
  },
  {
    id: 20,
    cost: 3e12,
    requirement: () => `Have a Continuum increase of at least ${formatPercents(1)}`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.matterExtraPurchaseFactor >= 2,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("imaginary_upgrade_19_description", formatInt(10)),
    effect: 10,
    isDisabledInDoomed: true
  },
  {
    id: 21,
    cost: 1e13,
    requirement: () => `Reach ${format("1e7400000000000")} antimatter with Continuum disabled for the entire Reality`,
    hasFailed: () => !player.requirementChecks.reality.noContinuum,
    checkRequirement: () => player.requirementChecks.reality.noContinuum &&
      Currency.antimatter.value.log10() >= 7.4e12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "enable Continuum",
    description: () => $t("imaginary_upgrade_20_description"),
    effect: () => Math.clampMin(Math.pow(Math.log10(Currency.imaginaryMachines.value) - 10, 3), 1),
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: true
  },
  {
    id: 22,
    cost: 1.5e14,
    formatCost: x => format(x, 1),
    requirement: () => `Reach ${format("1e150000000000")} antimatter in Effarig's Reality with
      at least ${formatInt(4)} Cursed Glyphs equipped`,
    // Note: 4 cursed glyphs is -12 glyph count, but equipping a positive glyph in the last slot is allowed
    hasFailed: () => !Effarig.isRunning || player.requirementChecks.reality.maxGlyphs > -10,
    checkRequirement: () => Effarig.isRunning && player.requirementChecks.reality.maxGlyphs < -10 &&
      Currency.antimatter.value.exponent >= 1.5e11,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("imaginary_upgrade_21_description", format(1e100)),
    effect: 1e100,
    isDisabledInDoomed: true
  },
  {
    id: 23,
    cost: 6e14,
    requirement: () => `Reach Glyph level ${formatInt(20000)} in Ra's Reality with
      at most ${formatInt(0)} Glyphs equipped`,
    hasFailed: () => !Ra.isRunning || player.requirementChecks.reality.maxGlyphs > 0,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.maxGlyphs <= 0 &&
      gainedGlyphLevel().actualLevel >= 20000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => $t("imaginary_upgrade_22_description"),
    effect: () => Math.floor(0.25 * Math.pow(Tesseracts.effectiveCount, 2)),
    formatEffect: value => `${formatX(value)}`,
    isDisabledInDoomed: true
  },
  {
    id: 24,
    cost: 6e14,
    // We unfortunately don't have the UI space to be more descriptive on this button without causing text overflow,
    // so hopefully the additional modals (from the upgrade lock) will mostly communicate the idea that this is under
    // the same conditions as hard V's Post-destination
    requirement: () => `Have ${formatInt(13000)} Antimatter Galaxies in Ra's Reality
      with a fully inverted Black Hole`,
    hasFailed: () => !Ra.isRunning || player.requirementChecks.reality.slowestBH > 1e-300,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.slowestBH <= 1e-300 &&
      player.galaxies >= 13000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    // Three locking events: uninvert, discharge, and entering (but not auto-completing) EC12
    description: () => $t("imaginary_upgrade_23_description"),
    effect: () => Decimal.pow(player.celestials.laitela.singularities, 300),
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: true
  },
  {
    id: 25,
    cost: 1.6e15,
    formatCost: x => format(x, 1),
    requirement: () => `Reach Reality in Lai'tela's Reality with all Dimensions disabled and
      at least ${formatInt(4)} empty Glyph slots`,
    hasFailed: () => !Laitela.isRunning || Laitela.maxAllowedDimension !== 0 ||
      Glyphs.activeWithoutCompanion.length > 1,
    checkRequirement: () => Laitela.isRunning && Laitela.maxAllowedDimension === 0 &&
      Glyphs.activeWithoutCompanion.length <= 1 && TimeStudy.reality.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "equip another non-Companion Glyph",
    description: () => $t("imaginary_upgrade_24_description"),
  },
];
