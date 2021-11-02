<template>
  <div>
    <title-bar text="Comparing Percentage" icon="percentage" />
    <div class="flex justify-center items-center">
      <span class="grid p-3">
        <label for="initialDate" class="font-bold">
          Choose the initial Date <fa icon="calendar-alt"
        /></label>
        <input type="date" id="initialDate" v-model="initialDate" />
      </span>
      <span class="grid p-3">
        <label for="finalDate" class="font-bold"
          >Choose the final Date <fa icon="calendar-alt"
        /></label>
        <input type="date" id="finalDate" v-model="finalDate" />
      </span>

      <button class="bg-blue-700 button m-3" @click="compare">Calculate</button>
    </div>

    <div>
      <b>Sort By:</b>
      <span class="m-3">
        <input type="radio" value="open" id="open" v-model="sortBy" />
        <label class="pl-1" for="open">Open</label>
      </span>
      <span class="m-3">
        <input type="radio" value="close" id="close" v-model="sortBy" />
        <label class="pl-1" for="close">Close</label>
      </span>
      <span class="m-3">
        <input type="radio" value="high" id="high" v-model="sortBy" />
        <label class="pl-1" for="high">High</label>
      </span>
      <span class="m-3">
        <input type="radio" value="low" id="low" v-model="sortBy" />
        <label class="pl-1" for="low">Low</label>
      </span>
      <span class="m-3">
        <input type="radio" value="vol" id="volume" v-model="sortBy" />
        <label class="pl-1" for="volume">Volume</label>
      </span>
      <!-- for ascending and descending -->
      <div>
        <b class="mr-10">Which Method:</b>
        <span class="m-3">
          <input
            type="radio"
            value="ascending"
            id="ascending"
            v-model="sortMethod"
          />
          <label class="pl-1" for="ascending">Ascending</label>
        </span>
        <span class="m-3">
          <input
            type="radio"
            value="descending"
            id="descending"
            v-model="sortMethod"
          />
          <label class="pl-1" for="descending">Descending</label>
        </span>
      </div>
    </div>
    <div class="container flex items-center justify-center mt-10">
      <table width="60%">
        <tr v-once class="table-title">
          <td class="p-2">S.No</td>
          <td>Symbol</td>
          <td>Open %</td>
          <td>Close %</td>
          <td>High %</td>
          <td>Low %</td>
          <td>Volume %</td>
        </tr>
        <tr v-for="(result, index) in results" :key="result.symbol">
          <td>{{ index + 1 }}</td>
          <td>{{ result.symbol }}</td>
          <td :class="result.open > 0 ? 'stock-up' : 'stock-down'">
            {{ result.open }}%
          </td>
          <td :class="result.close > 0 ? 'stock-up' : 'stock-down'">
            {{ result.close }}%
          </td>
          <td :class="result.high > 0 ? 'stock-up' : 'stock-down'">
            {{ result.high }}%
          </td>
          <td :class="result.low > 0 ? 'stock-up' : 'stock-down'">
            {{ result.low }}%
          </td>
          <td :class="result.vol > 0 ? 'stock-up' : 'stock-down'">
            {{ result.vol }}%
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import TitleBar from "../../components/TitleBar.vue";
export default {
  components: { TitleBar },
  name: "ComparePercent",
  data() {
    return {
      initialDate: "",
      finalDate: "",
      sortBy: "open",
      sortMethod: "ascending",
      results: [],
    };
  },
  methods: {
    compare: async function () {
      let result = await this.$axios.get(
        `/general/compare-percent?initial=${this.initialDate}&final=${this.finalDate}`
      );
      if (result.data.status == 200) {
        this.results = result.data.data;
      }
    },
    sort: function () {
      this.results.sort((first, second) => {
        let firstData = +first[this.sortBy];
        let secondData = +second[this.sortBy];
        let sortMethod = this.sortMethod;
        if (firstData < secondData) {
          return sortMethod == "ascending" ? -1 : 1;
        } else if (firstData > secondData) {
          return sortMethod == "ascending" ? 1 : -1;
        }
        return 0;
      });
    },
  },
  mounted() {
    let final = new Date();
    let initial = new Date(final);
    initial.setDate(final.getDate() - 1);
    this.initialDate = initial.toISOString().slice(0, 10);
    this.finalDate = final.toISOString().slice(0, 10);
  },
  watch: {
    sortBy: {
      handler: function () {
        this.sort();
      },
    },
    sortMethod: {
      handler: function () {
        this.sort();
      },
    },
  },
};
</script>

<style>
td {
  border: 1px solid black;
  padding: 2px 5px;
}
</style>
