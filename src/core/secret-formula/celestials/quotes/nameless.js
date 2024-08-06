export const namelessQuotes = {
  initial: {
    id: 0,
    lines: () => $t_split("nameless_quotes_initial")
  },
  unlockRun: {
    id: 1,
    lines: () => $t_split("nameless_quotes_unlock_run")
  },
  startRun: {
    id: 2,
    lines: () => $t_split("nameless_quotes_start_run")
  },
  hintUnlock: {
    id: 3,
    lines: () => {
      const texts = $t_split("nameless_quotes_hint_unlock");
      return [
        texts[0],
        texts[1],
        { text: texts[2], showCelestialName: false }
      ]
    }
  },
  ec6C10: {
    id: 4,
    lines: () => [
      $t("nameless_quotes_ec6_c10")
    ]
  },
  completeReality: {
    id: 5,
    lines: () => $t_split("nameless_quotes_complete_reality")
  },
};
