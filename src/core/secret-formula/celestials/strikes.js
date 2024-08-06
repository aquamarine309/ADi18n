import { DC } from "../../constants.js";
import wordShift from "../../word-shift.js";

export const pelleStrikes = {
  infinity: {
    id: 1,
    requirementDescription: () => $t("pelle_strike_1_requirement"),
    penaltyDescription: () => $t("pelle_strike_1_penalty", formatPow(0.5, 1, 1)),
    rewardDescription: () => `Unlock ${wordShift.wordCycle(PelleRifts.vacuum.name)}
      and get a permanent Infinity Autobuyer`,
    rift: () => PelleRifts.vacuum
  },
  powerGalaxies: {
    id: 2,
    requirementDescription: () => $t("pelle_strike_2_requirement"),
    penaltyDescription: () => $t("pelle_strike_2_penalty", formatPow(0.5, 1, 1)),
    rewardDescription: () => `Unlock ${wordShift.wordCycle(PelleRifts.decay.name)}`,
    rift: () => PelleRifts.decay
  },
  eternity: {
    id: 3,
    requirementDescription: () => $t("pelle_strike_3_requirement"),
    penaltyDescription: () => $t("pelle_strike_3_penalty", format(DC.E2000)),
    rewardDescription: () => `Unlock ${wordShift.wordCycle(PelleRifts.chaos.name)}`,
    rift: () => PelleRifts.chaos
  },
  ECs: {
    id: 4,
    requirementDescription: () => $t("pelle_strike_4_requirement", formatInt(115)),
    penaltyDescription: () => $t("pelle_strike_4_penalty"),
    rewardDescription: () => `Unlock ${wordShift.wordCycle(PelleRifts.recursion.name)}`,
    rift: () => PelleRifts.recursion
  },
  dilation: {
    id: 5,
    requirementDescription: () => $t("pelle_strike_5_requirement"),
    penaltyDescription: () => $t("pelle_strike_5_penalty"),
    rewardDescription: () => `Keep the Time Dilation study across Armageddon, boost Remnant gain, and unlock
      ${wordShift.wordCycle(PelleRifts.paradox.name)}`,
    rift: () => PelleRifts.paradox
  }
};
