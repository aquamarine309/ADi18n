import { LanguageArray } from "./secret-formula/index.js";

class LanguageState {
  constructor(config) {
    this.name = config.name;
    this.formattedName = config.formattedName;
    this._resources = config.resources;
    this._plurals  = config.plurals;
    const resources = {};
    const plurals = {};
    for (const key in this._resources) {
      resources[key] = values => this.format(key, values);
    }
    for (const key in this._plurals) {
      plurals[key] = (one, values) => this.formatPlural(key, one, values);
    }
    this.resources = resources;
    this.plurals = plurals;
  }

  format(key, values) {
    const string = this._resources[key];
    return $r(string, values);
  }

  formatPlural(key, one, values) {
    if (one === undefined) {
      throw new Error("Plural Error");
    }
    const obj = this._plurals[key];

    for (const item in obj) {
      if (item === "one" && one || item === "other") {
        return $r(obj[item], values);
      }
    }
  }

  setAsCurrent() {
    player.options.language = this.name;
    ui.view.language = this.name;
  }
}

export const Language = mapGameDataToObject(
  GameDatabase.languages,
  config => new LanguageState(config)
);

export const Languages = {
  all: Language.all,
  
  array: (function() {
    const array = {};
    for (const key in LanguageArray) {
      const values = LanguageArray[key];
      array[key] = () => values.map(value => $t(value));
    }
    return array;
  })(),

  base: navigator.language === "zh-CN" ? Language["zh-CN"] : Language["en"],

  find(name) {
    const language = Languages.all.find(l => l.name === name);
    return language === undefined ? this.base : language;
  },

  get current() {
    return GameUI.initialized ? ui.language : this.base;
  },

  toggle() {
    const index = this.all.findIndex(l => l === this.current);
    this.all[(index + 1) % this.all.length].setAsCurrent();
    GameStorage.save();
  }
}