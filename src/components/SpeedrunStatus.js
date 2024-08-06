export default {
  name: "SpeedrunStatus",
  data() {
    return {
      isActive: false,
      isSegmented: false,
      usedSTD: false,
      hasStarted: false,
      startDate: 0,
      saveName: "",
      timePlayedStr: "",
      offlineProgress: false,
      offlineFraction: 0,
      mostRecent: {},
      isCollapsed: false,
      timeSince: 0,
      seedText: 0,
      canModifySeed: false,
      isComplete: false,
    };
  },
  computed: {
    statusText() {
      if (this.isComplete) return `<span style="color: var(--color-good)">${$t("finnished")}!</span>`;
      return this.hasStarted
        ? `<span style="color: var(--color-good)">${$t("running")}!</span>`
        : `<span style="color: var(--color-bad)">${$t("not_started_yet")}</span>`;
    },
    segmentText() {
      return this.isSegmented ? $t("segmented_speedrun") : $t("single_segment_speedrun");
    },
    iapText() {
      return this.usedSTD ? $t("iaps_used") : $t("iaps_not_used");
    },
    offlineText() {
      const stateText = this.offlineProgress
        ? `<span style="color: var(--color-good)">${$t("enabled")}</span>`
        : `<span style="color: var(--color-bad)">${$t("disabled")}</span>`;
      const fractionText = this.offlineFraction === 0
        ? `(${no_offline_used})`
        : `(${$t("X_time_spent_offline", formatPercents(this.offlineFraction, 2))})`;
      return `${stateText} ${fractionText}`;
    },
    collapseIcon() {
      return this.isCollapsed
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    }
  },
  methods: {
    update() {
      const speedrun = player.speedrun;
      this.isActive = speedrun.isActive;
      this.canModifySeed = Speedrun.canModifySeed();
      // Short-circuit if speedrun isn't active; updating some later stuff can cause vue errors outside of speedruns
      if (!this.isActive) return;
      this.isSegmented = speedrun.isSegmented;
      this.usedSTD = speedrun.usedSTD;
      this.hasStarted = speedrun.hasStarted;
      this.startDate = speedrun.startDate;
      this.saveName = speedrun.name;
      this.isCollapsed = speedrun.hideInfo;
      this.isComplete = Achievement(188).isUnlocked;

      this.timePlayedStr = Time.realTimePlayed.toStringShort();
      this.offlineProgress = player.options.offlineProgress;
      this.offlineFraction = speedrun.offlineTimeUsed / Math.clampMin(player.records.realTimePlayed, 1);
      this.mostRecent = Speedrun.mostRecentMilestone();
      this.timeSince = Time.realTimePlayed.minus(TimeSpan.fromMilliseconds(speedrun.records[this.mostRecent] ?? 0))
        .toStringShort();
      this.seedText = Speedrun.seedModeText();
    },
    milestoneName(id) {
      const db = GameDatabase.speedrunMilestones;
      return id === 0 ? $t("none") : db.find(m => m.id === id).name;
    },
    changeName() {
      if (this.hasStarted) return;
      Modal.changeName.show();
    },
    collapseText() {
      return this.isCollapsed ? "展开" : `点击以收起速通详情`;
    },
    toggleCollapse() {
      player.speedrun.hideInfo = !this.isCollapsed;
    },
    openSeedModal() {
      if (!this.canModifySeed) return;
      Modal.modifySeed.show();
    }
  },
  template: `
  <div
    v-if="isActive"
    class="c-speedrun-status"
    data-v-speedrun-status
  >
    <div v-if="!isCollapsed">
      <b>{{ $t("speedrun_status") }} (<span v-html="statusText" />)</b>
      <br>
      <span
        :class="{ 'c-speedrun-status--can-change': !hasStarted }"
        @click="changeName"
        data-v-speedrun-status
      >
        {{ $t("player_name", saveName) }}
      </span>
      <br>
      <i>{{ segmentText }}</i>
      <br>
      <i>{{ iapText }}</i>
      <br>
      <span
        :class="{ 'c-speedrun-status--can-change': canModifySeed }"
        @click="openSeedModal()"
        data-v-speedrun-status
      >{{ seedText }}</span>
      <br>
      {{ $t("total_real_playtime_since_start", timePlayedStr) }}
      <br>
      离线进度: <span v-html="offlineText" />
      <br>
      {{ $t("most_recent_milestone", milestoneName(mostRecent)) }} <span v-if="mostRecent">({{ $t("X_ago", timeSince) }})</span>
      <br>
    </div>
    <div
      class="c-speedrun-status--collapse"
      @click="toggleCollapse"
      data-v-speedrun-status
    >
      <i
        :class="collapseIcon"
        data-v-speedrun-status
      />
      {{ collapseText() }}
      <i 
        :class="collapseIcon"
        data-v-speedrun-status
      />
    </div>
  </div>
  `
};