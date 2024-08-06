export const nameless = {
  // These entries will be unlocked in no particular order
  progress: {
    hintsUnlocked: {
      id: 0,
      hint: () => $t("nameless_progress_hint_0_info"),
      condition: () => $t("nameless_progress_hint_0_condition", formatInt(5), formatPercents(0.4)),
    },
    ec1: {
      id: 1,
      hint: () => $t("nameless_progress_hint_1_info"),
      condition: () => $t("nameless_progress_hint_1_condition", formatInt(5)),
    },
    feelEternity: {
      id: 2,
      hint: () => $t("nameless_progress_hint_2_info"),
      condition: () => $t("nameless_progress_hint_2_condition"),
    },
    ec6: {
      id: 3,
      hint: () => $t("nameless_progress_hint_3_info"),
      condition: () => $t("nameless_progress_hint_3_condition", formatInt(5)),
    },
    c10: {
      id: 4,
      hint: () => $t("nameless_progress_hint_4_info"),
      condition: () => $t("nameless_progress_hint_4_condition"),
    },
    secretStudy: {
      id: 5,
      hint: () => $t("nameless_progress_hint_5_info"),
      condition: () => $t("nameless_progress_hint_5_condition", formatInt(100)),
    },
    storedTime: {
      id: 6,
      hint: () => $t("nameless_progress_hint_6_info"),
      condition: () => $t("nameless_progress_hint_6_condition"),
    },
    challengeCombo: {
      id: 7,
      hint: () => $t("nameless_progress_hint_7_info"),
      condition: () => $t("nameless_progress_hint_7_condition"),
    },
  },
  // These get unlocked sequentially
  glyphHints: [
    () => $t("nameless_glyph_hint_1_info"),
    () => $t("nameless_glyph_hint_2_info"),
    () => $t("nameless_glyph_hint_3_info")
  ]
};
