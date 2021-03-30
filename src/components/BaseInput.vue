<template>
  <div class="relative">
    <label>
      <span v-if="label" class="pl-3">{{ label }}</span>
      <input
        :value="value"
        :type="type"
        class="w-full p-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
        :placeholder="placeholder"
        @input="onInput"
        :disabled="disabled"
        :class="{
          'border-red-700': error,
        }"
      />
      <span
        v-if="error"
        class="absolute left-0 -bottom-4 text-xs text-red-700 pl-3"
        >{{ error }}</span
      >
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  },
  model: {
    prop: "value",
    event: "on-input",
  },
  methods: {
    onInput(event) {
      this.$emit("on-input", event.target.value);
    },
  },
};
</script>
