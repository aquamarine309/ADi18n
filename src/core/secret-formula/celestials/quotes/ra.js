export const raQuotes = {
  unlock: {
    id: 0,
    lines: () => $t_split("ra_quotes_unlock")
  },
  realityEnter: {
    id: 1,
    lines: () => $t_split("ra_quotes_reality_enter")
  },
  teresaStart: {
    id: 2,
    requirement: () => Ra.pets.teresa.level >= 2,
    lines: () => $t_split("ra_quotes_teresa_start")
  },
  teresaLate: {
    id: 3,
    requirement: () => Ra.pets.teresa.level >= 15,
    lines: () => $t_split("ra_quotes_teresa_late")
  },
  effarigStart: {
    id: 4,
    requirement: () => Ra.pets.effarig.level >= 2,
    lines: () => $t_split("ra_quotes_effarig_start")
  },
  effarigLate: {
    id: 5,
    requirement: () => Ra.pets.effarig.level >= 15,
    lines: () => $t_split("ra_quotes_effarig_late")
  },
  namelessStart: {
    id: 6,
    requirement: () => Ra.pets.nameless.level >= 2,
    lines: () => [
      $t("ra_quotes_nameless_start")
    ]
  },
  namelessLate: {
    id: 7,
    requirement: () => Ra.pets.nameless.level >= 15,
    lines: () => $t_split("ra_quotes_nameless_late")
  },
  vStart: {
    id: 8,
    requirement: () => Ra.pets.v.level >= 2,
    lines: () => $t_split("ra_quotes_v_start")
  },
  vLate: {
    id: 9,
    requirement: () => Ra.pets.v.level >= 15,
    lines: () => $t_split("ra_quotes_v_late")
  },
  remembrance: {
    id: 10,
    requirement: () => Ra.remembrance.isUnlocked,
    lines: () => $t_split("ra_quotes_remembrance")
  },
  midMemories: {
    id: 11,
    requirement: () => Ra.totalPetLevel >= 50,
    lines: () => $t_split("ra_quotes_mid_memories")
  },
  lateMemories: {
    id: 12,
    requirement: () => Ra.totalPetLevel >= 80,
    lines: () => $t_split("ra_quotes_late_memories")
  },
  maxLevels: {
    id: 13,
    requirement: () => Ra.totalPetLevel === Ra.maxTotalPetLevel,
    lines: () => $t_split("ra_quotes_max_levels")
  },
};
