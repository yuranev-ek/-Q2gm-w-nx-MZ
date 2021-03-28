<template>
  <div></div>
</template>

<script>
import { getSmallData, getBigData } from "@/api";
export default {
  name: "Home",
  mounted() {
    this.getSmallData();
    this.getBigData();
  },
  data() {
    return {
      smallData: [],
      bigData: [],
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
