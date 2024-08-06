export default {
  name: "BreakInfinityButton",
  data() {
    return {
      isBroken: false,
      isUnlocked: false,
      isNameless: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-infinity-upgrade-btn": true,
        "o-infinity-upgrade-btn--color-2": true,
        "o-infinity-upgrade-btn--available": this.isUnlocked,
        "o-infinity-upgrade-btn--unavailable": !this.isUnlocked,
        "o-infinity-upgrade-btn--feel-eternity": this.isNameless,
        "o-infinity-upgrade-btn--unclickable": this.isBroken && !this.isNameless,
      };
    },
    tooltip() {
      // ...eons stacked on eons stacked on eons stacked on eons stacked on ...
      if (this.isNameless) return "…无尽的永恒堆叠在无尽的永恒堆叠的无尽的永恒之上…";
      return undefined;
    },
    text() {
      if (this.isNameless) return $t("feel_eternity");
      return this.isBroken ? "已打破无限" : $t("break_infinity");
    }
  },
  methods: {
    update() {
      this.isBroken = player.break;
      this.isUnlocked = Autobuyer.bigCrunch.hasMaxedInterval;
      this.isNameless = Nameless.isRunning;
    },
    clicked() {
      if (this.isNameless) Nameless.feelEternity();
      else if (!this.isBroken && this.isUnlocked) Modal.breakInfinity.show();
    }
  },
  template: `
  <button
    v-tooltip="tooltip"
    :class="classObject"
    @click="clicked"
  >
    {{ text }}
  </button>
  `
};