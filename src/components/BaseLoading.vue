<template>
  <div class="flex justify-center">
    <div
      class="bg-gray-50 font-bold py-3 px-5 flex w-full justify-center text-blue-700"
      v-if="loading"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke-width="4"
          fill="white"
        ></circle>
        <path
          class="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseLoading",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Loading",
    },
  },
};
</script>
