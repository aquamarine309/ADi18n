export default {
  name: "HiddenTimeStudyConnection",
  props: {
    setup: {
      type: Object,
      required: true
    },
    isNameless: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-time-study-connection": true,
        "o-time-study-connection--bought": true,
        "o-time-study-connection--secret": true,
        "o-time-study-connection--secret-unlocked": this.isVisible
      };
    }
  },
  methods: {
    update() {
      this.isVisible = this.isNameless
        ? (Nameless.isRunning && player.celestials.nameless.hasSecretStudy)
        : player.secretUnlocks.viewSecretTS;
    },
    percents(value) {
      return `${value * 100}%`;
    }
  },
  template: `
  <line
    :x1="percents(setup.x1)"
    :y1="percents(setup.y1)"
    :x2="percents(setup.x2)"
    :y2="percents(setup.y2)"
    :class="classObject"
  />
  `
};