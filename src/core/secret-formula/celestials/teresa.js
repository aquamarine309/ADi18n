export const teresa = {
  unlocks: {
    run: {
      id: 0,
      price: 1e14,
      description: () => $t("teresa_unlock_0_description"),
      onUnlock: () => Teresa.quotes.unlockReality.show(),
    },
    epGen: {
      id: 1,
      price: 1e18,
      description: () => $t("teresa_unlock_1_description"),
      isDisabledInDoomed: true
    },
    effarig: {
      id: 3,
      price: 1e24,
      description: () => $t("teresa_unlock_3_description"),
      onUnlock: () => Teresa.quotes.effarig.show(),
    },
    shop: {
      id: 2,
      price: 1e21,
      description: () => $t("teresa_unlock_2_description"),
    },
    undo: {
      id: 4,
      price: 1e10,
      description: () => $t("teresa_unlock_4_description"),
      isDisabledInDoomed: true
    },
    startEU: {
      id: 5,
      price: 1e6,
      description: () => $t("teresa_unlock_5_description"),
      isDisabledInDoomed: true,
      onUnlock: () => {
        for (const id of [1, 2, 3, 4, 5, 6]) player.eternityUpgrades.add(id);
      },
    }
  }
};
