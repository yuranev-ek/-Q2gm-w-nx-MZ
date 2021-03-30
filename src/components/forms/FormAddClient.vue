<template>
  <form @submit.prevent="submit">
    <p class="font-bold uppercase text-md text-center">{{ title }}</p>
    <base-input
      v-for="field of fields"
      :key="field.key"
      v-model="formValues[field.key]"
      :type="field.type"
      class="mb-4"
      :label="field.label"
    />
    <button
      class="mx-auto block bg-blue-700 text-white border border-blue-700 font-bold py-3 px-5 rounded-lg"
      type="submit"
    >
      {{ buttonSubmitLabel }}
    </button>
  </form>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
export default {
  name: "FormAddClient",
  components: {
    BaseInput,
  },
  props: {},
  data() {
    return {
      // Над таблицей должна присутствовать кнопка добавить, по нажатии на которую выпадает форма добавления ряда. Для каждого поля необходимо реализовать валидацию (id — число, firstName, lastName — буквы, email — формат email, phone — маска телефона).
      formValues: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
      },
      fields: [
        {
          key: "id",
          type: "number",
          value: null,
          label: "ID",
        },
        {
          key: "firstName",
          type: "text",
          value: null,
          label: "First Name",
        },
        {
          key: "lastName",
          type: "text",
          value: null,
          label: "Last Name",
        },
        {
          key: "email",
          type: "email",
          value: null,
          label: "Email",
        },
        {
          key: "phone",
          type: "tel",
          value: null,
          label: "Phone",
        },
      ],
      title: "Add Client",
      buttonSubmitLabel: "Submit",
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.formValues);
    },
  },
};
</script>
