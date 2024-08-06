import AutobuyerToggles from "./AutobuyerToggles.js";
import BigCrunchAutobuyerBox from "./BigCrunchAutobuyerBox.js";
import DimensionAutobuyerBox from "./DimensionAutobuyerBox.js";
import DimensionBoostAutobuyerBox from "./DimensionBoostAutobuyerBox.js";
import EternityAutobuyerBox from "./EternityAutobuyerBox.js";
import GalaxyAutobuyerBox from "./GalaxyAutobuyerBox.js";
import OpenModalHotkeysButton from "../../OpenModalHotkeysButton.js";
import RealityAutobuyerBox from "./RealityAutobuyerBox.js";
import SimpleAutobuyersMultiBox from "./SimpleAutobuyersMultiBox.js";
import TickspeedAutobuyerBox from "./TickspeedAutobuyerBox.js";

export default {
  name: "AutobuyersTab",
  components: {
    AutobuyerToggles,
    OpenModalHotkeysButton,
    RealityAutobuyerBox,
    EternityAutobuyerBox,
    BigCrunchAutobuyerBox,
    GalaxyAutobuyerBox,
    DimensionBoostAutobuyerBox,
    TickspeedAutobuyerBox,
    DimensionAutobuyerBox,
    SimpleAutobuyersMultiBox
  },
  data() {
    return {
      hasInfinity: false,
      hasContinuum: false,
      displayADAutobuyersIndividually: false,
      hasInstant: false,
    };
  },
  computed: {
    // It only makes sense to show this if the player has seen gamespeed-altering effects, but we should keep it there
    // permanently as soon as they have
    hasSeenGamespeedAlteringEffects() {
      return PlayerProgress.seenAlteredSpeed();
    },
    gameTickLength() {
      return `${formatInt(player.options.updateRate)} ms`;
    }
  },
  methods: {
    update() {
      this.hasInfinity = PlayerProgress.infinityUnlocked();
      this.hasContinuum = Laitela.continuumActive;
      this.checkADAutoStatus();
    },
    checkADAutoStatus() {
      const ad = Autobuyer.antimatterDimension;
      // Since you don't need to buy autobuyers in Doomed and unbought ones are hidden, we can check if only the
      // autobuyers you can see (ie, have unlocked) have been maxed.
      if (Pelle.isDoomed) {
        this.displayADAutobuyersIndividually = !ad.zeroIndexed.filter(x => x.isUnlocked)
          .every(x => x.hasUnlimitedBulk && x.hasMaxedInterval);
        return;
      }
      this.hasInstant = ad.hasInstant;
      this.displayADAutobuyersIndividually = !ad.collapseDisplay;
    },
  },
  template: `
  <div class="l-autobuyers-tab">
    <AutobuyerToggles />
    <OpenModalHotkeysButton />
    <div v-if="hasSeenGamespeedAlteringEffects">
      自动购买器的间隔和基于时间的设置都以<b>现实时间</b>为准，因此
      <br>
      不受任何可能改变游戏本身运行速度的因素影响。
      <br>
      <br>
    </div>
    <div v-if="!hasInfinity">
      升级自动购买器的挑战将在达到无限后解锁。
    </div>
    <b>一般情况下，不显示批量的自动购买器拥有无限的批量。</b>
    <b>
      提升批量的升级在反物质维度自动购买器的间隔小于或等于 {{ formatInt(100) }} 毫秒时解锁。
    </b>
    <b v-if="hasInstant">显示“{{ $t("instant") }}”的自动购买器在每个游戏间隔就会触发一次 (即 {{ gameTickLength }})。</b>
    <RealityAutobuyerBox
      class="c-reality-pos"
      data-v-autobuyers-tab
    />
    <EternityAutobuyerBox
      class="c-eternity-pos"
      data-v-autobuyers-tab
    />
    <BigCrunchAutobuyerBox
      class="c-infinity-pos"
      data-v-autobuyers-tab
    />
    <GalaxyAutobuyerBox />
    <DimensionBoostAutobuyerBox />
    <TickspeedAutobuyerBox v-if="!hasContinuum" />
    <template v-if="displayADAutobuyersIndividually">
      <DimensionAutobuyerBox
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </template>
    <SimpleAutobuyersMultiBox />
  </div>
  `
};