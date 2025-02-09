import HiddenTabGroup from "./HiddenTabGroup.js";
import ModalWrapperOptions from "../ModalWrapperOptions.js";
import PrimaryButton from "../../../PrimaryButton.js";

export default {
  name: "HiddenTabsModal",
  components: {
    HiddenTabGroup,
    ModalWrapperOptions,
    PrimaryButton,
  },
  data() {
    return {
      isNameless: false,
      isAlmostEnd: false,
    };
  },
  computed: {
    tabs: () => Tabs.currentUIFormat,
  },
  methods: {
    update() {
      this.isNameless = Nameless.isRunning;
      this.isAlmostEnd = Pelle.hasGalaxyGenerator;
    },
    showAllTabs() {
      for (const tab of this.tabs) {
        tab.unhideTab();
        for (const subtab of tab.subtabs)
          subtab.unhideTab();
      }
    }
  },
  template: `
  <ModalWrapperOptions
    class="l-wrapper"
    data-v-hidden-tabs-modal
  >
    <template #header>
      Modify Visible Tabs
    </template>
    <div class="c-modal--short">
      Click a button to toggle showing a tab on/off.
      <br>
      Some tabs cannot be hidden, and you cannot hide your current tab.
      <br>
      Unhiding a tab in which all subtabs are hidden will also unhide all subtabs,
      and hiding all subtabs will also hide the tab.
      <br>
      <div v-if="isAlmostEnd">
        You cannot hide your tabs after unlocking the Galaxy Generator.
      </div>
      <div v-if="isNameless">
        <br>
        <i>You must... see everywhere...</i>
        <br>
        (You cannot hide your tabs within this Reality)
      </div>
      <PrimaryButton
        @click="showAllTabs"
      >
        Show all tabs
      </PrimaryButton>
      <HiddenTabGroup
        v-for="(tab, index) in tabs"
        :key="index"
        :tab="tab"
        :change-enabled="!isNameless && !isAlmostEnd"
        class="l-hide-modal-tab-container"
      />
    </div>
  </ModalWrapperOptions>
  `
};