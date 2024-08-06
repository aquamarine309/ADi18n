export const laitelaQuotes = {
  unlock: {
    id: 0,
    lines: () => $t_split("laitela_quotes_unlock")
  },
  // Note: This can be done immediately after unlocking Lai'tela
  firstDestabilize: {
    id: 1,
    requirement: () => player.celestials.laitela.difficultyTier >= 1,
    lines: () => $t_split("laitela_quotes_first_destabilize")
  },
  // Note: This happens about an hour or two before singularities
  secondDestabilize: {
    id: 2,
    requirement: () => player.celestials.laitela.difficultyTier >= 2,
    lines: () => $t_split("laitela_quotes_second_destabilize")
  },
  firstSingularity: {
    id: 3,
    requirement: () => Currency.singularities.gte(1),
    lines: () => $t_split("laitela_quotes_first_singularity")
  },
  // Note: Shown when unlocking DMD3; requirement is auto-condensing 20 singularities and it happens around ~200 total
  thirdDMD: {
    id: 5,
    lines: () => $t_split("laitela_quotes_third_dmd")
  },
  // Note: This happens around e10-e11 singularities
  annihilation: {
    id: 4,
    lines: () => $t_split("laitela_quotes_annihilation")
  },
  // Note: This happens near e18 singularities
  halfDimensions: {
    id: 6,
    requirement: () => player.celestials.laitela.difficultyTier >= 4,
    lines: () => $t_split("laitela_quotes_half_dimensions")
  },
  // Note: Shown when the first row 5 iM upgrade is purchased (~e26 singularities)
  finalRowIM: {
    id: 7,
    lines: () => $t_split("laitela_quotes_final_row_im")
  },
  // Note: This is around when all infinite milestones hit increased scaling
  increasedMilestoneScaling: {
    id: 8,
    requirement: () => Currency.singularities.gte(1e40),
    lines: () => $t_split("laitela_quotes_increased_milestone_scaling")
  },
  fullDestabilize: {
    id: 9,
    requirement: () => player.celestials.laitela.difficultyTier >= 8,
    lines: () => $t_split("laitela_quotes_full_destabilize")
  },
};
