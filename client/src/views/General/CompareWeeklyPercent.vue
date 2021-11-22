<template>
  <div>
    <navigation-container>
      <template #title>
        <title-bar text="Weekly Percentage Compare" icon="percentage" />
      </template>
      <template #middle> Middle section </template>
    </navigation-container>
  </div>
</template>

<script>
import NavigationContainer from "../../components/NavigationContainer.vue";
import TitleBar from "../../components/TitleBar.vue";
export default {
  name: "CompareWeeklyPercent",
  components: {
    TitleBar,
    NavigationContainer,
  },
};
</script>

<style scoped></style>
