import DescriptionDisplay from "../../DescriptionDisplay.js";
import TimeStudyButton from "./TimeStudyButton.js";

export default {
  name: "DilationTimeStudy",
  components: {
    DescriptionDisplay,
    TimeStudyButton
  },
  props: {
    setup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showRequirement: false,
      maxTT: new Decimal(),
      currTT: new Decimal(),
      ttGen: new Decimal(),
    };
  },
  computed: {
    study() {
      return this.setup.study;
    },
    id() {
      return this.study.id;
    },
    requirement() {
      if (this.id === 1) {
        return $t("dilationstudy_1_requirement", formatInt(5), formatInt(this.maxTT), formatInt(TimeStudy.dilation.totalTimeTheoremRequirement));
      }
      if (this.id === 6) {
        if (Perk.firstPerk.isBought) {
          return $t("dilationstudy_6_requirement_b", format("1e4000"));
        } else {
          return $t("dilationstudy_6_requirement", format("1e4000"), formatInt(13));
        }
      }
      return "";
    },
    theoremTimeEstimate() {
      if (this.study.isBought || !this.study.cost || this.ttGen.eq(0)) return null;
      const time = Decimal.sub(this.study.cost, this.currTT).dividedBy(this.ttGen);
      return time.gt(0) ? `Enough TT in ${TimeSpan.fromSeconds(time.toNumber()).toStringShort()}` : null;
    }
  },
  methods: {
    update() {
      if (this.id === 1) {
        this.maxTT.copyFrom(Currency.timeTheorems.max);
        this.showRequirement = !this.study.isBought && !Perk.bypassECDilation.canBeApplied;
      }
      if (this.id === 6) {
        this.showRequirement = !Pelle.isDoomed;
      }
      this.currTT.copyFrom(Currency.timeTheorems.value);
      this.ttGen.copyFrom(getTTPerSecond().times(getGameSpeedupFactor()));
    },
    clickHandler() {
      switch (this.id) {
        case 1:
          return () => Tab.eternity.dilation.show();
        case 2:
        case 3:
        case 4:
        case 5:
          return () => Tab.dimensions.time.show();
        case 6:
          return () => Tab.reality.glyphs.show();
        default:
          throw new Error("Unrecognized Dilation study was clicked");
      }
    }
  },
  template: `
  <TimeStudyButton
    :setup="setup"
    :ach-tooltip="theoremTimeEstimate"
    :special-click="clickHandler()"
  >
    <DescriptionDisplay :config="study.config" />
    <template v-if="showRequirement">
      <br>
      <span>{{ requirement }}</span>
    </template>
  </TimeStudyButton>
  `
};