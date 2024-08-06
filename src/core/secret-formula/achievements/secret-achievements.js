export const secretAchievements = [
  {
    id: 11,
    description: () => $t("secret_achievement_11_tooltip")
  },
  {
    id: 12,
    name: "以防万一",
    description() { return `在不刷新网页的情况下手动存档 ${formatInt(100)} 次。`; }
  },
  {
    id: 13,
    description: () => $t("secret_achievement_13_tooltip")
  },
  {
    id: 14,
    description: () => $t("secret_achievement_14_tooltip")
  },
  {
    id: 15,
    description: () => $t("secret_achievement_15_tooltip"),
  },
  {
    id: 16,
    description() {
      return $t("secret_achievement_16_tooltip", formatInt(10));
    },
    checkRequirement: () => AchievementTimers.pain
      .check(PlayerProgress.eternityUnlocked() && Notations.current.isPainful, 600),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 17,
    name: "30条命",
    description: () => "输入konami代码。"
  },
  {
    id: 18,
    description() {
      return $t("secret_achievement_18_tooltip", formatInt(1), formatInt(1e5));
    }
  },
  {
    id: 21,
    description: () => $t("secret_achievement_21_tooltip")
  },
  {
    id: 22,
    description() { return $t("secret_achievement_22_tooltip", formatInt(1e5)); },
    checkRequirement: () => player.requirementChecks.permanent.emojiGalaxies >= 1e5,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 23,
    name: "你作弊了",
    description: () => "打开控制台。"
  },
  {
    id: 24,
    description: () => $t("secret_achievement_24_tooltip")
  },
  {
    id: 25,
    description: () => $t("secret_achievement_25_tooltip")
  },
  {
    id: 26,
    description() {
      return $t("secret_achievement_26_tooltip", formatInt(10));
    },
    checkRequirement: (function() {
      let count = 0;
      return () => ++count >= 10;
    }()),
    checkEvent: GAME_EVENT.CHALLENGE_FAILED
  },
  {
    id: 27,
    description: () => $t("secret_achievement_27_tooltip"),
    checkRequirement: () => Currency.matter.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 28,
    description: () => $t("secret_achievement_28_tooltip")
  },
  {
    id: 31,
    description() { return $t("secret_achievement_31_tooltip", formatInt(200)); }
  },
  {
    id: 32,
    description() {
      return $t("secret_achievement_32_tooltip", format(0.001, 3, 3));
    },
    checkRequirement: () =>
      Time.bestInfinity.totalMilliseconds <= 1 ||
      Time.bestEternity.totalMilliseconds <= 1,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.ETERNITY_RESET_AFTER]
  },
  {
    id: 33,
    description: () => $t("secret_achievement_33_tooltip")
  },
  {
    id: 34,
    description: () => $t("secret_achievement_34_tooltip")
  },
  {
    id: 35,
    description() { return $t("secret_achievement_35_tooltip", formatInt(1e5)); },
    checkRequirement: () => player.requirementChecks.permanent.singleTickspeed >= 1e5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 36,
    description: () => $t("secret_achievement_36_tooltip")
  },
  {
    id: 37,
    description: () => $t("secret_achievement_37_tooltip")
  },
  {
    id: 38,
    name: "前途未卜",
    description: () => "在正确输入硬重置的确认后关闭弹窗。"
  },
  {
    id: 41,
    name: "该维度不存在",
    description: () => "尝试购买第九维度。"
  },
  {
    id: 42,
    description: () => $t("secret_achievement_42_tooltip")
  },
  {
    id: 43,
    description: () => $t("secret_achievement_43_tooltip"),
    checkRequirement: () => Glyphs.active.length && Glyphs.active.every(x => Glyphs.isMusicGlyph(x)),
    checkEvent: GAME_EVENT.GLYPHS_EQUIPPED_CHANGED
  },
  {
    id: 44,
    description() { return $t("secret_achievement_44_tooltip", formatInt(15)); },
    checkRequirement: () => AchievementTimers.stats.check(Tab.statistics.isOpen, 900),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 45,
    name: "绵延不绝",
    description: () => "拖动复兴节点大约一分钟。",
    checkRequirement: () => player.requirementChecks.permanent.perkTreeDragging++ / 100 >= 60
  },
  {
    id: 46,
    description: () => $t("secret_achievement_46_tooltip")
  },
  {
    id: 47,
    description: () => $t("secret_achievement_47_tooltip")
  },
  {
    id: 48,
    description: () => $t("secret_achievement_48_tooltip")
  },
];
