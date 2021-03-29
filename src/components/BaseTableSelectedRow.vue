<template>
  <div class="rounded-lg shadow-lg p-10">
    <slot></slot>
    <button
      @click="unselectRow"
      class="ml-auto block bg-red-700 text-white border border-red-700 font-bold py-3 px-5 rounded-lg"
    >
      {{ buttonLabelUnselect }}
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseTableSelectedRow",
  data() {
    return {
      buttonLabelUnselect: "Unselect",
    };
  },
  methods: {
    unselectRow() {
      this.$emit("unselect-row", null);
    },
  },
};
</script>
