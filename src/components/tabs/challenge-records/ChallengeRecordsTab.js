import ChallengeRecordsList from "./ChallengeRecordsList.js";

export default {
  name: "ChallengeRecordsTab",
  components: {
    ChallengeRecordsList
  },
  data() {
    return {
      infinityChallengesUnlocked: false,
      normalChallenges: [],
      infinityChallenges: []
    };
  },
  methods: {
    update() {
      this.infinityChallengesUnlocked = PlayerProgress.infinityChallengeCompleted() ||
        PlayerProgress.eternityUnlocked();
      this.normalChallenges = player.challenge.normal.bestTimes.slice(0);
      this.infinityChallenges = player.challenge.infinity.bestTimes.slice(0);
    }
  },
  template: `
  <div class="l-challenge-records-tab c-stats-tab">
    <ChallengeRecordsList
      :times="normalChallenges"
      :isIC="false"
    />
    <ChallengeRecordsList
      v-if="infinityChallengesUnlocked"
      :times="infinityChallenges"
      class="l-challenge-records-tab__infinity_challenges"
      :isIC="true"
    />
  </div>
  `
};