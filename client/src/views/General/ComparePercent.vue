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
    <table-view :titles="titles" :postValues="postValues" :datas="results" />
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import TableView from "@/components/TableView.vue";
export default {
  components: { TitleBar, TableView },
  name: "ComparePercent",
  data() {
    return {
      initialDate: "",
      finalDate: "",
      sortBy: "open",
      sortMethod: "ascending",
      results: [],
      postValues: ["", "%", "%", "%", "%", "%"],
      titles: ["Symbol", "Open %", "Close %", "High %", "Low %", "Volume %"],
    };
  },
  methods: {
    compare: async function () {
      let result = await this.$axios.get(
        `/general/compare-percent?initial=${this.initialDate}&final=${this.finalDate}`
      );
      if (result.data.status == 200) {
        this.results = result.data.data;
        console.log(this.results, "is the result passed");
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
