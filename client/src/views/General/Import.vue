<template>
  <div>
    <navigation-container>
      <template #title>
        <title-bar text="Import From excel" icon="file-import" />
      </template>
      <template #left>
        <h3 class="p-3 text-black font-bold">Recent Imported Dates</h3>
        <span
          class="text-white bg-blue-700 font-sans p-1 border-2 border-white"
          v-for="date in recentDates"
          :key="date"
        >
          {{ date }}
        </span>
      </template>
      <template #middle>
        <div class="grid">
          <div class="m-4">
            <label for="date" class="text-yellow-500">Choose Date</label>
            <input type="date" id="date" v-model="date" />
            <button class="bg-blue-700 button ml-2" @click="getGeneral">
              Refresh The Data
            </button>
          </div>
          <button class="bg-blue-900 button w-au" @click="importGeneral">
            Import Data
          </button>
        </div>
      </template>

      <template #right>
        <div
          class="flex overflow-x-hidden overflow-y-scroll w-full justify-around"
          style="height: 200px"
          v-if="response"
        >
          <div class="grid w-full">
            <h2 class="bg-blue-700 pt-1 text-white sticky top-0">Updated</h2>
            <span
              class="bg-yellow-700 text-white rounded m-1 p-2"
              v-for="company in updated"
              :key="company"
            >
              {{ company }}
            </span>
          </div>

          <div class="grid w-full">
            <h2 class="bg-blue-700 pt-1 text-white sticky top-0">Created</h2>
            <span
              class="bg-yellow-700 text-white rounded m-1 p-2"
              v-for="company in created"
              :key="company"
            >
              {{ company }}
            </span>
          </div>
        </div>
      </template>
    </navigation-container>

    <div>
      <table v-html="htmlResult"></table>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import NavigationContainer from "@/components/NavigationContainer.vue";
export default {
  name: "GeneralImport",
  components: {
    TitleBar,
    NavigationContainer,
  },
  data() {
    return {
      htmlResult: "",
      date: "",
      updated: [],
      created: [],
      response: false,
      recentDates: [],
    };
  },
  methods: {
    getGeneral: async function () {
      let result = await this.$axios.get("/general/html");
      result = result.data.substring(90);
      this.htmlResult = result.substring(0, result.length - 22);
    },
    fireAlert(message) {
      this.$swal({
        icon: "warning",
        iconColor: "red",
        title: "Ooops...❌",
        text: message,
        showConfirmButton: true,
        confirmButtonColor: "red",
      });
    },
    fireSuccess(message) {
      this.$swal({
        icon: "success",
        iconColor: "blue",
        title: "Superb!!!",
        text: message,
        showConfirmButton: true,
        confirmButtonText: "Close window",
      });
    },
    getDate: async function () {
      let recentDatas = await this.$axios.get("/general/tradedDate");
      if (recentDatas.data.status == 200) {
        this.recentDates = recentDatas.data.result;
      }
    },
    importGeneral: async function () {
      let otherInfo = { date: this.date };
      let result = await this.$axios.post("/general/import", otherInfo);
      this.htmlResult = "";
      if (result.data.status == 200) {
        this.response = true;
        this.updated = result.data.updated;
        this.created = result.data.created;
        let successMessage = this.updated.length + " are updated\n";
        successMessage +=
          this.created.length + ` are created for 📅${this.date}`;
        this.fireSuccess(successMessage);
      } else if (result.data.status == 400) {
        this.response = false;
        let err = result.data.errors;
        // let err = new String[result.data.errors.length]();
        // err.concat(err);
        this.fireAlert(err[0]);
      }
      this.getDate();
    },
  },
  mounted() {
    this.date = new Date().toISOString().slice(0, 10);
    this.getGeneral();
    this.getDate();
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
