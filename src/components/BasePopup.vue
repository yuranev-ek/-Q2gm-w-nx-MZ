<template>
  <div
    class="absolute inset-0 bg-black bg-opacity-40 h-screen w-full flex justify-center items-center md:items-center"
    :class="{
      hidden: !visible,
    }"
  >
    <div
      id="modal"
      class="relative w-5/6 md:w-1/2 h-1/2 p-5 md:p-10 bg-white rounded shadow-lg duration-300"
    >
      <button
        @click="close"
        class="absolute top-3 right-3 bg-red-700 text-white border border-red-700 font-bold py-3 px-5 rounded-lg"
      >
        {{ buttonCloseLabel }}
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePopup",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      buttonCloseLabel: "Close",
    };
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    hideScroll() {
      document.body.style.overflow = "hidden";
    },
    resetScroll() {
      document.body.style.overflow = "auto";
    },
  },
  watch: {
    visible() {
      this.visible ? this.hideScroll() : this.resetScroll();
    },
  },
};
</script>
