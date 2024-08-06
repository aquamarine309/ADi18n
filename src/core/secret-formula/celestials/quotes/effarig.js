export const effarigQuotes = {
  initial: {
    id: 0,
    lines: () => $t_split("effarig_quotes_initial")
  },
  unlockWeights: {
    id: 1,
    lines: () => [
      $t("effarig_quotes_unlock_weights")
    ]
  },
  unlockGlyphFilter: {
    id: 2,
    lines: () => [
      $t("effarig_quotes_unlock_glyph_filter")
    ]
  },
  unlockSetSaves: {
    id: 3,
    lines: () => [
      $t("effarig_quotes_unlock_set_saves")
    ]
  },
  unlockRun: {
    id: 4,
    lines: () => $t_split("effarig_quotes_unlock_run")
  },
  completeInfinity: {
    id: 5,
    lines: () => {
      const texts = $t_split("effarig_quotes_complete_infinity");
      return [
        { text: texts[0], showCelestialName: false },
        texts[1],
        texts[2],
      ]
    }
  },
  completeEternity: {
    id: 6,
    lines: () => {
      const texts = $t_split("effarig_quotes_complete_eternity");
      return [
        { text: texts[0], showCelestialName: false },
        texts[1],
        texts[2],
        texts[3],
      ]
    }
  },
  completeReality: {
    id: 7,
    lines: () => {
      const texts = $t_split("effarig_quotes_complete_reality");
      return [
        { text: texts[0], showCelestialName: false },
        texts[1],
        texts[2],
        texts[3],
        texts[4]
      ]
    }
  }
};
