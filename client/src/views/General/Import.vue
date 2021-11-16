<template>
  <div>
    <title-bar text="Import from Excel(General)" icon="file-import" />
    <div class="bg-yellow-500 shadow" v-if="response">
      <div>
        <h2 class="text-center">Updated companies are:</h2>
        <span
          class="bg-yellow-700 text-white rounded m-3"
          v-for="company in updated"
          :key="company"
        >
          {{ company }}
        </span>
      </div>
      <h2>Newly Created Companies are</h2>
      <span
        class="bg-yellow-700 text-white rounded m-3"
        v-for="company in created"
        :key="company"
      >
        {{ company }}
      </span>
    </div>
    <button class="bg-blue-700 button" @click="getGeneral">
      Refresh The Data
    </button>
    <div>
      <div class="m-4">
        <label for="date" class="text-yellow-500">Choose Date</label>
        <input type="date" id="date" v-model="date" />
      </div>
      <button class="bg-blue-900 button" @click="importGeneral">
        Import Data
      </button>
    </div>
    <div>
      <table v-html="htmlResult"></table>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
export default {
  name: "GeneralImport",
  components: {
    TitleBar,
  },
  data() {
    return {
      htmlResult: "",
      date: "",
      updated: [],
      created: [],
      response: false,
    };
  },
  methods: {
    getGeneral: async function () {
      let result = await this.$axios.get("/general/html");
      result = result.data.substring(90);
      this.htmlResult = result.substring(0, result.length - 22);
    },
    importGeneral: async function () {
      let otherInfo = { date: this.date };
      let result = await this.$axios.post("/general/import", otherInfo);
      this.htmlResult = "";
      if (result.data.status == 200) {
        this.response = true;
        this.updated = result.data.updated;
        this.created = result.data.created;
        alert("Your data was imported successfully");
      } else if (result.data.status == 400) {
        this.response = false;
        let err = result.data.errors;
        // let err = new String[result.data.errors.length]();
        // err.concat(err);
        alert("Cannnot import DATA 😎🤢\n" + err[0]);
      }
    },
  },
  mounted() {
    this.date = new Date().toISOString().slice(0, 10);
    this.getGeneral();
  },
};
</script>

<style>
table > tbody > tr:nth-child(-n + 1) {
  background-color: brown;
  color: white;
  padding: 3px;
}
table > tbody > tr :nth-of-type(2) {
  background-color: rgb(87, 38, 38);
  color: white;
}

table > tbody > tr,
table > tbody > tr > td {
  border: 1px solid black;
}
</style>
