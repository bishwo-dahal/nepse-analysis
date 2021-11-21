<template>
  <div>
    <select v-model="selectedCompany">
      <option v-for="company in companiesList" :key="company" :value="company">
        {{ company }}
      </option>
    </select>

    <div v-if="typeof companyData.s_no != 'undefined'" class="grid">
      <span class="bg-blue-700 p-3 mt-5 text-white"
        >{{ companyData.name }} ({{ companyData.symbol }})</span
      >
      <div
        class="text-white p-3 flex infos"
        :class="
          companyData.status == 'Active' ? 'bg-blue-600' : 'bg-yellow-700'
        "
      >
        <div class="grid">
          <h2 class="text-lg text-black">Status</h2>
          <span>{{ companyData.status }}</span>
        </div>
        <div class="grid">
          <h2 class="text-lg text-black">Sector</h2>
          <span>{{ companyData.sector }}</span>
        </div>
        <div class="grid">
          <h2 class="text-lg text-black">Instrument</h2>
          <span>{{ companyData.instrument }}</span>
        </div>
        <div class="grid">
          <h2 class="text-lg text-black">Website</h2>
          <span>{{ companyData.website }}</span>
        </div>
      </div>
      <div>{{ companyData.info }}</div>

      <!-- for update part -->
      <div>
        <select></select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Update",
  data() {
    return {
      companiesList: [],
      selectedCompany: "",
      companyData: {},
      newCompanyData: {
        status: "",
        sector: "",
        instrument: "",
        website: "",
      },
      validStatus: ["Active", "Suspended", "Delisted"],
      validInstrument: [
        "EQUITY",
        "NON-CONVERTIBLE DEBENTURES",
        "MUTUAL FUNDS",
        "PREFERENCE SHARES",
      ],
      validSectors: [
        "MICROFINANCE",
        "COMMERCIAL BANKS",
        "HYDRO POWER",
        "NON LIFE INSURANCE",
        "LIFE INSURANCE",
        "MANUFACTURING AND PROCESSING",
        "TRADINGS",
        "FINANCE",
        "HOTELS AND TOURISM",
        "INVESTMENT",
        "MUTUAL FUND",
        "DEVELOPMENT BANKS",
        "OTHERS",
      ],
    };
  },
  methods: {
    getCompanies: async function () {
      let companiesList = await this.$axios.get("/companies/name");
      let result = await companiesList.data.result;

      if (companiesList.data.status == 200) {
        this.companiesList = result;
      }
    },
    getCompany: async function () {
      let company = await this.$axios.get("/company/" + this.selectedCompany);
      let result = await company.data.result;

      if (company.data.status == 200) {
        this.companyData = result;
      }
    },
    fireSuccess: function (message) {
      this.$swal({
        icon: "success",
        iconColor: "blue",
        title: "Superb!!!",
        text: message,
        showConfirmButton: true,
        confirmButtonText: "Close window",
      });
    },
  },
  mounted: async function () {
    await this.getCompanies();
  },
  watch: {
    selectedCompany: async function () {
      await this.getCompany();
    },
  },
};
</script>

<style scoped>
.infos > div {
  padding: 4px;
  border: 1px solid black;
}
</style>
