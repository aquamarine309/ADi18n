import { DC } from "../../../core/constants.js";

import TypeSacrifice from "./TypeSacrifice.js";

export default {
  name: "SacrificedGlyphs",
  components: {
    TypeSacrifice
  },
  data() {
    return {
      anySacrifices: false,
      hasDragover: false,
      hasAlteration: false,
      hideAlteration: false,
      maxSacrifice: 0,
      teresaMult: 0,
      lastMachinesTeresa: new Decimal(0),
    };
  },
  computed: {
    types: () => GLYPH_TYPES.filter(type => type !== "cursed" && type !== "companion"),
    lastMachines() {
      return this.lastMachinesTeresa.lt(DC.E10000)
        ? $p("X_reality_machines", this.lastMachinesTeresa, format(this.lastMachinesTeresa, 2))
        : `${format(this.lastMachinesTeresa.dividedBy(DC.E10000), 2)} ${$t("imaginary_machines_short")}`;
    },
    dropDownIconClass() {
      return this.hideAlteration ? "far fa-plus-square" : "far fa-minus-square";
    },
    isDoomed() {
      return Pelle.isDoomed;
    },
    addThreshold() {
      return GlyphAlteration.additionThreshold;
    },
    empowerThreshold() {
      return GlyphAlteration.empowermentThreshold;
    },
    boostThreshold() {
      return GlyphAlteration.boostingThreshold;
    },
    cosmeticTypes: () => CosmeticGlyphTypes,
    addStyle() {
      return { color: GlyphAlteration.baseAdditionColor() };
    },
    empowerStyle() {
      return { color: GlyphAlteration.baseEmpowermentColor() };
    },
    boostStyle() {
      return { color: GlyphAlteration.baseBoostColor() };
    },
    hasSeenRealityGlyph() {
      return player.reality.glyphs.createdRealityGlyph;
    },
    alteredInfo() {
      return $t_split("altered_glyphs_info");
    }
  },
  created() {
    this.on$(GAME_EVENT.GLYPH_VISUAL_CHANGE, () => {
      this.$recompute("cosmeticTypes");
    });
  },
  methods: {
    update() {
      this.anySacrifices = GameCache.logTotalGlyphSacrifice !== 0;
      this.hasAlteration = Ra.unlocks.alteredGlyphs.canBeApplied;
      this.hideAlteration = player.options.hideAlterationEffects;
      this.maxSacrifice = GlyphSacrificeHandler.maxSacrificeForEffects;
      this.teresaMult = Teresa.runRewardMultiplier;
      this.lastMachinesTeresa.copyFrom(player.celestials.teresa.lastRepeatedMachines);
    },
    dragover(event) {
      if (Pelle.isDoomed) return;
      if (!event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return;
      event.preventDefault();
      this.hasDragover = true;
    },
    dragleave(event) {
      if (
        this.isDoomed ||
        !event.relatedTarget ||
        !event.relatedTarget.classList ||
        event.relatedTarget.classList.contains("c-current-glyph-effects") ||
        event.relatedTarget.classList.contains("c-sacrificed-glyphs__header") ||
        event.relatedTarget.classList.contains("l-sacrificed-glyphs__type") ||
        event.relatedTarget.classList.contains("l-sacrificed-glyphs__type-symbol") ||
        event.relatedTarget.classList.contains("l-sacrificed-glyphs__type-amount") ||
        event.relatedTarget.classList.contains("c-sacrificed-glyphs__type-new-amount") ||
        event.relatedTarget.classList.length === 0) return;
      this.hasDragover = false;
    },
    drop(event) {
      if (this.isDoomed || !event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return;
      const id = parseInt(event.dataTransfer.getData(GLYPH_MIME_TYPE), 10);
      if (isNaN(id)) return;
      const glyph = Glyphs.findById(id);
      if (!glyph) return;
      GlyphSacrificeHandler.sacrificeGlyph(glyph, true);
      this.hasDragover = false;
    },
    toggleAlteration() {
      player.options.hideAlterationEffects = !player.options.hideAlterationEffects;
    },
    glyphSymbol(type) {
      return this.cosmeticTypes[type].currentSymbol.symbol;
    }
  },
  template: `
  <div
    class="c-current-glyph-effects l-current-glyph-effects"
    :class="{'c-sacrificed-glyphs--dragover': hasDragover}"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div class="l-sacrificed-glyphs__help">
      <span
        v-if="isDoomed"
        class="pelle-current-glyph-effects"
      >
        {{ $t("glyph_sacrifice_pelle") }}
      </span>
      <span v-else>
        <div>将符文拖到框内或Shift+单击符文以献祭。</div>
        <div>如果你想禁用确认提示，可以在设置里禁用或按住Ctrl键。</div>
      </span>
    </div>
    <div v-if="hasAlteration">
      <span
        class="c-altered-glyphs-toggle-button"
        @click="toggleAlteration"
      >
        <i :class="dropDownIconClass" />
        <b> {{ $t("altered_glyphs") }}</b>
      </span>
      <br>
      <div v-if="hideAlteration">
        (已隐藏详情，点击以展开)
      </div>
      <div v-else>
        {{ alteredInfo[0] }}<br>
        {{ alteredInfo[1] }}
        <br><br>
        <b>
          <span :style="addStyle">{{ $t("altered_glyphs_addition_info", format(addThreshold)) }}</span>
          <br>
          <span :style="empowerStyle">{{ $t("altered_glyphs_empowerment_info", format(empowerThreshold)) }}</span>
          <br>
          <span :style="boostStyle">{{ $t("altered_glyphs_boost_info", format(boostThreshold)) }}</span>
        </b>
        <br><br>
        符文献祭的上限为 {{ format(maxSacrifice) }}，超过后不再获得加成。
      </div>
    </div>
    <br>
    <div class="c-sacrificed-glyphs__header">
      {{ $t("glyph_sacrifice_boosts") }}
    </div>
    <div v-if="anySacrifices && !isDoomed">
      <div v-if="teresaMult > 1">
        {{ $t("glyph_sacrifice_teresa", formatX(teresaMult, 2, 2), lastMachines) }}
        <br>
        <span v-if="hasSeenRealityGlyph">
          现实符文不受此加成的影响，并且没有异变加成。
        </span>
      </div>
      <template v-for="type in types">
        <TypeSacrifice
          :key="type + glyphSymbol(type)"
          :type="type"
          :has-dragover="hasDragover"
        />
      </template>
    </div>
    <div
      v-else-if="isDoomed"
      class="pelle-current-glyph-effects"
    >
      {{ $t("glyph_sacrifice_pelle_2") }}
    </div>
    <div v-else>
      {{ $t("no_sacrificed_glyphs") }}
    </div>
  </div>
  `
};