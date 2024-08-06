import CelestialQuoteHistory from "../../CelestialQuoteHistory.js";
import RaPet from "./RaPet.js";
import RaPetRemembranceButton from "./RaPetRemembranceButton.js";

export default {
  name: "RaTab",
  components: {
    RaPet,
    RaPetRemembranceButton,
    CelestialQuoteHistory
  },
  data() {
    return {
      memoriesPerChunk: 0,
      showReality: false,
      isRaCapped: false,
      totalLevels: 0,
      showRemembrance: false,
      hasRemembrance: false,
      remembranceReq: 0,
      remembranceMult: 1,
      remembranceNerf: 1,
      petWithRemembrance: "",
      isRunning: false,
      memoryBoosts: "",
    };
  },
  computed: {
    laitelaUnlock: () => Laitela.isUnlocked,
    pets: () => [
      {
        pet: Ra.pets.teresa,
        scalingUpgradeVisible: () => Ra.unlocks.chargedInfinityUpgrades.isUnlocked,
        scalingUpgradeText: () => $p("you_can_charge_X_upgrades", Ra.totalCharges, formatInt(Ra.totalCharges)),
      },
      {
        pet: Ra.pets.effarig,
        scalingUpgradeVisible: () => AlchemyResources.all.filter(r => r.isUnlocked).length > 0,
        scalingUpgradeText: () => {
          const resources = AlchemyResources.all.filter(r => r.isUnlocked).length;
          return $p("you_have_unlocked_X_resources", resources, formatInt(resources));
        },
      },
      {
        pet: Ra.pets.nameless,
        scalingUpgradeVisible: () => Ra.unlocks.improvedStoredTime.isUnlocked,
        scalingUpgradeText: () => $p(
          "stored_game_time_X_real_time_Y_hours",
          Ra.unlocks.improvedStoredTime.effects.realTimeCap.effectOrDefault(0) / (1000 * 3600),
          formatX(Ra.unlocks.improvedStoredTime.effects.gameTimeAmplification.effectOrDefault(1), 2),
          formatInt(Ra.unlocks.improvedStoredTime.effects.realTimeCap.effectOrDefault(0) / (1000 * 3600))
        )
      },
      {
        pet: Ra.pets.v,
        scalingUpgradeVisible: () => Ra.unlocks.unlockHardV.isUnlocked,
        scalingUpgradeText: () => {
          const triadCount = Ra.unlocks.unlockHardV.effectOrDefault(0);
          return $p("you_have_unlocked_X_triad_studies", triadCount, formatInt(triadCount));
        },
      }
    ],
    petStyle() {
      return {
        color: (this.petWithRemembrance === "")
          ? "white"
          : this.pets.find(pet => pet.pet.name === this.petWithRemembrance).pet.color,
      };
    },
    runButtonClassObject() {
      return {
        "c-ra-run-button__icon": true,
        "c-ra-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[4].effects().map(d => d.replace(/^\w/u, c => c.toUpperCase()));
    },
    memoryDescription() {
      return `Within Ra's Reality, Memory Chunks for Celestial Memories
        will be generated based on certain resource amounts.`;
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.memoriesPerChunk = Ra.productionPerMemoryChunk;
      this.isRaCapped = Ra.totalPetLevel === 100;
      this.totalLevels = Ra.totalPetLevel;
      this.showRemembrance = Ra.unlocks.effarigUnlock.canBeApplied;
      this.hasRemembrance = Ra.remembrance.isUnlocked;
      this.remembranceReq = Ra.remembrance.requiredLevels;
      this.remembranceMult = Ra.remembrance.multiplier;
      this.remembranceNerf = Ra.remembrance.nerf;
      this.petWithRemembrance = Ra.petWithRemembrance;
      this.isRunning = Ra.isRunning;
      this.memoryBoosts = Ra.memoryBoostResources;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: $t("ra_reality"), number: 4 });
    },
    toggleMode() {
      Ra.toggleMode();
    }
  },
  template: `
  <div class="l-ra-celestial-tab">
    <div class="c-ra-memory-header">
      <CelestialQuoteHistory celestial="ra" />
      <div v-if="!isRaCapped">
        Each Memory Chunk generates a base of one Memory per second<span v-if="memoriesPerChunk > 1">,
          which has been increased to {{ quantify("Memory", memoriesPerChunk, 2, 3) }} per second</span>.
        <br>
        Storing real time prevents Memory Chunk generation, but Memories will still be gained normally.
        <span v-if="memoriesPerChunk > 1">
          <br>
          This is being increased due to {{ memoryBoosts }}.
        </span>
      </div>
      <div v-else>
        {{ $t("ra_capped_disclaimer") }}
      </div>
    </div>
    <div>
      Mouse-over the icons below the bar to see descriptions of upgrades,
      <br>
      and mouse-over <i class="fas fa-question-circle" /> icons for specific resource information.
    </div>
    <div class="l-ra-all-pets-container">
      <RaPet
        v-for="(pet, i) in pets"
        :key="i"
        :pet-config="pet"
      />
    </div>
    <div class="l-ra-non-pets">
      <button class="c-ra-run-button">
        <h2 :class="{ 'o-pelle-disabled': isDoomed }">
          <span v-if="isRunning">{{ $t("you_are_in_X", $t("ra_reality")) }}</span>
          <span v-else>{{ $t("start_X", $t("ra_reality")) }}</span>
        </h2>
        <div
          :class="runButtonClassObject"
          @click="startRun"
        >
          <span class="c-ra-run-button__icon__sigil fas fa-sun" />
        </div>
        <span
          v-for="(line, lineId) in runDescription"
          :key="lineId + '-ra-run-desc'"
        >
          {{ line }}
        </span>
        <br>
        <span>
          {{ memoryDescription }}
        </span>
      </button>
      <div
        v-if="showRemembrance && !isRaCapped"
        class="c-ra-remembrance-unlock"
      >
        <h1 :style="petStyle">
          {{ $t("remembrance") }}
        </h1>
        <span :style="petStyle">
          {{ $t("ra_remembrance_info", formatX(remembranceMult), formatX(remembranceNerf, 1, 1)) }}
        </span>
        <div
          v-if="hasRemembrance"
          class="c-ra-remembrance-unlock-inner"
        >
          <RaPetRemembranceButton
            v-for="(pet, i) in pets"
            :key="i"
            :pet-config="pet"
          />
        </div>
        <div
          v-else
          class="c-ra-remembrance-unlock-inner"
        >
          {{ $t("ra_remembrance_info_2", formatInt(remembranceReq), formatInt(remembranceReq - totalLevels)) }}
        </div>
      </div>
    </div>
  </div>
  `
};