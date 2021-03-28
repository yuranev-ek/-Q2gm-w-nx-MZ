<template>
  <div class="container mx-auto px-4">
    <base-table :rows="smallData" :columns="clientTableColumns" />
  </div>
</template>

<script>
import { getSmallData, getBigData } from "@/api";
import BaseTable from "@/components/BaseTable.vue";
export default {
  name: "Home",
  components: {
    BaseTable,
  },
  mounted() {
    this.getSmallData();
    this.getBigData();
  },
  data() {
    return {
      smallData: [],
      bigData: [],
      clientTableColumns: [
        {
          key: "id",
          label: "ID",
          visible: true,
        },
        {
          key: "firstName",
          label: "First Name",
          visible: true,
        },
        {
          key: "lastName",
          label: "Last Name",
          visible: true,
        },
        {
          key: "email",
          label: "Email",
          visible: true,
        },
        {
          key: "phone",
          label: "Phone",
          visible: true,
        },
        {
          key: "address",
          label: "Address",
          visible: false,
        },
        {
          key: "description",
          label: "Description",
          visible: false,
        },
      ],
    };
  },
  methods: {
    async getSmallData() {
      try {
        this.smallData = await getSmallData();
      } catch (error) {
        console.log(error);
      }
    },
    async getBigData() {
      try {
        this.bigData = await getBigData();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
