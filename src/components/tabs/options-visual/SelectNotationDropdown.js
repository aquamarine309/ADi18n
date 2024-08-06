export default {
  name: "SelectNotationDropdown",
  computed: {
    notations: () => Notations.all,
    
  },
  methods: {
    formatName(name) {
      return $t(`notation_${name.toLowerCase().replace(/\s/g, "_")}`);
    }
  },
  template: `
  <div class="l-select-notation">
    <div class="l-select-notation__inner">
      <div
        v-for="notation in notations"
        :key="notation.name"
        class="o-primary-btn l-select-notation__item c-select-notation__item"
        @click="notation.setAsCurrent()"
      >
        {{ formatName(notation.name) }}
      </div>
    </div>
  </div>
  `
};
