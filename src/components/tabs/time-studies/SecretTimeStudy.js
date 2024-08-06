export default {
  name: "SecretTimeStudy",
  props: {
    setup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isVisible: player.secretUnlocks.viewSecretTS,
    };
  },
  computed: {
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
        "o-time-study--secret": !this.isVisible,
        "o-time-study--secret-unlocked": this.isVisible,
      };
    }
  },
  methods: {
    update() {
      this.isVisible = player.secretUnlocks.viewSecretTS;
    },
    handleClick() {
      if (this.isVisible) {
        player.secretUnlocks.viewSecretTS = false;
      } else {
        if (!player.secretUnlocks.viewSecretTS) {
          player.secretUnlocks.viewSecretTS = true;
          this.$refs.study.addEventListener("transitionend", function achGiver(e) {
            SecretAchievement(21).unlock();
            e.target.removeEventListener(e.type, achGiver);
          });
        }
      }
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
      {{ $t("timestudy_12") }}
    </span>
  </button>
  `
};