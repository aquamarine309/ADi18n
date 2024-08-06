// These entries describe the special flash-between-celestial effect on some quotes, with the numbers being
// durations of each celestial in seconds
const flashCelestial = [
  ["teresa", 0.8],
  ["effarig", 0.8],
  ["nameless", 0.8],
  ["v", 0.8],
  ["ra", 0.8],
  ["laitela", 0.8],
  ["pelle", 0.8]
];
/** @param {string} cel */
const primaryBackground = cel => [["pelle", 1.5], [cel, 1.5]];

/* eslint-disable no-multi-spaces */
const destroyer =    () => $t_split("pelle_quotes_cycle_destroyer");
const eternal =      () => $t_split("pelle_quotes_cycle_eternal");
const lesser =       () => $t_split("pelle_quotes_cycle_lesser");
const deities =      () => $t_split("pelle_quotes_cycle_deities");

const assured =      () => $t_split("pelle_quotes_cycle_assured");
const battle =       () => $t_split("pelle_quotes_cycle_battle");
const battles =      () => $t_split("pelle_quotes_cycle_battles");
const cluster =      () => $t_split("pelle_quotes_cycle_cluster");
const confusing =    () => $t_split("pelle_quotes_cycle_confusing");
const dance =        () => $t_split("pelle_quotes_cycle_dance");
const filament =     () => $t_split("pelle_quotes_cycle_filament");
const forever =      () => $t_split("pelle_quotes_cycle_forever");
const inevitable =    () => $t_split("pelle_quotes_cycle_inevitable");
const mandate =      () => $t_split("pelle_quotes_cycle_mandate");
const misconstrue =  () => $t_split("pelle_quotes_cycle_misconstrue");
const reverse =      () => $t_split("pelle_quotes_cycle_reverse");
const shame =        () => $t_split("pelle_quotes_cycle_shame");
const single =       () => $t_split("pelle_quotes_cycle_single");
const unseen =       () => $t_split("pelle_quotes_cycle_unseen");
const unbroken =     () => $t_split("pelle_quotes_cycle_unbroken");

const sycophant =    () => $t_split("pelle_quotes_cycle_sycophant");
const tired =        () => $t_split("pelle_quotes_cycle_tired");
const usurper =      () => $t_split("pelle_quotes_cycle_usurper");
const pride =        () => $t_split("pelle_quotes_cycle_pride");
const forgotten =    () => $t_split("pelle_quotes_cycle_forgotten");
const paramount =    () => $t_split("pelle_quotes_cycle_paramount");

const deity =        () => $t_split("pelle_quotes_cycle_deity")
const irreversible =   () => $t_split("pelle_quotes_cycle_irreversible")
/* eslint-enable no-multi-spaces */

export const pelleQuotes = {
  initial: {
    id: 0,
    lines: () => {
      const texts = $t_split("pelle_quotes_initial");
      return [
        texts[0],
        texts[1],
        texts[2],
        { text: texts[3], 1: forever },
        texts[4],
        texts[5],
        { text: texts[6], 1: dance },
        texts[7],
        { text: texts[8], 1: destroyer },
        { text: texts[9], 1: mandate },
        { text: texts[10], 1: eternal },
        texts[11],
        { text: texts[12], 1: deities },
        { text: texts[13], 1: unseen },
        { text: texts[14], 1: destroyer },
        { text: texts[15], 1: battles }
      ]
    }
  },
  arm: {
    id: 1,
    lines: () => {
      const texts = $t_split("pelle_quotes_arm");
      return [
        texts[0],
        texts[1],
        texts[2],
        texts[3],
        { text: texts[4], 1: unseen },
        { text: texts[5], 1: mandate },
        { text: texts[6], 1: confusing },
        { text: texts[7], 1: misconstrue },
        texts[8]
      ]
    },
  },
  strike1: {
    id: 2,
    lines: () => {
      const texts = $t_split("pelle_quotes_strike1");
      return [
        { text: texts[0], 1: mandate },
        { text: texts[1], 1: destroyer },
        texts[2],
        { text: texts[3], 1: battles },
        texts[4],
        { text: texts[5], 1: dance },
        { text: texts[6], 1: lesser },
        { text: texts[7], 1: eternal },
        { text: texts[8], 1: reverse },
        { text: texts[9], 1: unseen },
        texts[10],
        { text: texts[11], 1: unseen }
      ]
    },
  },
  strike2: {
    id: 3,
    lines: () => {
      const texts = $t_split("pelle_quotes_strike2");
      return [
        { text: texts[0], 1: destroyer },
        texts[1],
        texts[2],
        texts[3],
        texts[4],
        texts[5],
        texts[6],
        texts[7],
        texts[8],
        { text: texts[9], 1: single }
      ]
    }
  },
  strike3: {
    id: 4,
    lines: () => {
      const texts = $t_split("pelle_quotes_strike3");
      return [
        texts[0],
        texts[1],
        { text: texts[2], 1: cluster },
        texts[3],
        texts[4],
        texts[5],
        texts[6],
        { text: texts[7], 1: dance },
        texts[8],
        { text: texts[9], 1: eternal },
        texts[10]
      ]
    },
  },
  strike4: {
    id: 5,
    lines: () => {
      const texts = $t_split("pelle_quotes_strike4");
      return [
        { text: texts[0], 1: mandate },
        { text: texts[1], 1: assured },
        texts[2],
        { text: texts[3], 1: deity },
        { text: texts[4], 1: destroyer },
        { text: texts[5], 1: unseen },
        { text: texts[6], 1: assured },
        texts[7],
        { text: texts[8], 1: battle },
        { text: texts[9], 1: irreversible },
        texts[10],
        texts[11],
        { text: texts[12], 1: dance },
        { text: texts[13], 1: forever }
      ]
    }
  },
  strike5: {
    id: 6,
    lines: () => {
      const texts = $t_split("pelle_quotes_strike5");
        return [
        { text: texts[0], 1: deities },
        { text: texts[1], 1: forever },
        { text: texts[2], 1: mandate },
        texts[3],
        {
          text: texts[4],
          background: primaryBackground("teresa"),
          1: lesser
        }, {
          text: texts[5],
          background: primaryBackground("teresa"),
          1: sycophant
        }, {
          text: texts[6],
          background: primaryBackground("teresa"),
        }, {
          text: texts[7],
          background: primaryBackground("teresa"),
          1: lesser
        }, {
          text: texts[8],
          background: primaryBackground("teresa"),
        }, {
          text: texts[9],
          background: primaryBackground("teresa"),
          1: sycophant
        }, {
          text: texts[10],
          background: primaryBackground("teresa"),
        }, {
          text: texts[11],
          background: primaryBackground("teresa"),
        }, {
          text: texts[12],
          background: primaryBackground("teresa"),
          1: battle
        }, {
          text: texts[13],
          background: primaryBackground("effarig"),
          1: lesser,
        }, {
          text: texts[14],
          background: primaryBackground("effarig"),
          1: tired,
        }, {
          text: texts[15],
          background: primaryBackground("effarig"),
        }, {
          text: texts[16],
          background: primaryBackground("effarig"),
        }, {
          text: texts[17],
          background: primaryBackground("effarig"),
        }, {
          text: texts[18],
          background: primaryBackground("effarig"),
        }, {
          text: texts[19],
          background: primaryBackground("effarig"),
          1: tired,
        }, {
          text: texts[20],
          background: primaryBackground("effarig"),
        }, {
          text: texts[21],
          background: primaryBackground("nameless"),
          1: usurper,
        }, {
          text: texts[22],
          background: primaryBackground("nameless"),
          1: dance,
        }, {
          text: texts[23],
          background: primaryBackground("nameless"),
          1: usurper,
        }, {
          text: texts[24],
          background: primaryBackground("nameless"),
        }, {
          text: texts[25],
          background: primaryBackground("nameless"),
          1: usurper,
        }, {
          text: texts[26],
          background: primaryBackground("nameless"),
          1: deities,
        }, {
          text: texts[27],
          background: primaryBackground("nameless"),
          1: unseen,
        }, {
          text: texts[28],
          background: primaryBackground("nameless"),
        }, {
          text: texts[29],
          background: primaryBackground("nameless"),
        }, {
          text: texts[30],
          background: primaryBackground("nameless"),
          1: usurper,
        }, {
          text: texts[31],
          background: primaryBackground("nameless"),
        }, {
          text: texts[32],
          background: primaryBackground("nameless"),
          1: lesser,
        }, {
          text: texts[33],
          background: primaryBackground("v"),
          1: lesser,
        }, {
          text: texts[34],
          background: primaryBackground("v"),
        }, {
          text: texts[35],
          background: primaryBackground("v"),
          1: pride,
        }, {
          text: texts[36],
          background: primaryBackground("v"),
        }, {
          text: texts[37],
          background: primaryBackground("v"),
        }, {
          text: texts[38],
          background: primaryBackground("v"),
          1: destroyer,
        }, {
          text: texts[39],
          background: primaryBackground("v"),
          1: pride,
        }, {
          text: texts[40],
          background: primaryBackground("v"),
        }, {
          text: texts[41],
          background: primaryBackground("ra"),
          1: forgotten,
        }, {
          text: texts[42],
          background: primaryBackground("ra"),
          1: unseen,
        }, {
          text: texts[43],
          background: primaryBackground("ra"),
        }, {
          text: texts[44],
          background: primaryBackground("ra"),
        }, {
          text: texts[45],
          background: primaryBackground("ra"),
        }, {
          text: texts[46],
          background: primaryBackground("ra"),
          1: forgotten,
        }, {
          text: texts[47],
          background: primaryBackground("ra"),
          1: usurper,
        }, {
          text: texts[48],
          background: primaryBackground("ra"),
          1: shame,
        }, {
          text: texts[49],
          background: primaryBackground("ra"),
          1: deities,
        }, {
          text: texts[50],
          background: primaryBackground("ra"),
          1: unseen,
        }, {
          text: texts[51],
          background: primaryBackground("ra"),
        }, {
          text: texts[52],
          background: primaryBackground("ra"),
        }, {
          text: texts[53],
          background: primaryBackground("laitela"),
          1: lesser,
        }, {
          text: texts[54],
          background: primaryBackground("laitela"),
          1: paramount,
        }, {
          text: texts[55],
          background: primaryBackground("laitela"),
        }, {
          text: texts[56],
          background: primaryBackground("laitela"),
        }, {
          text: texts[57],
          background: primaryBackground("laitela"),
          1: paramount,
        }, {
          text: texts[58],
          background: primaryBackground("laitela"),
        },
        "Enough reminiscing about the fallen.",
        {
          text: texts[59],
          1: unseen
        }, {
          text: texts[60],
          1: destroyer
        }
      ]
    }
  },
  galaxyGeneratorUnlock: {
    id: 7,
    lines: () => {
      const texts = $t_split("pelle_quotes_galaxy_generator_unlock");
      return [
        texts[0],
        { text: texts[1], 1: filament },
        { text: texts[2], 1: cluster },
        texts[3],
        texts[4],
        { text: texts[5], 1: mandate }
      ]
    }
  },
  galaxyGeneratorRifts: {
    id: 8,
    lines: () => {
      const texts = $t_split("pelle_quotes_galaxy_generator_rifts");
      return [
        { text: texts[0], 1: destroyer },
        { text: texts[1], 1: filament },
        { text: texts[2], 1: inevitable },
        texts[3],
        { text: texts[4], 1: inevitable },
        { text: texts[5], 1: unbroken }
      ]
    }
  },
  galaxyGeneratorPhase1: {
    id: 9,
    lines: () => {
      const texts = $t_split("pelle_quotes_galaxy_generator_phase_1");
      return [
        texts[0],
        { text: texts[1], 1: inevitable }
      ]
    }
  },
  galaxyGeneratorPhase4: {
    id: 10,
    lines: () => $t_split("pelle_quotes_galaxy_generator_phase_4")
  },
  end: {
    id: 11,
    lines: () => {
      const texts = $t_split("pelle_quotes_end");
      return [
        texts[0],
        {
          text: texts[1],
          1: destroyer
        },
        texts[2],
        {
          text: texts[3],
          1: mandate
        },
        texts[4],
        {
          text: texts[5],
          background: flashCelestial,
          1: forever,
        }, {
          text: texts[6],
          background: flashCelestial,
          1: battle,
        }, {
          text: texts[7],
          background: flashCelestial,
        }, {
          text: texts[8],
          background: flashCelestial,
          1: mandate,
        }, {
          text: texts[9], 1: destroyer,
          background: flashCelestial,
        }, {
          text: texts[10],
          background: flashCelestial,
        }, {
          text: texts[11],
          background: flashCelestial,
        }
      ]
    }
  }
};
