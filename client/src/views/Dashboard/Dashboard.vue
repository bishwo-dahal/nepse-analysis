<template>
  <div>
    <canvas id="stock-chart" class="w-full"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Dashboard",
  components: {},
  mounted() {
    const ctx = document.getElementById("stock-chart").getContext("2d");
    const config = {
      type: "line",
    };
    new Chart(ctx, config);
  },
};
</script>

<style scoped></style>
