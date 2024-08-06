import { DC } from "../../constants.js";
import wordShift from "../../word-shift.js";

export const pelleRifts = {
  vacuum: {
    id: 1,
    key: "vacuum",
    name: () => $t_split("pelle_rift_vacuum_names"),
    drainResource: () => $t("infinity_points_short"),
    baseEffect: x => $t("pelle_rift_vacuum_effect", formatX(x, 2, 2)),
    additionalEffects: () => [PelleRifts.vacuum.milestones[2]],
    strike: () => PelleStrikes.infinity,
    percentage: totalFill => Math.log10(totalFill.plus(1).log10() * 10 + 1) ** 2.5 / 100,
    percentageToFill: percentage => Decimal.pow(10,
      Decimal.pow(10, (percentage * 100) ** (1 / 2.5)).div(10).minus(0.1)
    ).minus(1),
    effect: totalFill => {
      if (player.challenge.eternity.current !== 0) {
        const chall = EternityChallenge.current;
        const goal = chall.goalAtCompletions(chall.gainedCompletionStatus.totalCompletions);
        return totalFill.plus(1).pow(0.1).min(goal.pow(0.15));
      }
      return totalFill.plus(1).pow(0.33);
    },
    currency: () => Currency.infinityPoints,
    galaxyGeneratorThreshold: 1000,
    milestones: [
      {
        resource: "vacuum",
        requirement: 0.04,
        description: () => $t("pelle_rift_vacuum_milestone_0")
      },
      {
        resource: "vacuum",
        requirement: 0.06,
        description: () => $t("pelle_rift_vacuum_milestone_1", formatX(1e130)),
        effect: () => 1e130
      },
      {
        resource: "vacuum",
        requirement: 0.4,
        description: () => $t("pelle_rift_vacuum_milestone_2", wordShift.wordCycle(PelleRifts.vacuum.name)),
        effect: () => Decimal.pow(4, PelleRifts.vacuum.totalFill.log10() / 2 / 308 + 3),
        formatEffect: x => $t("pelle_rift_vacuum_milestone_2_effect", formatX(x, 2, 2))
      },
    ],
    galaxyGeneratorText: () => $t("pelle_rift_vacuum_galaxy_generator_text")
  },
  decay: {
    id: 2,
    key: "decay",
    name: () => $t_split("pelle_rift_decay_names"),
    drainResource: () => $t("replicanti"),
    spendable: true,
    baseEffect: x => $t("pelle_rift_decay_effect", formatX(x, 2, 2)),
    additionalEffects: () => [PelleRifts.decay.milestones[0], PelleRifts.decay.milestones[2]],
    strike: () => PelleStrikes.powerGalaxies,
    // 0 - 1
    percentage: totalFill => totalFill.plus(1).log10() * 0.05 / 100,
    // 0 - 1
    percentageToFill: percentage => Decimal.pow(10, 20 * percentage * 100).minus(1),
    effect: totalFill => (PelleRifts.chaos.milestones[0].canBeApplied
      ? Decimal.sqrt(2000 + 1) : Decimal.sqrt(totalFill.plus(1).log10() + 1)),
    currency: () => Currency.replicanti,
    galaxyGeneratorThreshold: 1e7,
    milestones: [
      {
        resource: "decay",
        requirement: 0.2,
        description: () => $t("pelle_rift_decay_milestone_0"),
        effect: () => {
          const x = player.celestials.pelle.rebuyables.antimatterDimensionMult;
          return Decimal.pow(1e50, x - 9);
        },
        formatEffect: x => $t("pelle_rift_decay_milestone_0_effect", formatX(x, 2, 2))
      },
      {
        resource: "decay",
        requirement: 0.6,
        description: () => $t("pelle_rift_decay_milestone_1", format(DC.E1300), formatPercents(0.1)),
        effect: () => (Replicanti.amount.gt(DC.E1300) ? 1.1 : 1)
      },
      {
        resource: "decay",
        requirement: 1,
        description: () => $t("pelle_rift_decay_milestone_2"),
        effect: () => {
          const x = PelleRifts.totalMilestones();
          return x ** 2 - 2 * x;
        },
        formatEffect: x => $t("pelle_rift_decay_milestone_2_effect", formatInt(x))
      },
    ],
    galaxyGeneratorText: () => $t("pelle_rift_decay_galaxy_generator_text")
  },
  chaos: {
    id: 3,
    key: "chaos",
    name: () => $t_split("pelle_rift_chaos_names"),
    drainResource: () => $t_split("pelle_rift_decay_names"),
    baseEffect: x => $t("pelle_rift_chaos_effect", formatX(x, 2, 2)),
    strike: () => PelleStrikes.eternity,
    percentage: totalFill => totalFill / 10,
    percentageToFill: percentage => 10 * percentage,
    effect: totalFill => {
      const fill = totalFill > 6.5
        ? (totalFill - 6.5) / 7 + 6.5
        : totalFill;
      return Decimal.pow(6, Decimal.pow(6, Decimal.pow(6, fill / 10 + 0.1)).minus(6))
        .div(1e5)
        .plus(Decimal.pow(10, fill / 10 + 0.1));
    },
    currency: () => ({
      get value() {
        return PelleRifts.decay.percentage;
      },
      set value(val) {
        const spent = PelleRifts.decay.percentage - val;
        player.celestials.pelle.rifts.decay.percentageSpent += spent;
      }
    }),
    galaxyGeneratorThreshold: 1e9,
    milestones: [
      {
        resource: "chaos",
        requirement: 0.09,
        description: () => `${wordShift.wordCycle(PelleRifts.decay.name)} \
        ${$t("pelle_rift_chaos_milestone_0")}`
      },
      {
        resource: "chaos",
        requirement: 0.15,
        description: () => $t("pelle_rift_chaos_milestone_1"),
      },
      {
        resource: "chaos",
        requirement: 1,
        description: () => $t("pelle_rift_chaos_milestone_2", formatPercents(0.01)),
      },
    ],
    galaxyGeneratorText: () => $t("pelle_rift_chaos_galaxy_generator_text")
  },
  recursion: {
    id: 4,
    key: "recursion",
    name: () => $t_split("pelle_rift_recursion_names"),
    drainResource: () => $t("eternity_points_short"),
    baseEffect: x => $t("pelle_rift_recursion_effect", formatInt(308), formatFloat(308 - x.toNumber(), 2)),
    additionalEffects: () => [PelleRifts.recursion.milestones[0], PelleRifts.recursion.milestones[1]],
    strike: () => PelleStrikes.ECs,
    percentage: totalFill => totalFill.plus(1).log10() ** 0.4 / 4000 ** 0.4,
    percentageToFill: percentage => Decimal.pow(10, percentage ** 2.5 * 4000).minus(1),
    effect: totalFill => new Decimal(58 * totalFill.plus(1).log10() ** 0.2 / 4000 ** 0.2),
    currency: () => Currency.eternityPoints,
    galaxyGeneratorThreshold: 1e10,
    milestones: [
      {
        resource: "recursion",
        requirement: 0.10,
        description: () => $t("pelle_rift_recursion_milestone_0"),
        effect: () => Math.max(100 * EternityChallenges.completions ** 2, 1) *
          Math.max(1e4 ** (EternityChallenges.completions - 40), 1),
        formatEffect: x => $t("pelle_rift_recursion_milestone_0_effect", formatX(x, 2, 2))
      },
      {
        resource: "recursion",
        requirement: 0.15,
        description: () => $t("pelle_rift_recursion_milestone_1"),
        effect: () => Decimal.pow("1e1500", ((EternityChallenges.completions - 25) / 20) ** 1.7).max(1),
        formatEffect: x => $t("pelle_rift_recursion_milestone_1_effect", formatX(x))
      },
      {
        resource: "recursion",
        requirement: 1,
        description: () => $t("pelle_rift_recursion_milestone_2"),
      },
    ],
    galaxyGeneratorText: () => $t("pelle_rift_recursion_galaxy_generator_text")
  },
  paradox: {
    id: 5,
    key: "paradox",
    name: () => $t_split("pelle_rift_paradox_names"),
    drainResource: () => $t("dilated_time"),
    baseEffect: x => $t("pelle_rift_paradox_effect", formatPow(x, 2, 3)),
    additionalEffects: () => [PelleRifts.paradox.milestones[2]],
    strike: () => PelleStrikes.dilation,
    percentage: totalFill => totalFill.plus(1).log10() / 100,
    percentageToFill: percentage => Decimal.pow10(percentage * 100).minus(1),
    effect: totalFill => new Decimal(1 + totalFill.plus(1).log10() * 0.004),
    currency: () => Currency.dilatedTime,
    galaxyGeneratorThreshold: 1e5,
    milestones: [
      {
        resource: "paradox",
        requirement: 0.15,
        description: () => $t("pelle_rift_paradox_milestone_0"),
        // FIXME: Not a great solution
        onStateChange: () => {
          updateTimeDimensionCosts();
        }
      },
      {
        resource: "paradox",
        requirement: 0.25,
        description: () => $t("pelle_rift_paradox_milestone_1", formatPow(1.4, 1, 1)),
        effect: 1.4
      },
      {
        resource: "paradox",
        requirement: 0.5,
        description: () => $t("pelle_rift_paradox_milestone_2"),
        effect: () => Math.min(
          1.1075 ** (Object.values(player.dilation.rebuyables).sum() - 60),
          712
        ),
        formatEffect: x => $t("pelle_rift_paradox_milestone_2_effect", formatX(x, 2, 2))
      },
    ],
    galaxyGeneratorText: () => $t("pelle_rift_paradox_galaxy_generator_text")
  }
};
