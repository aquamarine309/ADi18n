export default {
  name: "RealityAmplifyButton",
  data: () => ({
    isDoomed: false,
    isVisible: false,
    isDisabled: false,
    isActive: false,
    ratio: 1,
    canAmplify: false,
  }),
  computed: {
    tooltip() {
      if (this.isDoomed) return $t("pelle_cannot_amplify");
      if (this.isDisabled) return "You cannot amplify Celestial Realities";
      if (!this.canAmplify) {
        return $t("cannot_amplify");
      }
      return null;
    },
    buttonClass() {
      return {
        "l-reality-amplify-button": true,
        "l-reality-amplify-button--clickable": !this.isDoomed && this.canAmplify,
        "o-nameless-mechanic-button--storing-time": this.isActive,
      };
    },
    ratioText() {
      return `×${formatInt(this.ratio)}`;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.isVisible = Nameless.isUnlocked;
      this.isDisabled = isInCelestialReality();
      this.isActive = Nameless.boostReality;
      this.ratio = Nameless.realityBoostRatio;
      this.canAmplify = Nameless.canAmplify;
    },
    toggleActive() {
      if (!this.canAmplify) return;
      Nameless.boostReality = !Nameless.boostReality;
    }
  },
  template: `
  <button
    v-if="isVisible"
    :class="buttonClass"
    :ach-tooltip="tooltip"
    @click="toggleActive"
  >
    <div v-if="isDoomed">
      {{ $t("pelle_cannot_amplify") }}
    </div>
    <div v-else-if="canAmplify">
      <span v-if="isActive">{{ $t("will_be_amplified") }}</span>
      <span v-else>{{ $t("amplify_reality") }}</span>
      <br>
      {{ $t("all_reward_X", ratioText) }}
    </div>
    <div v-else>
      {{ $t("cannot_amplify") }}
    </div>
  </button>
  `
};