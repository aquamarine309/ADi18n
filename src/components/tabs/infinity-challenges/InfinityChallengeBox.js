import ChallengeBox from "../../ChallengeBox.js";
import DescriptionDisplay from "../../DescriptionDisplay.js";
import EffectDisplay from "../../EffectDisplay.js";

export default {
  name: "InfinityChallengeBox",
  components: {
    ChallengeBox,
    DescriptionDisplay,
    EffectDisplay
  },
  props: {
    challenge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isRunning: false,
      isCompleted: false
    };
  },
  computed: {
    config() {
      return this.challenge.config;
    },
    name() {
      return $t(`ic${this.challenge.id}`);
    },
    rewardTitle() {
      return `${$t("reward")}:`
    }
  },
  methods: {
    update() {
      const challenge = this.challenge;
      this.isUnlocked = challenge.isUnlocked;
      this.isRunning = challenge.isRunning;
      this.isCompleted = challenge.isCompleted;
    }
  },
  template: `
  <ChallengeBox
    :name="name"
    :is-unlocked="isUnlocked"
    :is-running="isRunning"
    :is-completed="isCompleted"
    class="c-challenge-box--infinity"
    @start="challenge.requestStart()"
  >
    <template #top>
      <DescriptionDisplay :config="config" />
      <EffectDisplay
        v-if="isRunning"
        :config="config"
      />
    </template>
    <template #bottom>
      <div class="l-challenge-box__bottom--infinity">
        <span>{{ $t("goal") }}: {{ format(config.goal) }} {{ $t("antimatter") }}</span>
        <DescriptionDisplay
          :config="config.reward"
          :title="rewardTitle"
        />
        <EffectDisplay
          v-if="isCompleted"
          :config="config.reward"
        />
      </div>
    </template>
  </ChallengeBox>
  `
};