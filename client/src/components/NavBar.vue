<template>
  <div>
    <nav class="flex bg-white shadow-lg items-center">
      <div class="text-lg text-blue-800 ml-2 mr-2">Ultimate Nepse Analysis</div>
      <div class="navbar">
        <router-link to="/dashboard"
          >Dashboard <fa icon="columns" />
        </router-link>
        <div class="subnav">
          <button class="subnavbtn">General <fa icon="chevron-down" /></button>
          <div class="subnav-content">
            <router-link to="/general/import"
              >Import <fa icon="file-import"
            /></router-link>
            <router-link to="/general/delete-last-traded"
              >Delete Data ! <fa icon="trash"
            /></router-link>
            <router-link to="/general/compare-percent">
              Compare Percentage <fa icon="percentage"
            /></router-link>
            <router-link to="/general/compare-weekly-data">
              Compare Weekly Data <fa icon="percentage"
            /></router-link>
            <router-link to="/general/compare-weekly-percent">
              Compare Weekly Percentage <fa icon="percentage"
            /></router-link>
          </div>
        </div>
        <div class="subnav">
          <button class="subnavbtn">
            Services <i class="fa fa-caret-down"></i>
          </button>
          <div class="subnav-content">
            <a href="#bring">Bring</a>
            <a href="#deliver">Deliver</a>
            <a href="#package">Package</a>
            <a href="#express">Express</a>
          </div>
        </div>
        <div class="subnav">
          <button class="subnavbtn">
            Companies <i class="fa fa-caret-down"></i>
          </button>
          <div class="subnav-content">
            <a href="/company/update">Update Company</a>
            <a href="#link2">Link 2</a>
            <a href="#link3">Link 3</a>
            <a href="#link4">Link 4</a>
          </div>
        </div>
        <router-link to="/about">About</router-link>
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
  methods: {},
  mounted: function () {},
};
</script>

<style scoped>
/* The navigation menu */
.navbar {
  overflow: hidden;
}

/* Navigation links */
.navbar a {
  float: left;
  font-size: 16px;
  color: rgba(31, 41, 55);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* The subnavigation menu */
.subnav {
  float: left;
  overflow: hidden;
}

/* Subnav button */
.subnav .subnavbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: rgba(31, 41, 55);
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  border-bottom: 5px solid white;
}

.navbar a:hover,
.subnavbtn:hover {
  color: green;
  border-bottom: 5px solid rgb(7, 202, 7);
}

/* Style the subnav content - positioned absolute */
.subnav-content {
  display: none;
  position: absolute;
  left: auto;
  margin-left: 15px;
  width: 100%;
  z-index: 10;
  box-shadow: 10px 10px 197px -25px rgba(0, 0, 0, 0.81);
}

/* Style the subnav links */
.subnav-content a {
  color: black;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.9);
}

/* Add a grey background color on hover */
.subnav-content a:hover {
  background-color: #eee;
  color: black;
}

/* When you move the mouse over the subnav container, open the subnav content */
.subnav:hover .subnav-content {
  width: auto;
  display: grid;
}
</style>
