export default {
  name: "NamelessTimeStudy",
  props: {
    setup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isVisible: player.celestials.nameless.hasSecretStudy,
    };
  },
  computed: {
    namelessTT: () => 100,
    styleObject() {
      return {
        top: `${this.setup.top}rem`,
        left: `${this.setup.left}rem`
      };
    },
    classObject() {
      return {
        "l-time-study": true,
        "o-time-study": true,
        "o-time-study--bought": true,
        "o-time-study-normal": true,
        "o-time-study-normal--bought": true,
        "o-time-study--nameless": true,
        "o-time-study--nameless-unlocked": this.isVisible,
      };
    }
  },
  methods: {
    update() {
      this.isVisible = Nameless.isRunning && player.celestials.nameless.hasSecretStudy;
    },
    handleClick() {
      if (!Nameless.isRunning || player.celestials.nameless.hasSecretStudy) return;
      player.celestials.nameless.hasSecretStudy = true;
      NamelessProgress.secretStudy.giveProgress();
      Currency.timeTheorems.add(this.namelessTT);
    },
  },
  template: `
  <button
    ref="study"
    :class="classObject"
    :style="styleObject"
    @click="handleClick"
  >
    <span>
      {{ $t("timestudy_12_nameless") }}
      <br>
      <br>
      {{ $p("cost_X_time_theorems", -namelessTT, format(-namelessTT)) }}
    </span>
  </button>
  `
};