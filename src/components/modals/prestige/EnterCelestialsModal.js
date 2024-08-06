import EnterCelestialsRaPet from "./EnterCelestialsRaPet.js";
import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "EnterCelestialsModal",
  components: {
    ModalWrapperChoice,
    EnterCelestialsRaPet,
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      laitelaFastest: 3600,
      teresaBestAM: new Decimal(),
      teresaRunMult: 0,
      effarigDone: false,
      effarigLayer: "",
      namelessDone: false,
      laitelaTime: "",
    };
  },
  computed: {
    effects() {
      return GameDatabase.celestials.descriptions[this.number].effects();
    },
    description() {
      const description = GameDatabase.celestials.descriptions[this.number].description;
      return description ? description() : "";
    },
    topLabel() {
      return this.name;
    },
    message() {
      return $t("celestial_reality_enter_description", this.name);
    },
    extraLine() {
      switch (this.number) {
        case 0:
          return this.teresaBestAM.eq(1)
            ? $t("teresa_extra_line")
            : $t("teresa_extra_line_b", format(this.teresaBestAM, 2, 2), formatX(this.teresaRunMult, 2));
        case 1: return this.effarigDone
          ? $t("effarig_extra_line")
          : $t("effarig_extra_line_b", this.effarigLayer);
        case 2: return this.namelessDone
          ? $t("nameless_extra_line")
          : $t("nameless_extra_line_b");
        case 3: return "";
        case 4: return $t("ra_extra_line");
        case 5: return this.laitelaFastest >= 300
          ? $t("laitela_extra_line")
          :  $t("laitela_extra_line_b", this.laitelaTime);
        case 6: return "";
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    }
  },
  methods: {
    update() {
      this.teresaBestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.teresaRunMult = Teresa.runRewardMultiplier;
      const effarigStage = Effarig.currentStage;
      this.effarigDone = effarigStage === EFFARIG_STAGES.COMPLETED;
      this.effarigLayer = [null, $t("effarig_unlock_4_label"), $t("effarig_unlock_5_label"), $t("effarig_unlock_6_label")][effarigStage];
      this.namelessDone = Nameless.isCompleted;
      this.laitelaFastest = player.celestials.laitela.fastestCompletion;
      this.laitelaTime = TimeSpan.fromSeconds(this.laitelaFastest).toStringShort();
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      switch (this.number) {
        case 0: return Teresa.initializeRun();
        case 1: return Effarig.initializeRun();
        case 2: return Nameless.initializeRun();
        case 3: return V.initializeRun();
        case 4: return Ra.initializeRun();
        case 5: return Laitela.initializeRun();
        case 6: throw new Error(`Attempted to start Pelle through EnterCelestialsModal instead of ArmageddonModal`);
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    },
  },
  template: `
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ topLabel }}
    </template>
    <div
      class="c-modal-message__text"
      data-v-enter-celestials-modal
    >
      {{ message }}
      <br>
      <br>
      <div
        class="c-modal-celestial__run-effects"
        data-v-enter-celestials-modal
      >
        <div
          v-for="(effect, i) in effects"
          :key="i"
          class="c-modal-celestial__run-effects__line"
          data-v-enter-celestials-modal
        >
          <b v-if="effect.trim()">&bull;</b>
          <b>&nbsp;</b>
          {{ effect }}
        </div>
      </div>
      <div
        v-if="description"
        class="reality-description"
        data-v-enter-celestials-modal
      >
        <br><br>
        {{ description }}
      </div>
      <br><br>
      <div>
        {{ extraLine }}
      </div>
      <span v-if="number === 4">
        <EnterCelestialsRaPet
          v-for="id in 4"
          :key="id"
          :pet-id="id - 1"
        />
      </span>
    </div>
    <template #confirm-text>
      {{ $t("begin") }}
    </template>
  </ModalWrapperChoice>
  `
};