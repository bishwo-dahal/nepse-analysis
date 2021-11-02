<template>
  <div class="">
    <div id="nav">
      <nav-bar></nav-bar>
    </div>
    <router-view />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input[type="date"] {
  border-bottom: 2px solid rgb(68, 63, 63);
}
</style>
