import { DC } from "../../constants.js";

export const infinityChallenges = [
  {
    id: 1,
    description: () => $t("ic1_description"),
    goal: DC.E650,
    isQuickResettable: true,
    reward: {
      description: () => $t("ic1_reward", formatX(1.3, 1, 1)),
      effect: () => Math.pow(1.3, InfinityChallenges.completed.length),
      formatEffect: value => formatX(value, 1, 1)
    },
    unlockAM: DC.E2000,
  },
  {
    id: 2,
    description: () => $t("ic2_description", formatInt(400)),
    goal: DC.E10500,
    isQuickResettable: false,
    reward: {
      description: () => `${$t("ic2_reward")}
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": false })} ➜
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": true })}
      `,
    },
    unlockAM: DC.E11000,
  },
  {
    id: 3,
    description: () => $t("ic3_description", formatX(1)),
    goal: DC.E5000,
    isQuickResettable: false,
    effect: () => Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought),
    formatEffect: value => formatX(value, 2, 2),
    reward: {
      description: () => $t("ic3_reward"),
      effect: () => (Laitela.continuumActive
        ? Decimal.pow(1.05 + (player.galaxies * 0.005), Tickspeed.continuumValue)
        : Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought)),
      formatEffect: value => formatX(value, 2, 2),
    },
    unlockAM: DC.E12000,
  },
  {
    id: 4,
    description: () => $t("ic4_description", formatPow(0.25, 2, 2)),
    goal: DC.E13000,
    isQuickResettable: true,
    effect: 0.25,
    reward: {
      description: () => $t("ic4_reward", formatPow(1.05, 2, 2)),
      effect: 1.05
    },
    unlockAM: DC.E14000,
  },
  {
    id: 5,
    description: () => $t("ic5_description"),
    goal: DC.E16500,
    isQuickResettable: true,
    reward: {
      description: () => $t("ic5_reward", formatPercents(0.1), formatInt(1)),
      effect: 1.1
    },
    unlockAM: DC.E18000,
  },
  {
    id: 6,
    description: () => $t("ic6_description", formatInt(1)),
    goal: DC.D2E22222,
    isQuickResettable: true,
    effect: () => Currency.matter.value.clampMin(1),
    formatEffect: value => `/${format(value, 1, 2)}`,
    reward: {
      description: () => $t("ic6_reward"),
      effect: () => Tickspeed.perSecond.pow(0.0005),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E22500,
  },
  {
    id: 7,
    description: () => {
      // Copied from DimBoost.power; this is the base amount before any multipliers. Post-eternity this isn't
      // necessarily 2.5x by the time the player sees this challenge; it's probably most accurate to say what it
      // currently is, and this phrasing avoids 10x ➜ 10x with the old description.
      const mult = Effects.max(
        2,
        InfinityUpgrade.dimboostMult,
        InfinityChallenge(7).reward,
        TimeStudy(81)
      );
      return $t("ic7_description", format(mult, 2, 1), format(10));
    },
    goal: DC.E10000,
    isQuickResettable: false,
    effect: 10,
    reward: {
      description: () => $t("ic7_reward", format(2.5, 0, 1), format(4)),
      effect: 4
    },
    unlockAM: DC.E23000,
  },
  {
    id: 8,
    description: () => $t("ic8_description", formatPercents(1)),
    goal: DC.E27000,
    isQuickResettable: true,
    effect: () => DC.D0_8446303389034288.pow(
      Math.max(0, player.records.thisInfinity.time - player.records.thisInfinity.lastBuyTime)),
    reward: {
      description: () => $t("ic8_reward"),
      effect: () => AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E28000,
  },
];
