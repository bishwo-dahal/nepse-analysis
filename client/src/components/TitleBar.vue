<template>
  <div class="flex justify-center m-3 text-3xl">
    <fa v-if="typeof icon != 'undefined'" :icon="icon" class="mr-3" />
    <h1 class="text-lg capitalize">{{ text }}</h1>
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  props: ["text", "icon"],
};
</script>
