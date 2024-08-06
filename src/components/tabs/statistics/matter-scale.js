import { DC } from "../../../core/constants.js";

export const MatterScale = {
  proton: new Decimal("2.82e-45"),

  estimate(matter) {
    if (!matter) return ["There is no antimatter yet."];
    if (matter.gt(DC.E100000)) {
      return $t_split("statistics_scale_base_3", formatInt(3), TimeSpan.fromSeconds(matter.log10() / 3).toString());
    }
    const planck = new Decimal("4.22419e-105");
    const planckedMatter = matter.times(planck);
    if (planckedMatter.gt(this.proton)) {
      const scale = this.macroScale(planckedMatter);
      const amount = format(planckedMatter.dividedBy(scale.scale.amount), 2, 1);
      return [$t(scale.scale.verb === "make" ? "statistics_scale_base_2" : "statistics_scale_base_1", amount, $t_split("statistics_scale_strings")[scale.index])];
    }
    const scale = this.microScale(matter);
    return [$t("statistics_scale_base_0", format(this.proton.div(scale.amount).div(matter), 2, 1), scale.name)];
  },

  microScale(matter) {
    const micro = this.microObjects;
    for (let i = 0; i < micro.length; i++) {
      const scale = micro[i];
      if (matter.times(scale.amount).lt(this.proton)) {
        return { amount: scale.amount, name: $t_split("statistics_scale_strings_2")[i] };
      }
    }
    throw "Cannot determine smallest antimatter scale";
  },

  macroScale(matter) {
    const macro = this.macroObjects;
    const last = macro.last();
    if (matter.gte(last.amount)) return last;
    let low = 0;
    let high = macro.length;
    while (low !== high) {
      const mid = Math.floor((low + high) / 2);
      if (macro[mid].amount.lte(matter)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return { scale: macro[high - 1], index: high - 1 };
  },

  microObjects: [
    { amount: new Decimal("1e-54") },
    { amount: new Decimal("1e-63") },
    { amount: new Decimal("1e-72") },
    { amount: new Decimal("4.22419e-105") }
  ],

  macroObjects: [
    { amount: new Decimal("2.82e-45"), verb: "make" },
    { amount: new Decimal("1e-42"), verb: "make" },
    { amount: new Decimal("7.23e-30"), verb: "make" },
    { amount: new Decimal("5e-21"), verb: "make" },
    { amount: new Decimal("9e-17"), verb: "make" },
    { amount: new Decimal("6.2e-11"), verb: "make" },
    { amount: new Decimal("5e-8"), verb: "make" },
    { amount: new Decimal("3.555e-6"), verb: "fill" },
    { amount: new Decimal("7.5e-4"), verb: "fill" },
    { amount: DC.D1, verb: "fill" },
    { amount: new Decimal("2.5e3"), verb: "fill" },
    { amount: new Decimal("2.6006e6"), verb: "make" },
    { amount: new Decimal("3.3e8"), verb: "make" },
    { amount: new Decimal("5e12"), verb: "make" },
    { amount: new Decimal("4.5e17"), verb: "make" },
    { amount: new Decimal("1.08e21"), verb: "make" },
    { amount: new Decimal("1.53e24"), verb: "make" },
    { amount: new Decimal("1.41e27"), verb: "make" },
    { amount: new Decimal("5e32"), verb: "make" },
    { amount: new Decimal("8e36"), verb: "make" },
    { amount: new Decimal("1.7e45"), verb: "make" },
    { amount: new Decimal("1.7e48"), verb: "make" },
    { amount: new Decimal("3.3e55"), verb: "make" },
    { amount: new Decimal("3.3e61"), verb: "make" },
    { amount: new Decimal("5e68"), verb: "make" },
    { amount: new Decimal("1e73"), verb: "make" },
    { amount: new Decimal("3.4e80"), verb: "make" },
    { amount: new Decimal("1e113"), verb: "make" },
    { amount: DC.C2P1024, verb: "make" },
    { amount: new Decimal("1e65000"), verb: "make" }
  ]
};
