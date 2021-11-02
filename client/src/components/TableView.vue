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
          <td :class="data[titleValues[index]] > 0 ? 'stock-up' : 'stock-down'">
            {{ data[titleValues[index]] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  prps: {
    titles: {
      type: Array,
      required: true,
    },
    datas: {
      type: Array,
      required: true,
    },
    titleValues: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
