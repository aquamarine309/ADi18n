import BlackHoleChargingSliders from "../../tabs/black-hole/BlackHoleChargingSliders.js";
import CelestialQuoteHistory from "../../CelestialQuoteHistory.js";
import PrimaryButton from "../../PrimaryButton.js";
import PrimaryToggleButton from "../../PrimaryToggleButton.js";

export default {
  name: "NamelessTab",
  components: {
    CelestialQuoteHistory,
    PrimaryButton,
    PrimaryToggleButton,
    BlackHoleChargingSliders
  },
  data: () => ({
    isStoringBlackHole: false,
    isStoringReal: false,
    autoStoreReal: false,
    offlineEnabled: false,
    hasAutoRelease: false,
    isRunning: false,
    completed: false,
    storedBlackHole: 0,
    storedReal: 0,
    storedRealEffiency: 0,
    storedRealCap: 0,
    autoRelease: false,
    autoReleaseSpeed: 0,
    unlocks: [],
    buyableUnlocks: [],
    quote: "",
    currentSpeedUp: 0,
    hintsUnlocked: false,
    canModifyGameTimeStorage: false,
    canChangeStoreTime: false,
    canChangeStoreRealTime: false,
    canDischarge: false,
    canAutoRelease: false,
    hasNoCharge: true,
    hasReachedCurrentCap: false,
  }),
  computed: {
    storedRealEfficiencyDesc() {
      return formatPercents(this.storedRealEffiency);
    },
    storedRealCapDesc() {
      return timeDisplayShort(this.storedRealCap);
    },
    unlocksInfo() {
      return NAMELESS_UNLOCKS;
    },
    nerfedBlackHoleTime() {
      return Nameless.storedTimeInsideNameless(this.storedBlackHole);
    },
    realityTitle() {
      if (this.isRunning) return $t("you_are_in_X", $t("nameless_reality"));
      return $t("start_X", $t("nameless_reality"));
    },
    runButtonClassObject() {
      return {
        "c-nameless-run-button__icon": true,
        "c-nameless-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[2].effects();
    },
    realTimeButtonText() {
      if (!this.offlineEnabled) return $t("offline_progress_disabled");
      if (this.autoStoreReal) return $t("offline_time_stored");
      return $t("offline_time_used");
    },
    // Use this here since Nameless has a fairly non-standard character, and SFCs don't support using \uf0c1
    namelessSymbol: () => Nameless.symbol,
    isDoomed: () => Pelle.isDoomed,
    storeGameTimeClass() {
      return {
        "o-nameless-mechanic-button": true,
        "o-nameless-mechanic-button--clickable": this.canModifyGameTimeStorage,
        "o-nameless-mechanic-button--storing-time": this.isStoringBlackHole,
        "l-fixed-setting": !this.canModifyGameTimeStorage,
        "o-pelle-disabled": this.isDoomed
      };
    },
    storeRealTimeClass() {
      return {
        "o-nameless-mechanic-button": true,
        "o-nameless-mechanic-button--clickable": !this.isDoomed,
        "o-nameless-mechanic-button--storing-time": this.isStoringReal,
        "l-fixed-setting": !this.canChangeStoreRealTime,
        "o-pelle-disabled": this.isDoomed
      };
    },
    dischargeClass() {
      return {
        "o-nameless-mechanic-button": true,
        "o-nameless-mechanic-button--clickable": !this.isDoomed,
        "l-fixed-setting": !this.canDischarge || this.hasNoCharge,
        "o-pelle-disabled": this.isDoomed
      };
    },
    doomedDisabledClass() {
      return { "o-pelle-disabled": this.isDoomed };
    },
    mechanicButtonClass() {
      return {
        "o-nameless-mechanic-button": true,
        "o-nameless-mechanic-button--clickable": !this.isDoomed
      };
    },
    realTimeInfo() {
      return $t_split("efficiency_and_store_time_cap", this.storedRealEfficiencyDesc, this.storedRealCapDesc);
    }
  },
  watch: {
    autoRelease(newValue) {
      player.celestials.nameless.isAutoReleasing = newValue;
    }
  },
  methods: {
    update() {
      this.isStoringBlackHole = Nameless.isStoringGameTime;
      this.storedBlackHole = player.celestials.nameless.stored;
      this.isStoringReal = Nameless.isStoringRealTime;
      this.autoStoreReal = player.celestials.nameless.autoStoreReal;
      this.offlineEnabled = player.options.offlineProgress;
      this.hasAutoRelease = Ra.unlocks.autoPulseTime.canBeApplied;
      this.isRunning = Nameless.isRunning;
      this.completed = Nameless.isCompleted && !this.isDoomed;
      this.storedReal = player.celestials.nameless.storedReal;
      this.storedRealEffiency = Nameless.storedRealTimeEfficiency;
      this.storedRealCap = Nameless.storedRealTimeCap;
      this.unlocks = Array.from(player.celestials.nameless.unlocks);
      this.buyableUnlocks = Object.values(NAMELESS_UNLOCKS).map(x => Nameless.canBuy(x));
      this.quote = Nameless.quote;
      this.autoRelease = player.celestials.nameless.isAutoReleasing;
      this.autoReleaseSpeed = Nameless.isAutoReleasing ? Nameless.autoReleaseSpeed : 0;
      this.currentSpeedUp = Nameless.currentBlackHoleStoreAmountPerMs;
      this.hintsUnlocked = NamelessProgress.hintsUnlocked.hasProgress;
      this.canModifyGameTimeStorage = Nameless.canModifyGameTimeStorage;
      this.canChangeStoreTime = Nameless.canModifyGameTimeStorage;
      this.canChangeStoreRealTime = Nameless.canModifyRealTimeStorage;
      this.canDischarge = Nameless.canRelease(false);
      this.canAutoRelease = Nameless.canRelease(true);
      this.hasNoCharge = player.celestials.nameless.stored === 0;
      this.hasReachedCurrentCap = this.storedReal === this.storedRealCap;
    },
    toggleStoreBlackHole() {
      Nameless.toggleStoreBlackHole();
    },
    toggleStoreReal() {
      Nameless.toggleStoreReal();
    },
    toggleAutoStoreReal() {
      if (!this.offlineEnabled) return;
      Nameless.toggleAutoStoreReal();
    },
    useStored() {
      Nameless.useStoredTime(false);
    },
    timeDisplayShort(ms) {
      return timeDisplayShort(ms);
    },
    timeUntilBuy(price) {
      return Math.max((price - this.storedBlackHole) / this.currentSpeedUp, 0);
    },
    buyUnlock(info) {
      Nameless.buyUnlock(info);
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: $t("nameless_reality"), number: 2 });
    },
    hasUnlock(info) {
      return Nameless.has(info);
    },
    canBuyUnlock(info) {
      // This (rather than just using Nameless.canBuy(info) and removing this.buyableUnlocks)
      // is needed for proper reactivity of button styles (e.g., if you get a level 5000 glyph
      // while on the Nameless tab).
      return this.buyableUnlocks[info.id];
    },
    unlockClassObject(info) {
      return {
        "o-nameless-shop-button--bought": this.hasUnlock(info),
        "o-nameless-shop-button--available": this.canBuyUnlock(info)
      };
    },
    glitchStyle(x) {
      const xScale = 15 / 27;
      const yScale = 5;
      const dx = (x - 13) * xScale + (Math.random() * 2 - 1) * 0.85;
      const dy = (Math.random() * 2 - 1) * yScale;
      const height = (Math.pow(Math.random(), 1.5) + 0.25) * 3 * yScale;
      return {
        transform: `translate(${dx}rem, ${dy}rem)`,
        height: `${height}rem`,
      };
    }
  },
  template: `
  <div class="l-nameless-celestial-tab">
    <CelestialQuoteHistory celestial="nameless" />
    <div
      v-if="hasAutoRelease && canAutoRelease"
      class="c-subtab-option-container"
    >
      <PrimaryToggleButton
        v-model="autoRelease"
        class="o-primary-btn--subtab-option"
        label="黑洞脉冲:"
      />
    </div>
    <div class="l-nameless-celestial-tab--inner">
      <div class="l-nameless-run-container">
        <div v-if="hasUnlock(unlocksInfo.RUN)">
          <div class="c-nameless-run-button">
            <div
              class="c-nameless-run-button__title"
              :class="doomedDisabledClass"
            >
              {{ realityTitle }}
            </div>
            <div v-if="completed">
              <b>({{ $t("completed") }})</b>
            </div>
            <div
              :class="runButtonClassObject"
              @click="startRun"
            >
              <div class="c-nameless-run-button__icon__sigil">
                {{ namelessSymbol }}
              </div>
              <div
                v-for="x in (isRunning ? 25 : 0)"
                :key="x"
                class="c-nameless-run-button__icon__glitch"
                :style="glitchStyle(x)"
              />
            </div>
            <div
              v-for="line in runDescription"
              :key="line"
              class="c-nameless-run-description-line"
              data-v-nameless-tab
            >
              {{ line }}
            </div>
            <b>奖励：解锁超立方体，可提升无限维度的数量上限。（详见无限维度页面）</b>
          </div>
        </div>
      </div>
      <div class="l-nameless-upgrades-column">
        <PrimaryButton
          v-if="hintsUnlocked"
          class="o-primary-btn"
          onclick="Modal.namelessHints.show()"
        >
          {{ $t("examine_the_reality_more_closely") }}
        </PrimaryButton>
        <div class="l-nameless-top-container">
          <div class="l-nameless-top-container__half">
            {{ $t("nameless_charge_info") }}
            <button
              :class="storeGameTimeClass"
              @click="toggleStoreBlackHole"
            >
              <div
                class="o-nameless-stored-time"
                :class="doomedDisabledClass"
              >
                {{ timeDisplayShort(storedBlackHole) }}
              </div>
              <div>
                {{ isStoringBlackHole ? $t("charging_bh"): $t("charge_bh") }}
              </div>
            </button>
            <button
              :class="dischargeClass"
              @click="useStored"
            >
              <span>{{ $t("discharge_bh") }}</span>
              <p v-if="isRunning">
                {{ $t("X_in_this_reality", timeDisplayShort(nerfedBlackHoleTime)) }}
              </p>
            </button>
          </div>
          <div class="l-nameless-top-container__half">
            {{ $t("nameless_store_time_info") }}
            <button
              :class="[storeRealTimeClass,
                       {'l-fixed-setting': hasReachedCurrentCap}]"
              @click="toggleStoreReal"
              data-v-nameless-tab
            >
              <div class="o-nameless-stored-time">
                {{ timeDisplayShort(storedReal) }}
              </div>
              <div>
                {{ isStoringReal ? $t("storing_real_time"): $t("store_real_time") }}
              </div>
            </button>
            <button
              :class="[mechanicButtonClass,
                       {'o-nameless-mechanic-button--storing-time': autoStoreReal && offlineEnabled,
                        'l-fixed-setting': !canChangeStoreRealTime || !offlineEnabled},
                       doomedDisabledClass]"
              @click="toggleAutoStoreReal"
              data-v-nameless-tab
            >
              {{ realTimeButtonText }}
            </button>
            <div>
              {{ realTimeInfo[0] }}
            </div>
            <div>
             {{ realTimeInfo[1] }}
            </div>
          </div>
        </div>
        <BlackHoleChargingSliders />
        <br>
        <div class="l-nameless-shop-container">
          <button
            v-for="unlock in unlocksInfo"
            :key="unlock.id"
            class="o-nameless-shop-button"
            :class="unlockClassObject(unlock)"
            @click="buyUnlock(unlock)"
          >
            {{ unlock.description() }}
            <div v-if="!hasUnlock(unlock)">
              {{ $t("cost_X", timeDisplayShort(unlock.price)) }}
            </div>
            <span v-if="isStoringBlackHole && !hasUnlock(unlock) && timeUntilBuy(unlock.price) > 0">
              {{ $t("time_to_obtain_X", timeDisplayShort(timeUntilBuy(unlock.price))) }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  `
};