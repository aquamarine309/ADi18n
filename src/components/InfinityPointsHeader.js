export default {
  name: "InfinityPointsHeader",
  data() {
    return {
      infinityPoints: new Decimal(),
      isVisible: false
    };
  },
  computed: {
    ipText() {
      return $p_split("you_have_X_infinity_points", this.infinityPoints, format(this.infinityPoints, 2));
    }
  },
  methods: {
    update() {
      this.infinityPoints.copyFrom(Currency.infinityPoints);
      this.isVisible = PlayerProgress.infinityUnlocked();
    }
  },
  template: `
  <div
    v-show="isVisible"
    class="c-infinity-tab__header"
  >
    {{ ipText[0] }}
    <span class="c-infinity-tab__infinity-points">{{ ipText[1] }}</span>
    {{ ipText[2] }}
  </div>
  `
};