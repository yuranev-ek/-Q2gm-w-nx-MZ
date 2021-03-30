<template>
  <form @submit.prevent="submit">
    <p class="font-bold uppercase text-md text-center">{{ title }}</p>
    <base-input
      v-for="field of fields"
      :key="field.key"
      v-model="formValues[field.key]"
      :type="field.type"
      class="mb-5"
      :label="field.label"
      v-mask="field.mask"
      :placeholder="field.placeholder"
      :error="errors[field.key]"
      @on-input="field.validate"
    />
    <button
      class="mx-auto block bg-blue-700 text-white border border-blue-700 font-bold py-3 px-5 rounded-lg"
      type="submit"
      :class="{
        'cursor-not-allowed': !unableSubmitButton,
      }"
      :disabled="!unableSubmitButton"
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
  computed: {
    formHasErrors() {
      return Object.values(this.errors).some((value) => value?.length);
    },
    formFilled() {
      return Object.values(this.formValues).every((value) => value?.length);
    },
    unableSubmitButton() {
      return !this.formHasErrors && this.formFilled;
    },
  },
  data() {
    return {
      formValues: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
      },
      errors: {},
      validate: {
        id: {
          regex: /^[0-9]+$/,
          error: "Only numbers",
        },
        firstName: {
          regex: /^[A-Za-z]+$/,
          error: "Only letters",
        },
        lastName: {
          regex: /^[A-Za-z]+$/,
          error: "Only letters",
        },
        email: {
          regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          error: "You have entered an invalid email address!",
        },
      },
      fields: [
        {
          key: "id",
          type: "number",
          label: "ID",
          placeholder: "Type ID",
          validate: (value) => {
            this.validateField(value, "id");
          },
        },
        {
          key: "firstName",
          type: "text",
          label: "First Name",
          placeholder: "Type a first name",
          validate: (value) => {
            this.validateField(value, "firstName");
          },
        },
        {
          key: "lastName",
          type: "text",
          label: "Last Name",
          placeholder: "Type a last name",
          validate: (value) => {
            this.validateField(value, "lastName");
          },
        },
        {
          key: "email",
          type: "email",
          label: "Email",
          placeholder: "Type an email",
          validate: (value) => {
            this.validateField(value, "email");
          },
        },
        {
          key: "phone",
          type: "tel",
          label: "Phone",
          mask: "(###)###-####",
          placeholder: "(111)111-1111",
          validate: () => {},
        },
      ],
      title: "Add Client",
      buttonSubmitLabel: "Submit",
    };
  },
  methods: {
    submit() {
      if (this.unableSubmitButton) {
        this.$emit("submit", this.formValues);
        this.clearForm();
      }
    },
    validateField(value, key) {
      let isValid = true;

      if (value) {
        const regex = this.validate[key].regex;
        isValid = regex.test(value);
      }

      this.$set(this.errors, key, !isValid ? this.validate[key].error : null);
    },
    clearForm() {
      this.formValues = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
      };
      this.errors = {};
    },
  },
};
</script>
