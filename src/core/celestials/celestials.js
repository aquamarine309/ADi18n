import { Effarig } from "./effarig.js";
import { Nameless } from "./nameless.js";
import { Laitela } from "./laitela/laitela.js";
import { Pelle } from "./pelle/pelle.js";
import { Ra } from "./ra/ra.js";
import { Teresa } from "./teresa.js";
import { V } from "./V.js";

export const Celestials = {
  teresa: Teresa,
  effarig: Effarig,
  nameless: Nameless,
  v: V,
  ra: Ra,
  laitela: Laitela,
  pelle: Pelle
};

GameDatabase.celestials.descriptions = [
  {
    name: "Teresa",
    effects() {
      return $t_split("teresa_limitations", format(0.55, 2, 2));
    },
  },
  {
    name: "Effarig",
    effects() {
      return $t_split("effarig_limitations", formatInt(Effarig.glyphLevelCap));
    },
    description() {
      return $t("effarig_description");
    }
  },
  {
    name: "The Nameless Ones",
    effects() {
      return $t_split("nameless_limitations", formatInt(5000), formatInt(1), format(0.55, 2, 2));
    }
  },
  {
    name: "V",
    effects() {
      const vEffect = $t_split("v_limitations");

      return Ra.unlocks.unlockGlyphAlchemy.canBeApplied
        ? vEffect
        : vEffect.slice(0, -1);
    }
  },
  {
    name: "Ra",
    effects() {
      return $t_split("ra_limitations", formatInt(4), formatX(1.1245, 0, 3));
    },
  },
  {
    name: "Lai'tela",
    effects() {
      const highestActive = 8 - Laitela.difficultyTier;
      let disabledDims = $t_split("laitela_disabled_dims")[highestActive];

      const info = $t_split("laitela_limitations", [formatInt(1), formatInt(10)], disabledDims);
      if (highestActive === 8) {
        return info.slice(0, -1);
      } else {
        return info;
      }
    },
    description() {
      return $t("laitela_reality_info", formatPercents(1), formatPercents(1), formatInt(30), formatInt(8), formatX(8));
    }
  },
];
