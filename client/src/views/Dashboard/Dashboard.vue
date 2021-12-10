<template>
  <div>
    <div style="position: relative; height: 40vh; width: 98vw">
      <canvas id="stock-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      tradedInfo: [],
    };
  },
  methods: {
    fetchTraded: async function () {
      try {
        let tradedInfo = await this.$axios.get("/dashboard/");
        let traded = await tradedInfo.data;
        let tradedStatus = await traded.status;
        if (tradedStatus == 200) {
          let tradedResult = await traded.result;
          return tradedResult;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted: async function () {
    let tradedInfo = await this.fetchTraded();
    let labels = [];
    let turnover = [];
    let companies = [];
    let volume = [];
    tradedInfo.forEach((currentTrade) => {
      labels.push(currentTrade.date);
      turnover.push(currentTrade.turnover);
      companies.push(currentTrade.companies);
      volume.push(currentTrade.volume);
    });

    const ctx = document.getElementById("stock-chart").getContext("2d");
    let data = {
      labels: labels,
      datasets: [
        {
          label: "companies",
          data: companies,
          tension: 0.3,
          borderColor: "red",
          fill: true,
        },
        {
          label: "TurnOver",
          data: turnover,
          tension: 0.3,
          borderColor: "blue",
          fill: true,
        },
        {
          label: "Volume",
          data: volume,
          tension: 0.3,
          borderColor: "green",
          fill: true,
        },
      ],
    };
    console.log(tradedInfo);

    const config = {
      type: "line",
      data: data,
    };
    new Chart(ctx, config);
  },
};
</script>

<style scoped></style>
