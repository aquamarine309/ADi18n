import ImaginaryUpgradeButton from "./ImaginaryUpgradeButton.js";

export default {
  name: "ImaginaryUpgradesTab",
  components: {
    ImaginaryUpgradeButton
  },
  data() {
    return {
      baseRMCap: new Decimal(),
      capRM: new Decimal(),
      scaleTime: 0,
      capStr: "",
    };
  },
  computed: {
    upgrades: () => ImaginaryUpgrades.all,
    lockTooltip: () => `Requirement locks only prevent manual and automated actions. Any related upgrades
      will not be disabled and may still cause requirements to be failed.`,
    machineCapText() {
      return $t_split("machine_cap", this.capStr);
    },
    infoText() {
      return $t_split(
        "imaginary_upgrades_info",
        format(this.capRM),
        format(this.baseRMCap),
        formatInt(this.scaleTime)
      );
    }
  },
  methods: {
    update() {
      this.baseRMCap.copyFrom(MachineHandler.baseRMCap);
      this.capRM.copyFrom(MachineHandler.hardcapRM);
      this.scaleTime = MachineHandler.scaleTimeForIM;
      this.capStr = formatMachines(MachineHandler.hardcapRM, MachineHandler.currentIMCap);
    },
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    }
  },
  template: `
  <div class="l-reality-upgrade-grid">
    <div
      class="c-cap-text"
      data-v-imaginary-upgrades-tab
    >
      {{ machineCapText[0] }}<span class="c-reality-tab__reality-machines">{{ machineCapText[1] }}</span>{{ machineCapText[2] }}
    </div>
    <div
      class="c-info-text"
      data-v-imaginary-upgrades-tab
    >
      {{ infoText[0] }}
      <br>
      {{ infoText[1] }}
      <br>
      {{ infoText[2] }}
      <br>
      {{ infoText[3] }}
      <br>
      <br>
      {{ infoText[4] }}
      <br>
      {{ infoText[5] }}
      <br>
      {{ infoText[6] }}
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
    </div>
    <div
      v-for="row in 5"
      :key="row"
      class="l-reality-upgrade-grid__row"
    >
      <ImaginaryUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
  `
};