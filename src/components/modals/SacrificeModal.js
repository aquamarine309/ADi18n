import ModalWrapperChoice from "./ModalWrapperChoice.js";

export default {
  name: "SacrificeModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      currentMultiplier: new Decimal(),
      nextMultiplier: new Decimal(),
    };
  },
  computed: {
    message() {
      if (Achievement(118).isUnlocked && !Pelle.isDoomed) {
        return `维度献祭将根据你在献祭时拥有的第一反物质维度的数量，为第八反物质维度提供加成。`;
      }
      return `维度献祭将重置第一维度到第七维度（价格和加成不变），但根据献祭的第一反物质维度的总量，为第八反物质维度提供加成。恢复生产需要时间。`;
    },
    multiplierText() {
      return `维度献祭后，加成由原来的 ${formatX(this.currentMultiplier, 2, 2)} 提升到
        ${formatX(this.nextMultiplier, 2, 2)} 。`;
    },
  },
  methods: {
    update() {
      this.currentMultiplier.copyFrom(Sacrifice.totalBoost);
      this.nextMultiplier.copyFrom(Sacrifice.nextBoost.times(Sacrifice.totalBoost));
    },
    handleYesClick() {
      sacrificeReset();
    }
  },
  template: `
  <ModalWrapperChoice
    option="sacrifice"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ $t("htp_sacrifice_title") }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-message__text">
      {{ multiplierText }}
      <br>
    </div>
  </ModalWrapperChoice>
  `
};