export default {
  name: "BlackHoleStateRow",
  props: {
    blackHole: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isPermanent: false,
      isActive: false,
      isCharged: false,
      nextChange: "",
      state: "",
    };
  },
  computed: {
    description() {
      return this.blackHole.description(true);
    },
    id() {
      return this.blackHole.id;
    }
  },
  methods: {
    update() {
      const { blackHole } = this;
      this.isUnlocked = blackHole.isUnlocked;
      if (!this.isUnlocked) return;
      this.isPermanent = blackHole.isPermanent;
      this.isActive = blackHole.isActive;
      this.isCharged = blackHole.isCharged;
      this.nextChange = TimeSpan.fromSeconds(blackHole.timeWithPreviousActiveToNextStateChange).toStringShort();
      this.state = blackHole.displayState;
    }
  },
  template: `
  <h3 v-if="isUnlocked">
    {{ $t("X_state", description) }}
    <template v-if="isPermanent">
      Permanently Active
    </template>
    <template v-else-if="isActive">
      {{ $t("active_X_remaining", nextChange) }}
    </template>
    <template v-else-if="id === 2 && isCharged">
      Charged (Activates with Black Hole 1, {{ nextChange }} remaining)
    </template>
    <template v-else>
      Inactive (Activation in {{ nextChange }})
    </template>
  </h3>
  `
};