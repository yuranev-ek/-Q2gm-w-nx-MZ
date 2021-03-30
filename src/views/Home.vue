<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center">
      <button
        class="bg-green-700 text-white border border-green-700 font-bold py-3 px-5 rounded-lg"
        type="button"
        @click="togglePopupAddClient(true)"
      >
        {{ buttonAddClientLabel }}
      </button>
      <div class="flex">
        <label class="flex items-center mr-4">
          Small Data
          <input type="radio" v-model="dataSize" value="small" class="ml-2" />
        </label>
        <label class="flex items-center">
          Big Data
          <input type="radio" v-model="dataSize" value="big" class="ml-2" />
        </label>
      </div>
    </div>
    <base-table
      :rows="clientData"
      :columns="clientTableColumns"
      :loading="loading"
    >
      <template v-slot:selectedRow="{ selectedRow }">
        <div class="flex flex-col">
          <p class="w-full mb-2">
            Выбран пользователь:
            <b>{{ selectedRow.firstName }} {{ selectedRow.lastName }}</b>
          </p>
          <textarea
            v-if="selectedRow.description"
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
    <base-popup @close="togglePopupAddClient" :visible="popupAddClientVisible">
      <slot>
        <form-add-client @submit="addClient" />
      </slot>
    </base-popup>
  </div>
</template>

<script>
// todo: create component: BaseButton (color, type, label)
import { getSmallData, getBigData } from "@/api";
import BaseTable from "@/components/BaseTable.vue";
import BasePopup from "@/components/BasePopup.vue";
import FormAddClient from "@/components/forms/FormAddClient.vue";
export default {
  name: "Home",
  components: {
    BaseTable,
    BasePopup,
    FormAddClient,
  },
  data() {
    return {
      dataSize: null,
      clientData: [],
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
      loading: false,
      buttonAddClientLabel: "Add client",
      popupAddClientVisible: false,
    };
  },
  methods: {
    async getClients() {
      try {
        this.clientData = [];
        this.loading = true;
        this.clientData =
          this.dataSize === "small" ? await getSmallData() : await getBigData();
      } catch (error) {
        alert("Error loading data");
      } finally {
        this.loading = false;
      }
    },
    togglePopupAddClient(bool) {
      this.popupAddClientVisible = bool;
    },
    addClient(client) {
      this.clientData = [client, ...this.clientData];
      this.togglePopupAddClient(false);
    },
  },
  watch: {
    dataSize() {
      this.getClients();
    },
  },
};
</script>
