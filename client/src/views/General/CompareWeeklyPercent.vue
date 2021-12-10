<template>
  <div>
    <navigation-container>
      <template #title>
        <title-bar text="Compare Weekly Data" icon="percentage" />
      </template>
      <template #middle>
        <h1 class="text-2xl">Select Values</h1>
        <div class="inputs">
          <span>
            <input
              type="radio"
              id="open"
              value="open"
              name="type"
              v-model="type"
            />
            <label for="open">Open</label>
          </span>
          <span>
            <input
              type="radio"
              id="close"
              value="close"
              name="type"
              v-model="type"
            />
            <label for="close">Close</label>
          </span>
          <span>
            <input
              type="radio"
              id="high"
              value="high"
              name="type"
              v-model="type"
            />
            <label for="high">High</label>
          </span>
          <span>
            <input
              type="radio"
              id="low"
              value="low"
              name="type"
              v-model="type"
            />
            <label for="low">Close</label>
          </span>
          <span>
            <input
              type="radio"
              id="vol"
              value="vol"
              name="type"
              v-model="type"
            />
            <label for="vol">Volume</label>
          </span>
        </div>
      </template>
    </navigation-container>
    <table-view
      :titles="tableTitles"
      :datas="tableDatas"
      :postValues="postValues"
      :width="70"
    />
  </div>
</template>

<script>
import NavigationContainer from "../../components/NavigationContainer.vue";
import TitleBar from "../../components/TitleBar.vue";
import TableView from "../../components/TableView.vue";

export default {
  name: "CompareWeeklyPercent",
  components: {
    TitleBar,
    NavigationContainer,
    TableView,
  },
  data() {
    return {
      tableTitles: [],
      tableDatas: [],
      postValues: ["", "%", "%", "%", "%", "%", "%", "%"],
      type: "open",
      totalData: [],
    };
  },
  methods: {
    generateValid: function () {
      let datas = this.totalData;
      let finalResult = [];
      let ctr = 0;
      for (let data of Object.values(datas)) {
        let eachObject = {};
        let second = data.map((curr) => {
          return { symbol: curr.symbol, type: curr[this.type] };
        });

        eachObject["symbol"] = Object.keys(datas)[ctr];
        for (let c = 0; c < second.length; c++) {
          eachObject[this.type + (c + 1)] = second[c]["type"];
        }
        finalResult.push(eachObject);
        ctr++;
      }
      this.tableDatas = finalResult;
    },
    getData: async function () {
      try {
        let weeklyCompare = await this.$axios.get(
          "/general/compare-weekly-percent"
        );
        if (weeklyCompare.data.status == 200) {
          let result = await weeklyCompare.data.result.values;
          let dates = await weeklyCompare.data.result.dates;

          for (let ctr = 0; ctr < (await dates.length) - 1; ctr++) {
            const current = await dates[ctr];
            const next = await dates[ctr + 1];
            this.tableTitles.push(`${current.substr(5)}/${next.substr(5)}`);
          }

          this.tableTitles.unshift("Symbol");
          this.totalData = result;
          this.generateValid();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getData();
  },
  watch: {
    type: function () {
      this.generateValid();
    },
  },
};
</script>

<style scoped>
.inputs > span {
  margin: 12px;
}
.inputs > span > label {
  padding-left: 5px;
}
</style>
