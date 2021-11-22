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
          companyData.status.toUpperCase() == 'ACTIVE'
            ? 'bg-blue-600'
            : 'bg-yellow-700'
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
      <h2 class="text-2xl">Update Details</h2>
      <div class="update-section">
        <div class="flex justify-evenly">
          <div class="grid">
            <h2>Name</h2>
            <input
              v-model="newCompanyData.name"
              class="border-2 border-blue-500 p-2"
            />
          </div>
          <div class="grid">
            <h2>Status</h2>
            <select v-model="newCompanyData.status">
              <option v-for="status in validStatus" :key="status">
                {{ status }}
              </option>
            </select>
          </div>
          <div class="grid">
            <h2>Sector</h2>
            <select v-model="newCompanyData.sector">
              <option v-for="sector in validSectors" :key="sector">
                {{ sector }}
              </option>
            </select>
          </div>
          <div class="grid">
            <h2>Instrument</h2>
            <select v-model="newCompanyData.instrument">
              <option v-for="instrument in validInstrument" :key="instrument">
                {{ instrument }}
              </option>
            </select>
          </div>
          <div class="grid">
            <h2>Website</h2>
            <input
              v-model="newCompanyData.website"
              class="border-2 border-blue-500 p-2"
            />
          </div>
        </div>
        <textarea
          v-model="newCompanyData.info"
          class="w-full border-2 border-green-700 p-3 mt-5"
          style="height: 140px"
        ></textarea>

        <br />
        <button class="button bg-blue-800" @click="updateCompany">
          Update Company
        </button>
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
        name: "",
        status: "",
        sector: "",
        instrument: "",
        website: "",
        info: "",
      },
      validStatus: ["ACTIVE", "SUSPENDED", "DELISTED"],
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
      if (this.selectedCompany) {
        let company = await this.$axios.get("/company/" + this.selectedCompany);
        let result = await company.data.result;

        if (company.data.status == 200) {
          this.companyData = result;
          this.newCompanyData.name = result.name;
          this.newCompanyData.status = result.status.toUpperCase();
          this.newCompanyData.sector = result.sector.toUpperCase();
          this.newCompanyData.instrument = result.instrument.toUpperCase();
          this.newCompanyData.info = result.info;
        }
      }
    },
    updateCompany: async function () {
      let newCompany = this.newCompanyData;
      newCompany["symbol"] = this.companyData.symbol;
      let updating = await this.$axios.put(
        "/company/update/" + this.selectedCompany,
        newCompany
      );
      if (updating) {
        this.fireSuccess("You updated the company Successfully");
      }
      this.selectedCompany = "";
      this.companyData = {};
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
.update-section select {
  padding: 5px;
}
</style>
