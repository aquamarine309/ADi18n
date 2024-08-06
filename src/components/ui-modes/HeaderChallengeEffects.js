export default {
  name: "HeaderChallengeEffects",
  data() {
    return {
      isInMatterChallenge: false,
      matter: new Decimal(0),
      isChallengePowerVisible: false,
      challengePower: "",
      isInEffarig: false,
      effarigMultNerfText: "",
      effarigTickNerfText: "",
      isInLaitela: false,
      laitelaTimer: 0,
      laitelaEntropy: "",
      waitingforHint: false,
      namelessTimer: "",
    };
  },
  computed: {
    namelessText() {
      return $t("nameless_are_helping", Nameless.displayName, this.namelessTimer);
    }
  },
  methods: {
    update() {
      this.isInMatterChallenge = Player.isInMatterChallenge;
      if (this.isInMatterChallenge) {
        this.matter.copyFrom(Currency.matter);
      }
      this.updateChallengePower();

      this.isInEffarig = Effarig.isRunning;
      if (this.isInEffarig) {
        this.effarigMultNerfText = `${formatPow(0.25 + 0.25 * Effarig.nerfFactor(Currency.infinityPower.value), 0, 5)}`;
        this.effarigTickNerfText = `${formatPow(0.7 + 0.1 * Effarig.nerfFactor(Currency.timeShards.value), 0, 5)}`;
      }
      this.isInLaitela = Laitela.isRunning;
      if (this.isInLaitela) {
        if (player.celestials.laitela.entropy > 0) {
          this.laitelaEntropy = `${formatPercents(player.celestials.laitela.entropy, 2, 2)}`;
          this.laitelaTimer = Time.thisRealityRealTime.toStringShort();
        } else {
          this.laitelaEntropy = `${formatPercents(1, 2, 2)}`;
          this.laitelaTimer = TimeSpan.fromSeconds(player.celestials.laitela.thisCompletion).toStringShort();
        }
      }

      this.waitingforHint = Nameless.canTickHintTimer;
      const rawMsUntilHints = 5 * 3600 * 1000 - player.celestials.nameless.hintUnlockProgress;
      this.namelessTimer = TimeSpan.fromMilliseconds(rawMsUntilHints / (Nameless.isRunning ? 1 : 0.4))
        .toStringShort();
    },
    updateChallengePower() {
      const isC2Running = NormalChallenge(2).isRunning;
      const isC3Running = NormalChallenge(3).isRunning;
      const isIC6Running = InfinityChallenge(6).isRunning;
      const isIC8Running = InfinityChallenge(8).isRunning;
      const isChallengePowerVisible = isC2Running || isC3Running || isIC6Running || isIC8Running;
      this.isChallengePowerVisible = isChallengePowerVisible;
      if (isChallengePowerVisible) {
        const powerArray = [];
        if (isC2Running) powerArray.push(`${$t("nc_name", "2")}: ${formatPercents(player.chall2Pow, 2, 2)}`);
        if (isC3Running) powerArray.push(`${$t("nc_name", "3")}: ${formatX(player.chall3Pow, 3, 4)}`);
        if (isIC6Running) powerArray.push(`${$t("ic_name", "6")}: /
          ${format(new Decimal(1).timesEffectOf(InfinityChallenge(6)), 2, 2)}`);
        if (isIC8Running) powerArray.push(`${$t("ic_name", "8")}: /
          ${format(new Decimal(1).timesEffectOf(InfinityChallenge(8)).reciprocal(), 2, 2)}`);
        this.challengePower = powerArray.join(", ");
      }
    },
  },
  template: `
  <div>
    <div v-if="waitingforHint">
      {{ namelessText }}
    </div>
    <div v-if="isInEffarig">
      {{ $t("gamespeed_and_multipliers_are_dilated", effarigMultNerfText) }}
      <br>
      {{ $t("tickspeed_is_dilated", effarigTickNerfText) }}
    </div>
    <div v-if="isInLaitela">
      {{ $t("entropy_X", laitelaEntropy) }} ({{ laitelaTimer }})
    </div>
    <div v-if="isInMatterChallenge">
      {{ $p("there_is_X_matter", matter, format(matter, 2, 1)) }}
    </div>
    <div v-if="isChallengePowerVisible">
      {{ challengePower }}
    </div>
  </div>
  `
};