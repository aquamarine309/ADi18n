import { DC } from "../../constants.js";

export const effarigUnlocks = {
  adjuster: {
    id: 0,
    description: () => $t("effarig_unlock_0_description"),
    cost: 1e7,
    onPurchased: () => {
      Effarig.quotes.unlockWeights.show();
      ui.view.tabs.reality.openGlyphWeights = true;
      Tab.reality.glyphs.show();
    }
  },
  glyphFilter: {
    id: 1,
    cost: 2e8,
    description: () => $t("effarig_unlock_1_description"),
    onPurchased: () => {
      Effarig.quotes.unlockGlyphFilter.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.FILTER_SETTINGS;
    }
  },
  setSaves: {
    id: 2,
    description: () => $t("effarig_unlock_2_description"),
    cost: 3e9,
    onPurchased: () => {
      Effarig.quotes.unlockSetSaves.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.SAVED_SETS;
    }
  },
  run: {
    id: 3,
    description: () => $t("effarig_unlock_3_description"),
    cost: 5e11,
    onPurchased: () => {
      Effarig.quotes.unlockRun.show();
    }
  },
  infinity: {
    id: 4,
    label: () => $t("effarig_unlock_4_label"),
    description() {
      return $t("effarig_unlock_4_description", format(DC.E200), format(DC.E50));
    },
  },
  eternity: {
    id: 5,
    label: () => $t("effarig_unlock_5_label"),
    description: () => $t("effarig_unlock_5_description"),
  },
  reality: {
    id: 6,
    label: () => $t("effarig_unlock_6_label"),
    description: () => $t("effarig_unlock_6_description"),
  }
};
