export default {
  name: "RealityCurrencyHeader",
  data() {
    return {
      isDoomed: false,
      rm: new Decimal(0),
      im: 0,
      realityShards: 0
    };
  },
  computed: {
    resourceClass() {
      return {
        "c-reality-tab__reality-machines": true,
        "c-shard-color": this.isDoomed
      };
    },
    text() {
      if (this.isDoomed) {
        return $p_split("you_have_X_reality_shards", this.realityShards, format(this.realityShards, 2, 2));
      } else {
        return $p_split("you_have_X_reality_machines", this.rm, formatMachines(this.rm, this.im))
      }
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      if (this.isDoomed) {
        this.realityShards = Currency.realityShards.value;
      } else {
        this.rm.copyFrom(Currency.realityMachines.value);
        this.im = Currency.imaginaryMachines.value;
      }
    }
  },
  template: `
  <div
    class="c-reality-currency"
    data-v-reality-currency-header
  >
    {{ text[0] }}
    <b
      :class="resourceClass"
      data-v-reality-currency-header
    >
      {{ text[1] }}
    </b>
    {{ text[2] }}
  </div>
  `
};