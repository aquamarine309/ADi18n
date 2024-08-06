import AutobuyerBox from "./AutobuyerBox.js";
import AutobuyerDropdownEntry from "./AutobuyerDropdownEntry.js";
import AutobuyerInput from "./AutobuyerInput.js";
import ExpandingControlBox from "../../ExpandingControlBox.js";

export default {
  name: "RealityAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerInput,
    ExpandingControlBox,
    AutobuyerDropdownEntry
  },
  props: {
    isModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      mode: AUTO_REALITY_MODE.RM,
      levelCap: 0,
      isOverCap: false,
      hasAlternateInputs: false,
    };
  },
  computed: {
    autobuyer: () => Autobuyer.reality,
    hasRelicMode: () => TeresaUnlocks.effarig.canBeApplied,
    modes() {
      const availableModes = [
        AUTO_REALITY_MODE.RM,
        AUTO_REALITY_MODE.GLYPH,
        AUTO_REALITY_MODE.EITHER,
        AUTO_REALITY_MODE.BOTH,
        AUTO_REALITY_MODE.TIME
      ];
      if (this.hasRelicMode) availableModes.push(AUTO_REALITY_MODE.RELIC_SHARD);
      return availableModes;
    },
  },
  methods: {
    update() {
      this.mode = this.autobuyer.mode;
      this.levelCap = Glyphs.levelCap;
      this.isOverCap = this.autobuyer.glyph > this.levelCap;
      // The container only has room for 2 textboxes, so we switch what they go to based on the current mode
      this.hasAlternateInputs = Autobuyer.reality.mode > AUTO_REALITY_MODE.BOTH;
    },
    modeName(mode) {
      return $t_split("reality_autobuyer_modes")[mode];
      throw new Error("Unknown Auto Reality mode");
    },
  },
  template: `
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    :name="$t('automatic_reality')"
  >
    <template #intervalSlot>
      <ExpandingControlBox :auto-close="true">
        <template #header>
          <div class="o-primary-btn c-autobuyer-box__mode-select c-autobuyer-box__mode-select-header">
            ▼ {{ $t("current_setting") }} ▼
            <br>
            {{ modeName(mode) }}
          </div>
        </template>
        <template #dropdown>
          <AutobuyerDropdownEntry
            :autobuyer="autobuyer"
            :modes="modes"
            :mode-name-fn="modeName"
          />
        </template>
      </ExpandingControlBox>
    </template>
    <template #toggleSlot>
      <div v-if="hasAlternateInputs">
        {{ $t("target_time") }}
      </div>
      <div v-else>
        {{ $t("target_rm") }}
      </div>
      <AutobuyerInput
        :autobuyer="autobuyer"
        :type="hasAlternateInputs ? 'float' : 'decimal'"
        :property="hasAlternateInputs ? 'time' : 'rm'"
      />
    </template>
    <template #checkboxSlot>
      <div v-if="hasAlternateInputs && hasRelicMode">
        {{ $t("target_rs") }}
      </div>
      <div v-else>
        {{ $t("target_gl") }}
      </div>
      <AutobuyerInput
        :autobuyer="autobuyer"
        :type="(hasAlternateInputs && hasRelicMode) ? 'decimal' : 'int'"
        :property="(hasAlternateInputs && hasRelicMode) ? 'shard' : 'glyph'"
      />
      <div v-if="isOverCap">
        自动购买器将在符文等级上限 ({{ formatInt(levelCap) }} 级) 时触发。
      </div>
    </template>
  </AutobuyerBox>
  `
};