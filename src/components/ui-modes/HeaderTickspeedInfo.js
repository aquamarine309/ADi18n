import GameSpeedDisplay from "../GameSpeedDisplay.js";

export default {
  name: "HeaderTickspeedInfo",
  components: {
    GameSpeedDisplay
  },
  data() {
    return {
      mult: new Decimal(0),
      tickspeed: new Decimal(0),
      galaxyCount: 0,
      purchasedTickspeed: 0,
      freeTickspeed: 0,
    };
  },
  computed: {
    tickspeedDisplay() {
      return $t("tickspeed", format(this.tickspeed, 2, 3));
    },
    perUpgrade() {
      if (InfinityChallenge(3).isRunning) return $t("tickspeed_multiplier_ic3", formatX(1.05 + this.galaxyCount * 0.005, 3, 3));
      return $t("tickspeed_multiplier" ,formatX(this.mult.reciprocal(), 2, 3));
    },
  },
  methods: {
    update() {
      this.mult.copyFrom(Tickspeed.multiplier);
      this.tickspeed.copyFrom(Tickspeed.perSecond);
      this.galaxyCount = player.galaxies;
      this.purchasedTickspeed = player.totalTickBought;
      this.freeTickspeed = FreeTickspeed.amount;
    },
  },
  template: `
  <div>
    <br>
    {{ perUpgrade }}
    <br>
    {{ tickspeedDisplay }}
    <br>
    <GameSpeedDisplay />
  </div>
  `
};