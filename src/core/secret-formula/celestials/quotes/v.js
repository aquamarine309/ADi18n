export const vQuotes = {
  initial: {
    id: 0,
    lines: () => [
      $t("v_quotes_initial")
    ],
  },
  unlock: {
    id: 1,
    lines: () => $t_split("v_quotes_unlock")
  },
  realityEnter: {
    id: 2,
    lines: () => $t_split("v_quotes_reality_enter")
  },
  realityComplete: {
    id: 3,
    lines: () => $t_split("v_quotes_reality_complete")
  },
  achievement1: {
    id: 4,
    requirement: () => V.spaceTheorems >= 1,
    lines: () => $t_split("v_quotes_achievement1")
  },
  achievement6: {
    id: 5,
    requirement: () => V.spaceTheorems >= 6,
    lines: () => $t_split("v_quotes_achievement6")
  },
  hex1: {
    id: 6,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 1,
    lines: () => $t_split("v_quotes_hex1")
  },
  achievement12: {
    id: 7,
    requirement: () => V.spaceTheorems >= 12,
    lines: () => $t_split("v_quotes_achievement12")
  },
  achievement24: {
    id: 8,
    requirement: () => V.spaceTheorems >= 24,
    lines: () => $t_split("v_quotes_achievement24")
  },
  hex3: {
    id: 9,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 3,
    lines: () => $t_split("v_quotes_hex3")
  },
  allAchievements: {
    id: 10,
    requirement: () => V.spaceTheorems >= 36,
    lines: () => $t_split("v_quotes_all_achievements")
  }
};
