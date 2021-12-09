<template>
  <div>
    <navigation-container>
      <template #title>
        <title-bar icon="trash" text="Delete Last Traded Data" />
      </template>
      <template #left><span /> </template>
      <template #middle>
        <span
          >Last Traded Date is <b>{{ date }}</b></span
        >
        <span style="height: 30px"></span>
        <button class="button bg-blue-700" @click="deleteData">
          Delete For this Date
        </button>
      </template>
      <template #right><span /> </template>
    </navigation-container>
  </div>
</template>

<script>
import NavigationContainer from "../../components/NavigationContainer.vue";
import TitleBar from "../../components/TitleBar.vue";
export default {
  name: "DeleteLastTraded",
  components: { NavigationContainer, TitleBar },
  data() {
    return {
      date: "",
    };
  },
  methods: {
    getLastDate: async function () {
      let recentDatas = await this.$axios.get("/general/tradedDate");
      if (recentDatas.data.status == 200) {
        this.date = recentDatas.data.result[0];
        console.log(this.date);
      }
    },
    deleteData: async function () {
      this.startFireAlert("Are you sure to delete Last date data???").then(
        async (result) => {
          if (result.isConfirmed) {
            await this.$axios.delete("/general/last-traded");
            this.startFireSuccess("Deleted Last Traded Data");
          }
        }
      );
    },
  },
  mounted() {
    this.getLastDate();
  },
};
</script>

<style scoped></style>
