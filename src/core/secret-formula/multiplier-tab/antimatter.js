import { MultiplierTabIcons } from "./icons.js";

// See index.js for documentation
export const AM = {
  total: {
    name: () => $t("multiplier_breakdown_antimatter"),
    displayOverride: () => $t(
      "multiplier_breakdown_antimatter_effect",
      format(Currency.antimatter.productionPerSecond, 2, 2)
    ),
    multValue: () => new Decimal(Currency.antimatter.productionPerSecond).clampMin(1),
    isActive: true,
    overlay: ["<i class='fas fa-atom' />"],
  },
  effarigAM: {
    name: () => $t("multiplier_breakdown_effarig_antimatter"),
    powValue: () => {
      const ad1 = AntimatterDimension(1);
      const baseProd = ad1.totalAmount.times(ad1.multiplier).times(Tickspeed.perSecond);
      return Math.pow(baseProd.log10(), getAdjustedGlyphEffect("effarigantimatter") - 1);
    },
    isActive: () => getAdjustedGlyphEffect("effarigantimatter") > 1 && AntimatterDimension(1).isProducing,
    icon: MultiplierTabIcons.SPECIFIC_GLYPH("effarig"),
  }
};
