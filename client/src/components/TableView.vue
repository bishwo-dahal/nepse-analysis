<template>
  <div>
    <div class="container flex items-center justify-center mt-10">
      <table width="60%">
        <tr v-once class="table-title">
          <td class="p-2">S.No</td>
          <td v-for="(title, index) in titles" :key="index">
            {{ title }}
          </td>
        </tr>
        <tr v-for="(data, index) in datas" :key="data.symbol">
          <td>{{ index + 1 }}</td>
          <td
            v-for="(currData, index) in Object.values(data)"
            :class="calcClass(currData)"
            :key="index"
          >
            {{ currData }}{{ postValues[index] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      required: true,
    },
    datas: {
      type: Array,
      required: true,
    },
    postValues: {
      type: Array,
      required: true,
    },
  },
  methods: {
    calcClass: function (val) {
      if (typeof val == "undefined" || isNaN(+val)) {
        return "stock-blank";
      }
      if (isNaN(+val)) {
        return "stock-blank";
      }
      if (+val > 0) {
        return "stock-up";
      } else {
        return "stock-down";
      }
    },
  },
};
</script>

<style scoped></style>
