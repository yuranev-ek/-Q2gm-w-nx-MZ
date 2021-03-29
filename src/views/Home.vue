<template>
  <div class="container mx-auto px-4">
    <base-table :rows="bigData" :columns="clientTableColumns">
      <template v-slot:selectedRow="{ selectedRow }">
        <div class="flex flex-col">
          <p class="w-full mb-2">
            Выбран пользователь:
            <b>{{ selectedRow.firstName }} {{ selectedRow.lastName }}</b>
          </p>
          <textarea
            :value="selectedRow.description"
            class="w-full p-3 mb-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
            readonly
          ></textarea>
          <template v-if="selectedRow.address">
            <p class="w-full mb-2">
              Адрес проживания:
              <b>{{ selectedRow.address.streetAddress }}</b>
            </p>
            <p class="w-full mb-2">
              Город:
              <b>{{ selectedRow.address.city }}</b>
            </p>
            <p class="w-full mb-2">
              Провинция/штат:
              <b>{{ selectedRow.address.state }}</b>
            </p>
            <p class="w-full mb-2">
              Индекс:
              <b>{{ selectedRow.address.zip }}</b>
            </p>
          </template>
        </div>
      </template>
    </base-table>
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
      selectedRow: null,
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
