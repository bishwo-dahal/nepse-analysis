<template>
  <div>
    <nav class="flex items-center justify-evenly flex-wrap bg-yellow-500 p-6">
      <div
        class="
          flex
          items-center
          justify-items-start
          flex-no-shrink
          text-white
          mr-6
        "
      >
        <span class="font-semibold text-xl tracking-tight"
          >Ultimate Nepse analaysis</span
        >
      </div>
      <div class="block sm:hidden">
        <button
          @click="toggle"
          class="
            flex
            items-center
            px-3
            py-2
            border
            rounded
            text-teal-lighter
            border-teal-light
            hover:text-white hover:border-white
          "
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        :class="open ? 'block' : 'hidden'"
        class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-lg sm:flex-grow">
          <div class="btn-navigation">
            <router-link to="/dashboard">Dashboard</router-link>
          </div>
          <div class="flex">
            <div class="btn-navigation">General</div>
            <div class="hidden">
              <span>First</span>
              <span>Second</span>
              <span>Third</span>
            </div>
          </div>
          <div class="btn-navigation">
            <router-link to="/portfolio"> Portfolio </router-link>
          </div>
          <div class="btn-navigation">
            <router-link to="/blog"> More</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style scoped></style>
