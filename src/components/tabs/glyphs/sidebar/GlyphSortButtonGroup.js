export default {
  name: "GlyphSortButtonGroup",
  data() {
    return {
      showScoreFilter: false,
    };
  },
  methods: {
    update() {
      this.showScoreFilter = EffarigUnlock.glyphFilter.isUnlocked;
    },
    sortByLevel() {
      Glyphs.sortByLevel();
    },
    sortByPower() {
      Glyphs.sortByPower();
    },
    sortByScore() {
      Glyphs.sortByScore();
    },
    sortByEffect() {
      Glyphs.sortByEffect();
    },
    collapseEmpty() {
      Glyphs.collapseEmptySlots();
    }
  },
  template: `
  <div class="o-glyph-inventory-management-group">
    <div class="l-glyph-sacrifice-options__header">
      {{ $t("sort_glyphs") }}
    </div>
    <button
      class="c-glyph-inventory-option"
      @click="sortByLevel"
    >
      {{ $t("sort_by_level") }}
      <div class="c-glyph-inventory-option__tooltip">
        Arranges by decreasing Glyph level
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="sortByPower"
    >
      {{ $t("sort_by_power") }}
      <div class="c-glyph-inventory-option__tooltip">
        Arranges by decreasing level×rarity
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="sortByEffect"
    >
      {{ $t("sort_by_effect") }}
      <div class="c-glyph-inventory-option__tooltip">
        Groups Glyphs together based on effects
      </div>
    </button>
    <button
      v-if="showScoreFilter"
      class="c-glyph-inventory-option"
      @click="sortByScore"
    >
      {{ $t("sort_by_score") }}
      <div class="c-glyph-inventory-option__tooltip">
        Arranges by decreasing Glyph filter score
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="collapseEmpty"
    >
      {{ $t("collapse_empty_space") }}
      <div class="c-glyph-inventory-option__tooltip">
        Moves all Glyphs to the earliest empty slots
      </div>
    </button>
  </div>
  `
};