<template>
  <div class="flex flex-col items-center my-8">
    <div class="flex text-gray-700 w-full justify-center">
      <button
        class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200"
        :disabled="isFirstPage"
        :class="{
          'opacity-30': isFirstPage,
        }"
        @click="onClickPage(page - 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left w-6 h-6"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="flex h-12 font-medium rounded-full bg-gray-200">
        <button
          @click="onClickPage(1)"
          v-if="!isFirstPage"
          class="h-12 w-12 md:flex justify-center items-center leading-5 transition duration-150 ease-in rounded-full"
        >
          1
        </button>
        <button
          disabled
          class="h-12 w-12 md:flex justify-center items-center leading-5 transition duration-150 ease-in rounded-full bg-gray-600 text-white"
        >
          {{ page }}
        </button>
        <button
          @click="onClickPage(pagesNumber)"
          v-if="!isLastPage"
          class="h-12 w-12 md:flex justify-center items-center leading-5 transition duration-150 ease-in rounded-full"
        >
          {{ pagesNumber }}
        </button>
      </div>
      <button
        @click="onClickPage(page + 1)"
        class="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200"
        :disabled="isLastPage"
        :class="{
          'opacity-30': isLastPage,
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-right w-6 h-6"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    pagesNumber: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    isFirstPage() {
      return this.page === 1;
    },
    isLastPage() {
      return this.page === this.pagesNumber;
    },
  },
  methods: {
    onClickPage(page) {
      this.$emit("on-change-page", page);
    },
  },
};
</script>
