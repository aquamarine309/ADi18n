import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "ArmageddonModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isDoomed: false,
      remnantsGain: 0,
      realityShardGain: new Decimal(0),
      nextRealityShardGain: new Decimal(0),
      canArmageddon: false,
    };
  },
  computed: {
    topLabel() {
      if (!this.isDoomed) return $t("doom_title");
      return `You are about to perform an Armageddon reset`;
    },
    message() {
      const isFirstReset = (Currency.remnants.eq(0))
        ? `which will produce ${format(this.nextRealityShardGain, 2, 2)} Reality Shards/s`
        : `which will increase your Reality Shards gain from ${format(this.realityShardGain, 2, 2)}/s
          to ${format(this.nextRealityShardGain, 2, 2)}/s`;

      return `Armageddon will start a new Doomed Reality. You will gain
      ${quantify("Remnant", this.remnantsGain, 2, 0)} ${isFirstReset}`;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.remnantsGain = Pelle.remnantsGain;
      this.realityShardGain.copyFrom(Pelle.realityShardGainPerSecond);
      this.nextRealityShardGain.copyFrom(Pelle.nextRealityShardGain);
      this.canArmageddon = Pelle.canArmageddon;
    },
    handleYesClick() {
      Pelle.initializeRun();
    },
  },
  template: `
  <ModalWrapperChoice
    :option="isDoomed ? 'armageddon' : undefined"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div
      v-if="!isDoomed"
      class="c-modal-message__text"
    >
      {{ $t("doom_info") }}
      <br>
      <br>
      Are you sure you want to do this?
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      {{ message }}
    </div>
  </ModalWrapperChoice>
  `
};