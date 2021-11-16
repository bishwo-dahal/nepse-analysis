<template>
  <div>
    <div class="grid container shadow-md mb-3 pb-2">
      <!-- main title goes here -->
      <slot name="title">
        <title-bar text="Title is here" icon="file-import" />
      </slot>

      <div class="flex justify-around">
        <div class="flex justify-items-start w-1/4">
          <div class="grid">
            <!-- left portion goes here -->
            <slot name="left"> LEFT </slot>
          </div>
        </div>
        <!-- for middle option -->
        <div class="flex items-center justify-center w-full">
          <div class="grid">
            <slot name="middle">MID</slot>
          </div>
        </div>
        <!-- for right portion -->
        <div class="flex items-center justify-center w-1/4">
          <slot name="right"> RIGHT </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "./TitleBar.vue";
export default {
  name: "NavigationContainer",
  components: {
    TitleBar,
  },
};
</script>
