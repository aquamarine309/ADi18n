import { BitUpgradeState } from "../game-mechanics/index.js";
import { GameDatabase } from "../secret-formula/game-database.js";

import { Quotes } from "./quotes.js";

export const NAMELESS_UNLOCKS = {
  FREE_TICKSPEED_SOFTCAP: {
    id: 0,
    price: TimeSpan.fromYears(1e35).totalMilliseconds,
    secondaryRequirement: () => true,
    description: () => $t("nameless_unlock_0_description", formatInt(1e5)),
  },
  RUN: {
    id: 1,
    price: TimeSpan.fromYears(1e40).totalMilliseconds,
    secondaryRequirement() {
      const hasLevelRequirement = player.records.bestReality.glyphLevel >= 5000;
      const hasRarityRequirement = strengthToRarity(player.records.bestReality.glyphStrength) >= 100;
      return hasLevelRequirement && hasRarityRequirement;
    },
    description() {
      const hasLevelRequirement = player.records.bestReality.glyphLevel >= 5000;
      const hasRarityRequirement = strengthToRarity(player.records.bestReality.glyphStrength) >= 100;
      return $t("nameless_unlock_1_description", hasLevelRequirement ? "[✓]" : "[✗]", formatInt(5000), hasRarityRequirement ? "[✓]" : "[✗]", formatRarity(100));
    }
  }
};

export const Nameless = {
  get displayName() {
    return $t("nameless_full");
  },
  possessiveName: "The Nameless Ones'",
  boostReality: false,
  BROKEN_CHALLENGES: [2, 3, 4, 5, 7, 8, 10, 11, 12],
  nextTickDiff: 50,
  isReleaseTick: false,
  autoReleaseTick: 0,
  autoReleaseSpeed: 0,
  timeCap: 1e300,
  glyphLevelMin: 5000,
  currentBlackHoleStoreAmountPerMs: 0,
  tachyonNerf: 0.3,
  toggleStoreBlackHole() {
    if (!this.canModifyGameTimeStorage) return;
    player.celestials.nameless.isStoring = !player.celestials.nameless.isStoring;
    player.celestials.nameless.isStoringReal = false;
  },
  toggleStoreReal() {
    if (!this.canModifyRealTimeStorage && !this.isStoredRealTimeCapped) return;
    player.celestials.nameless.isStoringReal = !player.celestials.nameless.isStoringReal;
    player.celestials.nameless.isStoring = false;
  },
  toggleAutoStoreReal() {
    if (!this.canModifyRealTimeStorage) return;
    player.celestials.nameless.autoStoreReal = !player.celestials.nameless.autoStoreReal;
  },
  get canModifyGameTimeStorage() {
    return Nameless.isUnlocked && !Pelle.isDoomed && !BlackHoles.arePaused && !EternityChallenge(12).isRunning &&
      !Nameless.isRunning && !Laitela.isRunning;
  },
  get canModifyRealTimeStorage() {
    return Nameless.isUnlocked && !Pelle.isDoomed;
  },
  get isStoredRealTimeCapped() {
    return player.celestials.nameless.storedReal < this.storedRealTimeCap;
  },
  // We assume that the situations where you can't modify time storage settings (of either type) are exactly the cases
  // where they have also been explicitly disabled via other game mechanics. This also reduces UI boilerplate code.
  // Note that we force time storage when auto-releasing, as not doing so caused a lot of poor usability issues
  get isStoringGameTime() {
    return this.canModifyGameTimeStorage && (this.isAutoReleasing || player.celestials.nameless.isStoring);
  },
  get isStoringRealTime() {
    return this.canModifyRealTimeStorage && player.celestials.nameless.isStoringReal;
  },
  get storedRealTimeEfficiency() {
    return 0.7;
  },
  get storedRealTimeCap() {
    const addedCap = Ra.unlocks.improvedStoredTime.effects.realTimeCap.effectOrDefault(0);
    return 1000 * 3600 * 8 + addedCap;
  },
  get isAutoReleasing() {
    return player.celestials.nameless.isAutoReleasing && !BlackHoles.areNegative && !Pelle.isDisabled("blackhole");
  },
  storeRealTime() {
    if (Pelle.isDoomed) return;
    const thisUpdate = Date.now();
    const diff = Math.max(thisUpdate - player.lastUpdate, 0);
    const efficiency = this.storedRealTimeEfficiency;
    const maxTime = this.storedRealTimeCap;
    player.celestials.nameless.storedReal += diff * efficiency;
    if (player.celestials.nameless.storedReal > maxTime) {
      player.celestials.nameless.isStoringReal = false;
      player.celestials.nameless.storedReal = maxTime;
    }
    // More than 24 hours in milliseconds
    if (player.celestials.nameless.storedReal > (24 * 60 * 60 * 1000)) SecretAchievement(46).unlock();
    player.lastUpdate = thisUpdate;
  },
  autoStoreRealTime(diffMs) {
    const maxGain = this.storedRealTimeCap - player.celestials.nameless.storedReal;
    const used = Math.min(diffMs, Math.max(0, maxGain / this.storedRealTimeEfficiency));
    player.celestials.nameless.storedReal += used * this.storedRealTimeEfficiency;
    player.lastUpdate += used;
    return diffMs - used;
  },
  canRelease(auto) {
    return !Nameless.isStoringRealTime && !EternityChallenge(12).isRunning && !Laitela.isRunning &&
      !(Nameless.isRunning && auto) && !Pelle.isDoomed;
  },
  // "autoRelease" should only be true when called with the Ra upgrade
  useStoredTime(autoRelease) {
    if (!this.canRelease(autoRelease)) return;
    const maxInversion = player.requirementChecks.reality.slowestBH <= 1e-300;
    if (ImaginaryUpgrade(24).isLockingMechanics && Ra.isRunning && maxInversion) {
      if (!autoRelease) ImaginaryUpgrade(24).tryShowWarningModal($t("imaginary_upgrade_23_lock_event1"));
      return;
    }
    player.requirementChecks.reality.slowestBH = 1;
    let release = player.celestials.nameless.stored;
    if (Nameless.isRunning) {
      release = Nameless.storedTimeInsideNameless(release);
      if (Time.thisReality.totalYears + TimeSpan.fromMilliseconds(release).totalYears > 1) {
        NamelessProgress.storedTime.giveProgress();
      }
    }
    if (autoRelease) release *= 0.01;
    this.nextTickDiff = Math.clampMax(release, this.timeCap);
    this.isReleaseTick = true;
    // Effective gamespeed from stored time assumes a "default" 50 ms update rate for consistency
    const effectiveGamespeed = release / 50;
    player.celestials.ra.peakGamespeed = Math.max(player.celestials.ra.peakGamespeed, effectiveGamespeed);
    this.autoReleaseSpeed = release / player.options.updateRate / 5;
    player.celestials.nameless.stored *= autoRelease ? 0.99 : 0;
  },
  has(info) {
    return player.celestials.nameless.unlocks.includes(info.id);
  },
  canBuy(info) {
    return player.celestials.nameless.stored >= info.price && info.secondaryRequirement() && !this.has(info);
  },
  buyUnlock(info) {
    if (!this.canBuy(info)) return false;
    if (info.id === NAMELESS_UNLOCKS.RUN.id) this.quotes.unlockRun.show();
    player.celestials.nameless.stored -= info.price;
    player.celestials.nameless.unlocks.push(info.id);
    return true;
  },
  initializeRun() {
    clearCelestialRuns();
    player.celestials.nameless.run = true;
    player.celestials.nameless.hasSecretStudy = false;
    this.feltEternity = false;

    // Re-validation needs to be done here because this code gets called after the automator attempts to start.
    // This is a special case for Nameless because it's one of the only two cases where a command becomes locked
    // again (the other being Pelle entry, which just force-stops the automator entirely).
    AutomatorData.recalculateErrors();
    if (AutomatorBackend.state.mode === AUTOMATOR_MODE.RUN && AutomatorData.currentErrors().length) {
      AutomatorBackend.stop();
      GameUI.notify.error("This Reality forbids Black Holes! (Automator stopped)");
    }

    this.quotes.startRun.show();
  },
  get isRunning() {
    return player.celestials.nameless.run;
  },
  completeRun() {
    player.celestials.nameless.completed = true;
    this.quotes.completeReality.show();
  },
  get isCompleted() {
    return player.celestials.nameless.completed;
  },
  get canTickHintTimer() {
    return !NamelessProgress.hintsUnlocked.hasProgress && Nameless.has(NAMELESS_UNLOCKS.RUN) && !Nameless.isCompleted;
  },
  get isUnlocked() {
    return EffarigUnlock.eternity.isUnlocked;
  },
  get realityBoostRatio() {
    return Math.max(1, Math.floor(player.celestials.nameless.storedReal /
      Math.max(1000, Time.thisRealityRealTime.totalMilliseconds)));
  },
  get canAmplify() {
    return this.realityBoostRatio > 1 && !Pelle.isDoomed && !isInCelestialReality();
  },
  storedTimeInsideNameless(stored) {
    if (stored <= 1e3) return stored;
    return Math.pow(10, Math.pow(Math.log10(stored / 1e3), 0.55)) * 1e3;
  },
  feelEternity() {
    if (this.feltEternity) {
      Modal.message.show($t("nameless_feel_eternity_already_found", formatX(1e66)),
      { closeEvent: GAME_EVENT.REALITY_RESET_AFTER }, 1);
    } else {
      NamelessProgress.feelEternity.giveProgress();
      this.feltEternity = true;
      Modal.message.show($t("nameless_feel_eternity_disclaimer", formatX(1e66)), { closeEvent: GAME_EVENT.REALITY_RESET_AFTER }, 1);
    }
  },
  get feltEternity() {
    return player.celestials.nameless.feltEternity;
  },
  set feltEternity(value) {
    player.celestials.nameless.feltEternity = value;
  },
  get nextHintCost() {
    return TimeSpan.fromYears(1e40 * Math.pow(3, this.hintCostIncreases)).totalMilliseconds;
  },
  get hintCostIncreases() {
    const hintTime = player.celestials.nameless.zeroHintTime - Date.now();
    return Math.clampMin(hintTime / TimeSpan.fromDays(1).totalMilliseconds, 0);
  },
  spendTimeForHint() {
    if (player.celestials.nameless.stored < this.nextHintCost) return false;
    player.celestials.nameless.stored -= this.nextHintCost;
    if (Nameless.hintCostIncreases === 0) {
      player.celestials.nameless.zeroHintTime = Date.now() + TimeSpan.fromDays(1).totalMilliseconds;
    } else {
      player.celestials.nameless.zeroHintTime += TimeSpan.fromDays(1).totalMilliseconds;
    }
    return true;
  },
  quotes: Quotes.nameless,
  // Unicode f0c1.
  symbol: "\uf0c1"
};

class NamelessProgressState extends BitUpgradeState {
  get bits() { return player.celestials.nameless.hintBits; }
  set bits(value) { player.celestials.nameless.hintBits = value; }

  get hasProgress() {
    return Boolean(player.celestials.nameless.progressBits & (1 << this.id));
  }

  get hasHint() {
    return this.hasProgress || this.isUnlocked;
  }

  get hintInfo() {
    return this.config.hint();
  }

  get completedInfo() {
    return typeof this.config.condition === "function" ? this.config.condition() : this.config.condition;
  }

  giveProgress() {
    // Bump the last hint time appropriately if the player found the hint
    if (this.hasHint && !this.hasProgress) {
      player.celestials.nameless.zeroHintTime -= Math.log(2) / Math.log(3) * TimeSpan.fromDays(1).totalMilliseconds;
      GameUI.notify.success($t("nameless_you_found_a_crack"), 10000);
    }
    player.celestials.nameless.progressBits |= (1 << this.id);
  }
}

export const NamelessProgress = mapGameDataToObject(
  GameDatabase.celestials.nameless.progress,
  config => new NamelessProgressState(config)
);

export const Tesseracts = {
  get bought() {
    return player.celestials.nameless.tesseracts;
  },

  get extra() {
    return this.bought * (SingularityMilestone.tesseractMultFromSingularities.effectOrDefault(1) - 1);
  },

  get effectiveCount() {
    return this.bought + this.extra;
  },

  buyTesseract() {
    if (!this.canBuyTesseract) return;
    if (GameEnd.creditsEverClosed) return;
    player.celestials.nameless.tesseracts++;
  },

  // This used to be a somewhat complicated function which spaced costs out super-exponentially, but the decision to
  // hardcap all resources (as feasible) to e9e15 meant that in practice only the first 10 or so could actually be
  // obtained. Changing the function to a hardcoded array is better for understanding the code since it's small.
  // Note that costs go a bit past e9e15 because while AM is capped at e9e15, most other resources (including IP)
  // aren't and can go a tiny bit past it.
  // The formula is a hardcoded 2, 4, 6 followed by successive multiplication by 2x, 4x, 6x, and so on.
  BASE_COSTS: [2, 4, 6, 12, 48, 288, 2304, 23040, 276480, 3870720, 61931520, 1114767360],
  costs(index) {
    // In practice this should never happen, but have it just to be safe
    if (index >= this.BASE_COSTS.length) return Decimal.pow10(Number.MAX_VALUE);
    return Decimal.pow10(1e7 * this.BASE_COSTS[Math.floor(index)]);
  },

  get nextCost() {
    return this.costs(this.bought);
  },

  get canBuyTesseract() {
    return Nameless.isCompleted && Currency.infinityPoints.gte(Tesseracts.nextCost);
  },

  capIncrease(count = this.bought) {
    const totalCount = count * SingularityMilestone.tesseractMultFromSingularities.effectOrDefault(1);
    const base = totalCount < 1 ? 0 : 250e3 * Math.pow(2, totalCount);
    return base * (AlchemyResource.boundless.effectValue + 1);
  },

  get nextTesseractIncrease() {
    return this.capIncrease(this.bought + 1) - this.capIncrease(this.bought);
  },
};

EventHub.logic.on(GAME_EVENT.TAB_CHANGED, () => {
  if (Tab.celestials.nameless.isOpen) Nameless.quotes.initial.show();
});
