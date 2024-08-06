export default {
  name: "DilationButton",
  data() {
    return {
      isUnlocked: false,
      isRunning: false,
      hasGain: false,
      requiredForGain: new Decimal(),
      canEternity: false,
      eternityGoal: new Decimal(),
      tachyonGain: new Decimal(),
      remnantRequirement: 0,
      showRequirement: false,
      creditsClosed: false
    };
  },
  computed: {
    disableText() {
      // Doesn't need to be reactive or check strike status; it's always permanent once entered in Doomed
      return Pelle.isDoomed ? $t("dilation_is_permanent") : $t("disable_dilation");
    }
  },
  methods: {
    update() {
      this.isUnlocked = PlayerProgress.dilationUnlocked();
      this.isRunning = player.dilation.active;
      this.remnantRequirement = Pelle.remnantRequirementForDilation;
      this.showRequirement = Pelle.isDoomed && !Pelle.canDilateInPelle;
      if (!this.isRunning) return;
      this.canEternity = Player.canEternity;
      // This lets this.hasGain be true even before eternity.
      this.hasGain = getTachyonGain(false).gt(0);
      if (this.canEternity && this.hasGain) {
        this.tachyonGain.copyFrom(getTachyonGain(true));
      } else if (this.hasGain) {
        this.eternityGoal.copyFrom(Player.eternityGoal);
      } else {
        this.requiredForGain.copyFrom(getTachyonReq());
      }
      this.creditsClosed = GameEnd.creditsEverClosed;
    },
    dilate() {
      if (this.creditsClosed) return;
      startDilatedEternityRequest();
    }
  },
  template: `
  <button
    class="o-dilation-btn"
    :class="isUnlocked ? 'o-dilation-btn--unlocked' : 'o-dilation-btn--locked'"
    @click="dilate()"
  >
    <span v-if="!isUnlocked">{{ $t("purchase_dilation_study_to_unlock") }}</span>
    <span v-else-if="!isRunning">
      {{ $t("dilate_time") }}
      <div v-if="showRequirement">
        {{ $t("requires_X_remnants", format(remnantRequirement, 2)) }}
      </div>
    </span>
    <span v-else-if="canEternity && hasGain">
      {{ disableText }}
      <br>
      {{ $p("gain_X_tachyon_particles_eternity_button", tachyonGain, format(tachyonGain, 2, 1)) }}.
    </span>
    <span v-else-if="hasGain">
      {{ disableText }}
      <br>
      {{ $t("dilation_requirement_1", format(eternityGoal, 1, 0)) }}
    </span>
    <span v-else>
      {{ disableText }}
      <br>
      {{ $t("dilation_requirement_2", format(requiredForGain, 2, 1)) }}
    </span>
  </button>
  `
};