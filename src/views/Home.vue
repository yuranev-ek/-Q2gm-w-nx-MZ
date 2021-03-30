<template>
  <div class="container mx-auto p-4">
    <button
      class="bg-green-700 text-white border border-green-700 font-bold py-3 px-5 rounded-lg"
      type="button"
      @click="togglePopupAddClient(true)"
    >
      {{ buttonAddClientLabel }}
    </button>
    <base-table
      :rows="bigData"
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
// todo: one array for data
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
  mounted() {
    // this.getSmallData();
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
      loading: false,
      buttonAddClientLabel: "Add client",
      popupAddClientVisible: false,
    };
  },
  methods: {
    async getSmallData() {
      try {
        this.loading = true;
        this.smallData = await getSmallData();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async getBigData() {
      try {
        this.loading = true;
        this.bigData = await getBigData();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    togglePopupAddClient(bool) {
      this.popupAddClientVisible = bool;
    },
    addClient(client) {
      this.bigData = [client, ...this.bigData];
      this.togglePopupAddClient(false);
    },
  },
};
</script>
