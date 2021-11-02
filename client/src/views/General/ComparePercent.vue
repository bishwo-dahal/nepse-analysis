<template>
  <div>
    <div>Comparing percentage</div>
    <label for="initialDate">
      Choose the initial Date <fa icon="calendar-alt"
    /></label>
    <input type="date" id="initialDate" v-model="initialDate" />
    <br />
    <label for="finalDate"
      >Choose the final Date <fa icon="calendar-alt"
    /></label>
    <input type="date" id="finalDate" v-model="finalDate" />
    <button class="bg-blue-700 button" @click="compare">Calculate</button>
    <table border="2">
      <tr v-once>
        <td>S.No</td>
        <td>Symbol</td>
        <td>Open</td>
        <td>Close</td>
        <td>High</td>
        <td>Low</td>
        <td>Volume</td>
      </tr>
      <tr v-for="(result, index) in results" :key="result.symbol">
        <td>{{ index + 1 }}</td>
        <td>{{ result.symbol }}</td>
        <td
          :class="result.open > 0 ? 'bg-yellow-500' : 'bg-red-800 text-white'"
        >
          {{ result.open }}%
        </td>
        <td
          :class="result.close > 0 ? 'bg-yellow-500' : 'bg-red-800 text-white'"
        >
          {{ result.close }}%
        </td>
        <td
          :class="result.high > 0 ? 'bg-yellow-500' : 'bg-red-800 text-white'"
        >
          {{ result.high }}%
        </td>
        <td :class="result.low > 0 ? 'bg-yellow-500' : 'bg-red-800 text-white'">
          {{ result.low }}%
        </td>
        <td :class="result.vol > 0 ? 'bg-yellow-500' : 'bg-red-800 text-white'">
          {{ result.vol }}%
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "ComparePercent",
  data() {
    return {
      initialDate: "",
      finalDate: "",
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
  },
  mounted() {
    let final = new Date();
    let initial = new Date(final);
    initial.setDate(final.getDate() - 1);
    this.initialDate = initial.toISOString().slice(0, 10);
    this.finalDate = final.toISOString().slice(0, 10);
  },
};
</script>

<style>
td {
  border: 1px solid black;
  padding: 2px 5px;
}
</style>
