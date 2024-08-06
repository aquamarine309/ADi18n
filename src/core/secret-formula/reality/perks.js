import { DC } from "../../constants.js";

export const PERK_FAMILY = {
  ANTIMATTER: "ANTIMATTER",
  INFINITY: "INFINITY",
  ETERNITY: "ETERNITY",
  DILATION: "DILATION",
  REALITY: "REALITY",
  AUTOMATION: "AUTOMATION",
  ACHIEVEMENT: "ACHIEVEMENT",
};

// This function isn't used in-game, see note below for its intended usage
// eslint-disable-next-line no-unused-vars
function vectorToNum(v) {
  return Math.floor(v.x / 5) + 400 * Math.floor(v.y / 5) + 80200;
}

/**
 * In order to reduce boilerplate code and excessive Vector object declarations, the node positions in fixed layouts
 * are specified as numbers which are decoded on-the-fly using positionNumToVector in PerksTab.vue. The function
 * vectorToNum above is the inverse of that function.
 *
 * To make a new preset layout, define vectorToNum in the console, move all the nodes around in-game and then run
 *    Object.values(PerkNetwork.network.body.nodes).filter(n => n.edges.length !== 0).map(v => vectorToNum(v))
 * in the console to get all the current node positions. Then, append the resulting numbers to each layoutPosList
 * array below and make the appripriate entry in PerkLayouts.
 *
 * Note: This encoding/decoding only works properly for coordinates with values between -1000 and 1000, and will
 * be slightly off for vectors whose coordinates aren't divisible by 5
 */
export const perks = {
  firstPerk: {
    id: 0,
    family: PERK_FAMILY.REALITY,
    description() {
      return $t("perk_0_description", formatInt(4));
    },
    effect: 4,
    layoutPosList: [76596, 80200, 80600, 80200, 80188, 67769],
  },
  startAM: {
    id: 10,
    family: PERK_FAMILY.ANTIMATTER,
    description() {
      return $t("perk_10_description", format(5e130));
    },
    bumpCurrency: () => Currency.antimatter.bumpTo(5e130),
    effect: 5e130,
    layoutPosList: [76559, 80600, 80199, 80600, 82191, 75745],
  },
  startIP1: {
    id: 12,
    family: PERK_FAMILY.INFINITY,
    description() {
      return $t("perk_12_description", format(5e15));
    },
    bumpCurrency: () => Currency.infinityPoints.bumpTo(5e15),
    effect: 5e15,
    layoutPosList: [74523, 80599, 79798, 80599, 82594, 91322],
  },
  startIP2: {
    id: 13,
    family: PERK_FAMILY.INFINITY,
    description() {
      return $t("perk_13_description", format(5e130));
    },
    bumpCurrency: () => Currency.infinityPoints.bumpTo(5e130),
    effect: 5e130,
    layoutPosList: [62111, 80598, 79797, 80998, 82597, 91690],
  },
  startEP1: {
    id: 14,
    family: PERK_FAMILY.ETERNITY,
    description() {
      return $t("perk_14_description", formatInt(10));
    },
    bumpCurrency: () => Currency.eternityPoints.bumpTo(10),
    effect: 10,
    automatorPoints: 5,
    shortDescription: () => $t("perk_14_description_short", formatInt(10)),
    layoutPosList: [88915, 80999, 79398, 80598, 82197, 103734],
  },
  startEP2: {
    id: 15,
    family: PERK_FAMILY.ETERNITY,
    description() {
      return $t("perk_15_description", format(5000));
    },
    bumpCurrency: () => Currency.eternityPoints.bumpTo(5000),
    effect: 5000,
    layoutPosList: [92484, 81398, 78998, 80597, 82200, 102193],
  },
  startEP3: {
    id: 16,
    family: PERK_FAMILY.ETERNITY,
    description() {
      return $t("perk_16_description", format(5e9));
    },
    bumpCurrency: () => Currency.eternityPoints.bumpTo(5e9),
    effect: 5e9,
    automatorPoints: 10,
    shortDescription: () => $t("perk_16_short_description", format(5e9)),
    layoutPosList: [96459, 81798, 78997, 80596, 82203, 106224],
  },
  startTP: {
    id: 17,
    family: PERK_FAMILY.DILATION,
    description() {
      return $t("perk_17_description", formatInt(10));
    },
    effect: () => (Nameless.isRunning ? 1 : 10),
    automatorPoints: 5,
    shortDescription: () => $t("perk_17_short_description", formatInt(10)),
    layoutPosList: [102120, 81399, 79399, 80197, 81800, 109376],
  },
  antimatterNoReset: {
    id: 30,
    family: PERK_FAMILY.ANTIMATTER,
    description() {
      return $t("perk_30_description");
    },
    layoutPosList: [85343, 81000, 79799, 80199, 82194, 92553],
  },
  studyPassive: {
    id: 31,
    family: PERK_FAMILY.ETERNITY,
    description() {
      return `${$t("perk_31_description", formatX(50), formatX(DC.E50))}
        ${Pelle.isDoomed ? "" : $t("perk_31_description_b", format(3))}`;
    },
    layoutPosList: [67054, 79400, 80999, 80202, 78594, 52589],
  },
  autounlockEU1: {
    id: 40,
    family: PERK_FAMILY.ETERNITY,
    description: () => $t("perk_40_description"),
    layoutPosList: [89407, 80601, 80201, 79800, 80591, 73007],
  },
  autounlockEU2: {
    id: 41,
    family: PERK_FAMILY.ETERNITY,
    description() {
      return $t("perk_41_description", formatX(1e10));
    },
    layoutPosList: [103008, 81001, 80202, 79400, 80594, 81867],
  },
  autounlockDilation1: {
    id: 42,
    family: PERK_FAMILY.DILATION,
    description: () => $t("perk_42_description"),
    layoutPosList: [119833, 81801, 79403, 79398, 80200, 97510],
  },
  autounlockDilation2: {
    id: 43,
    family: PERK_FAMILY.DILATION,
    description: () => $t("perk_43_description"),
    layoutPosList: [124260, 82201, 79003, 79397, 80203, 85513],
  },
  autounlockDilation3: {
    id: 44,
    family: PERK_FAMILY.DILATION,
    description: () => $t("perk_44_description"),
    automatorPoints: 5,
    shortDescription: () => $t("perk_44_short_description"),
    layoutPosList: [124289, 82601, 79002, 79396, 80206, 72282],
  },
  autounlockTD: {
    id: 45,
    family: PERK_FAMILY.DILATION,
    description: () => $t("perk_45_description"),
    automatorPoints: 5,
    shortDescription: () => $t("perk_45_short_description"),
    layoutPosList: [127117, 82600, 79001, 79796, 80209, 61869],
  },
  autounlockReality: {
    id: 46,
    family: PERK_FAMILY.REALITY,
    description() {
      return $t("perk_46_description", format(DC.E4000));
    },
    automatorPoints: 10,
    shortDescription: () => $t("perk_46_short_description"),
    layoutPosList: [124343, 83000, 79000, 79795, 80212, 71046],
  },
  bypassIDAntimatter: {
    id: 51,
    family: PERK_FAMILY.INFINITY,
    description: () => $t("perk_51_description"),
    layoutPosList: [51317, 80998, 79397, 80997, 82600, 104489],
  },
  bypassTGReset: {
    id: 52,
    family: PERK_FAMILY.DILATION,
    description: () => $t("perk_52_description"),
    layoutPosList: [116568, 81800, 79801, 79798, 81400, 112677],
  },
  bypassECDilation: {
    id: 53,
    family: PERK_FAMILY.DILATION,
    description: () => $t("perk_53_description"),
    automatorPoints: 5,
    shortDescription: () => $t("perk_53_short_description"),
    layoutPosList: [129011, 81802, 80203, 80198, 80600, 109116],
  },
  bypassEC1Lock: {
    id: 54,
    family: PERK_FAMILY.ETERNITY,
    description: () => $t("perk_54_description"),
    layoutPosList: [64284, 79000, 81399, 80603, 78597, 44167],
  },
  bypassEC2Lock: {
    id: 55,
    family: PERK_FAMILY.ETERNITY,
    description: () => $t("perk_55_description"),
    layoutPosList: [55463, 78999, 80998, 80602, 78197, 48944],
  },
  bypassEC3Lock: {
    id: 56,
    family: PERK_FAMILY.ETERNITY,
    description: () => $t("perk_56_description"),
    layoutPosList: [75475, 79001, 81400, 80203, 78997, 47822],
  },
  bypassEC5Lock: {
    id: 57,
    family: PERK_FAMILY.ETERNITY,
    description: () => $t("perk_57_description"),
    layoutPosList: [70626, 79800, 81000, 80201, 78591, 62607],
  },
  autocompleteEC1: {
    id: 60,
    family: PERK_FAMILY.AUTOMATION,
    description() {
      return $t("perk_60_description", formatInt(60));
    },
    effect: 60,
    automatorPoints: 5,
    shortDescription: () => $t("perk_60_short_description", formatInt(60)),
    layoutPosList: [90660, 79402, 81002, 79803, 79397, 46664],
  },
  autocompleteEC2: {
    id: 61,
    family: PERK_FAMILY.AUTOMATION,
    description() {
      return $t("perk_61_description", formatInt(40), formatInt(20));
    },
    effect: 40,
    layoutPosList: [95485, 79002, 81402, 79804, 79400, 53486],
  },
  autocompleteEC3: {
    id: 62,
    family: PERK_FAMILY.AUTOMATION,
    description() {
      return $t("perk_62_description", formatInt(20), formatInt(20));
    },
    effect: 20,
    automatorPoints: 10,
    shortDescription: () => $t("perk_62_short_description", formatInt(20)),
    layoutPosList: [96311, 78602, 81401, 80204, 79403, 61903],
  },
  studyActiveEP: {
    id: 70,
    family: PERK_FAMILY.ETERNITY,
    description: () => $t("perk_70_description"),
    layoutPosList: [56633, 79399, 80599, 80601, 78194, 58565],
  },
  studyIdleEP: {
    id: 71,
    family: PERK_FAMILY.ETERNITY,
    description() {
      return $t("perk_71_description", formatInt(15));
    },
    effect: 15,
    layoutPosList: [80248, 79401, 81001, 79802, 78994, 56239],
  },
  studyECRequirement: {
    id: 72,
    family: PERK_FAMILY.ETERNITY,
    description: () => $t("perk_72_description"),
    automatorPoints: 10,
    shortDescription: () => $t("perk_72_short_description"),
    layoutPosList: [62714, 78600, 81398, 80604, 78600, 40599],
  },
  studyECBulk: {
    id: 73,
    family: PERK_FAMILY.ETERNITY,
    description: () => $t("perk_73_description"),
    automatorPoints: 15,
    shortDescription: () => $t("perk_73_short_description"),
    layoutPosList: [62741, 78200, 81397, 81004, 78603, 41435],
  },
  retroactiveTP1: {
    id: 80,
    family: PERK_FAMILY.DILATION,
    description() {
      return $t("perk_80_description", formatFloat(1.5, 1));
    },
    effect: 1.5,
    layoutPosList: [111739, 81799, 79800, 79797, 81403, 115434],
  },
  retroactiveTP2: {
    id: 81,
    family: PERK_FAMILY.DILATION,
    description() {
      return $t("perk_81_description", formatInt(2));
    },
    effect: 2,
    layoutPosList: [103757, 82199, 79401, 80196, 81406, 117382],
  },
  retroactiveTP3: {
    id: 82,
    family: PERK_FAMILY.DILATION,
    description() {
      return $t("perk_82_description", formatFloat(2.5, 1));
    },
    effect: 2.5,
    layoutPosList: [96175, 82599, 79400, 80195, 81409, 116540],
  },
  retroactiveTP4: {
    id: 83,
    family: PERK_FAMILY.DILATION,
    description() {
      return $t("perk_83_description", formatInt(3));
    },
    effect: 3,
    automatorPoints: 10,
    shortDescription: () => $t("perk_83_short_description", formatX(3)),
    layoutPosList: [86984, 82598, 78999, 80595, 81412, 114103],
  },
  autobuyerDilation: {
    id: 100,
    family: PERK_FAMILY.AUTOMATION,
    description: () => $t("perk_100_description"),
    automatorPoints: 5,
    shortDescription: () => "Dilation Upgrade Autobuyers",
    layoutPosList: [117401, 81401, 79802, 79799, 80597, 96672],
  },
  autobuyerFasterID: {
    id: 101,
    family: PERK_FAMILY.AUTOMATION,
    description() {
      return $t("perk_101_description", formatX(3));
    },
    effect: 1 / 3,
    automatorPoints: 5,
    shortDescription: () => $t("perk_101_short_description"),
    layoutPosList: [74095, 80199, 80198, 81000, 82997, 77720],
  },
  autobuyerFasterReplicanti: {
    id: 102,
    family: PERK_FAMILY.AUTOMATION,
    description() {
      return $t("perk_102_description", formatX(3));
    },
    effect: 1 / 3,
    automatorPoints: 5,
    shortDescription: () => $t("perk_102_short_description"),
    layoutPosList: [57685, 80198, 80197, 80999, 83000, 79297],
  },
  autobuyerFasterDilation: {
    id: 103,
    family: PERK_FAMILY.AUTOMATION,
    description() {
      return $t("perk_103_description", formatX(3));
    },
    effect: 1 / 3,
    automatorPoints: 5,
    shortDescription: () => $t("perk_103_short_description"),
    layoutPosList: [113895, 82602, 79402, 79395, 80609, 72715],
  },
  ttBuySingle: {
    id: 104,
    family: PERK_FAMILY.AUTOMATION,
    description: () => $t("perk_104_description"),
    automatorPoints: 5,
    shortDescription: () => $t("perk_104_short_description"),
    layoutPosList: [44631, 79398, 80598, 81001, 77797, 57325],
  },
  ttFree: {
    id: 105,
    family: PERK_FAMILY.AUTOMATION,
    description() {
      return $t("perk_105_description");
    },
    layoutPosList: [33840, 78998, 80597, 81002, 77800, 67309],
  },
  ttBuyMax: {
    id: 106,
    family: PERK_FAMILY.AUTOMATION,
    description() {
      return $t("perk_106_description");
    },
    automatorPoints: 10,
    shortDescription: () => $t("perk_106_short_description"),
    layoutPosList: [25055, 78598, 80997, 81003, 77803, 65739],
  },
  dilationAutobuyerBulk: {
    id: 107,
    family: PERK_FAMILY.AUTOMATION,
    description() {
      return $t("perk_107_description");
    },
    effect: 3,
    automatorPoints: 5,
    shortDescription: () => $t("perk_107_short_description"),
    layoutPosList: [127384, 81400, 79803, 79399, 81000, 103048],
  },
  achievementGroup1: {
    id: 201,
    family: PERK_FAMILY.ACHIEVEMENT,
    description() {
      return $t("perk_201_description", formatInt(20), formatInt(10));
    },
    effect: 10,
    automatorPoints: 5,
    shortDescription: () => $t("perk_201_short_description", formatInt(20)),
    layoutPosList: [65386, 80201, 80601, 79801, 79791, 81371],
  },
  achievementGroup2: {
    id: 202,
    family: PERK_FAMILY.ACHIEVEMENT,
    description() {
      return $t("perk_202_description", formatInt(12), formatInt(8));
    },
    effect: 8,
    layoutPosList: [54976, 80202, 80602, 79401, 79794, 93780],
  },
  achievementGroup3: {
    id: 203,
    family: PERK_FAMILY.ACHIEVEMENT,
    description() {
      return $t("perk_203_description", formatInt(6), formatInt(6));
    },
    effect: 6,
    layoutPosList: [44168, 80602, 80603, 79402, 79797, 83005],
  },
  achievementGroup4: {
    id: 204,
    family: PERK_FAMILY.ACHIEVEMENT,
    description() {
      return $t("perk_204_description", formatInt(2), formatInt(4));
    },
    effect: 4,
    layoutPosList: [33760, 81002, 81003, 79403, 79800, 95422],
  },
  achievementGroup5: {
    id: 205,
    family: PERK_FAMILY.ACHIEVEMENT,
    description() {
      return $t("perk_205_description", formatInt(13));
    },
    automatorPoints: 10,
    shortDescription: () => $t("perk_205_short_description"),
    layoutPosList: [23353, 81402, 81403, 79404, 79803, 84639],
  }
};

export const perkConnections = (function() {
  const p = perks;
  // First item is the start, other items are the ends
  const groups = [
    [p.firstPerk, p.achievementGroup1, p.startAM, p.autounlockEU1, p.bypassEC5Lock],
    [p.startAM, p.antimatterNoReset, p.startIP1],
    [p.antimatterNoReset, p.startEP1],
    [p.startIP1, p.startIP2, p.startEP1, p.autobuyerFasterID],
    [p.startIP2, p.bypassIDAntimatter, p.autobuyerFasterReplicanti],
    [p.startEP1, p.startEP2, p.startTP],
    [p.startEP2, p.startEP3],
    [p.startTP, p.startEP1, p.retroactiveTP1],
    [p.autounlockEU1, p.autounlockEU2],
    [p.autounlockEU2, p.autounlockEU1, p.autobuyerDilation],
    [p.autounlockDilation1, p.autounlockDilation2],
    [p.autounlockDilation2, p.autounlockDilation3],
    [p.autounlockDilation3, p.autobuyerFasterDilation, p.autounlockTD],
    [p.autounlockTD, p.autounlockReality],
    [p.bypassTGReset, p.autobuyerDilation, p.retroactiveTP1],
    [p.bypassEC1Lock, p.bypassEC2Lock, p.bypassEC3Lock, p.studyECRequirement],
    [p.bypassEC2Lock, p.studyActiveEP, p.bypassEC1Lock],
    [p.bypassEC3Lock, p.studyIdleEP, p.bypassEC1Lock],
    [p.bypassEC5Lock, p.studyActiveEP, p.studyIdleEP, p.studyPassive],
    [p.studyPassive, p.bypassEC1Lock],
    [p.autocompleteEC1, p.autocompleteEC2],
    [p.autocompleteEC2, p.autocompleteEC3],
    [p.studyActiveEP, p.bypassEC2Lock, p.ttBuySingle],
    [p.studyIdleEP, p.bypassEC3Lock, p.autocompleteEC1],
    [p.studyECRequirement, p.studyECBulk],
    [p.retroactiveTP1, p.bypassTGReset, p.startTP, p.retroactiveTP2],
    [p.retroactiveTP2, p.retroactiveTP3],
    [p.retroactiveTP3, p.retroactiveTP4],
    [p.autobuyerDilation, p.autounlockEU2, p.autounlockDilation1,
      p.bypassECDilation, p.bypassTGReset, p.dilationAutobuyerBulk],
    [p.autobuyerFasterID],
    [p.ttBuySingle, p.ttFree],
    [p.ttFree, p.ttBuyMax],
    [p.achievementGroup1, p.achievementGroup2],
    [p.achievementGroup2, p.achievementGroup3],
    [p.achievementGroup3, p.achievementGroup4],
    [p.achievementGroup4, p.achievementGroup5],
  ];
  const connections = {};
  for (const perk of Object.values(perks)) {
    const connectedPerks = [];
    const directConnections = groups.find(g => g[0] === perk);
    if (directConnections !== undefined) {
      connectedPerks.push(...directConnections.slice(1));
    }
    const indirectConnections = groups
      .filter(g => g.slice(1).some(groupPerk => groupPerk === perk))
      .map(g => g[0]);
    connectedPerks.push(...indirectConnections);
    connections[perk.id] = [...new Set(connectedPerks.map(connectedPerk => connectedPerk.id))];
  }
  return connections;
}());
