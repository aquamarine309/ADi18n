import EternityButton from "./EternityButton.js";
import UnlockInfinityDimButton from "./UnlockInfinityDimButton.js";

export default {
  name: "HeaderEternityContainer",
  components: {
    EternityButton,
    UnlockInfinityDimButton,
  },
  data() {
    return {
      showContainer: false,
      showEP: false,
      showNextEP: false,
      eternityPoints: new Decimal(0),
      nextEP: new Decimal(0),
    };
  },
  computed: {
    epText() {
      return $p_split("you_have_X_eternity_points", this.eternityPoints, format(this.eternityPoints, 2));
    }
  },
  methods: {
    update() {
      this.showContainer = player.break || PlayerProgress.eternityUnlocked();
      this.showEP = PlayerProgress.eternityUnlocked();
      this.eternityPoints.copyFrom(Currency.eternityPoints.value.floor());
      this.showNextEP = Player.canEternity && player.records.thisReality.maxEP.lt(100) &&
        gainedEternityPoints().lt(100);
      if (this.showNextEP) this.nextEP.copyFrom(requiredIPForEP(gainedEternityPoints().floor().toNumber() + 1));
    },
  },
  template: `
  <div
    v-if="showContainer"
    class="c-prestige-button-container"
  >
    <div
      v-if="showEP"
      class="c-eternity-points"
      data-v-header-eternity-container
    >
      {{ epText[0] }}
      <span class="c-game-header__ep-amount">{{ epText[1] }}</span>
      {{ epText[2] }}
      <span v-if="showNextEP">({{ $t("next_ep_at_X_ip", format(nextEP, 1)) }})</span>
    </div>
    <UnlockInfinityDimButton />
    <EternityButton />
  </div>
  `
};