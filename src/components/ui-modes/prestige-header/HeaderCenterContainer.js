import ArmageddonButton from "../../tabs/celestial-pelle/ArmageddonButton.js";
import RealityCurrencyHeader from "../../RealityCurrencyHeader.js";

import HeaderTickspeedInfo from "../HeaderTickspeedInfo.js";

import RealityButton from "./RealityButton.js";

// This component contains antimatter and antimatter rate at the start of the game, as well as some additional
// information depending on the UI (tickspeed for Classic, game speed for Modern). Everything but antimatter is
// removed once Reality is unlocked, to make room for the reality button
export default {
  name: "HeaderCenterContainer",
  components: {
    HeaderTickspeedInfo,
    RealityCurrencyHeader,
    RealityButton,
    ArmageddonButton,
  },
  data() {
    return {
      shouldDisplay: true,
      isModern: false,
      hasRealityButton: false,
      isDoomed: false,
      antimatter: new Decimal(0),
      antimatterPerSec: new Decimal(0),
    };
  },
  computed: {
    antimatterText() {
      return $p_split(
        "you_have_X_antimatter",
        this.antimatter,
        format(this.antimatter, 2, 1)
      );
    }
  },
  methods: {
    update() {
      this.shouldDisplay = player.break || !Player.canCrunch;
      if (!this.shouldDisplay) return;

      this.isModern = player.options.newUI;
      this.isDoomed = Pelle.isDoomed;
      this.antimatter.copyFrom(Currency.antimatter);
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      if (!this.hasRealityButton) this.antimatterPerSec.copyFrom(Currency.antimatter.productionPerSecond);
    },
  },
  template: `
  <div
    v-if="shouldDisplay"
    class="c-prestige-button-container"
  >
    <span>
      {{ antimatterText[0] }}<span class="c-game-header__antimatter">{{ antimatterText[1] }}</span>{{ antimatterText[2] }}
    </span>
    <div
      v-if="hasRealityButton"
      class="c-reality-container"
      data-v-header-center-container
    >
      <RealityCurrencyHeader />
      <ArmageddonButton
        v-if="isDoomed"
        :is-header="true"
      />
      <RealityButton v-else />
    </div>
    <div v-else>
      {{ $p("you_are_getting_X_antimatter_per_second", antimatterPerSec, format(antimatterPerSec, 2)) }}
      <br>
      <HeaderTickspeedInfo />
    </div>
  </div>
  `
};