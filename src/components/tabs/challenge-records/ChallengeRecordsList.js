export default {
  name: "ChallengeRecordsList",
  props: {
    isIC: {
      type: Boolean,
      required: true
    },
    times: {
      type: Array,
      required: true
    }
  },
  computed: {
    timeSum() {
      return this.times.sum();
    },
    completedAllChallenges() {
      return this.timeSum < Number.MAX_VALUE;
    },
    start() {
      return this.isIC ? 1 : 2;
    },
    sumText() {
      if (this.completedAllChallenges) {
        return $t(this.isIC ? "sum_of_infinity_challenge_times" : "sum_of_normal_challenge_times", timeDisplayShort(this.timeSum));
      } else {
        return $t(this.isIC ? "infinity_challenges_not_completed" : "normal_challenges_not_completed");
      }
    }
  },
  methods: {
    completionString(index, time) {
      return time < Number.MAX_VALUE
        ? $t("challenge_record", this.challenge(index).name, timeDisplayShort(time))
        : $t("challenge_not_completed", this.challenge(index).name);
    },
    challenge(x) {
      return this.isIC ? InfinityChallenge(x) : NormalChallenge(x);
    }
  },
  template: `
  <div>
    <br>
    <div
      v-for="(time, i) in times"
      :key="i"
    >
      <span>{{ completionString(start + i, time) }}</span>
    </div>
    <br>
    <div>
      {{ sumText }}
    </div>
  </div>
  `
};