export default {
  name: "EternityPointsHeader",
  data() {
    return {
      eternityPoints: new Decimal()
    };
  },
  computed: {
    epText() {
      return $p_split("you_have_X_eternity_points", this.eternityPoints, format(this.eternityPoints, 2));
    }
  },
  methods: {
    update() {
      this.eternityPoints.copyFrom(Currency.eternityPoints.value.floor());
    }
  },
  template: `
  <div class="c-eternity-tab__header">
    {{ epText[0] }}
    <span class="c-eternity-tab__eternity-points">{{ epText[1] }}</span>
    {{ epText[2] }}
  </div>
  `
};