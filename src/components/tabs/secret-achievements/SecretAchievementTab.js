import SecretAchievementRow from "./SecretAchievementRow.js";

export default {
  name: "SecretAchievementTab",
  components: {
    SecretAchievementRow
  },
  computed: {
    rows: () => SecretAchievements.allRows,
  },
  template: `
  <div class="l-achievements-tab">
    <div class="c-achievements-tab__header">
      <span>
        隐藏成就仅供娱乐，并且不会提供任何奖励。
      </span>
    </div>
    <div class="l-achievement-grid">
      <secret-achievement-row
        v-for="(row, i) in rows"
        :key="i"
        :row="row"
      />
    </div>
  </div>
  `
};