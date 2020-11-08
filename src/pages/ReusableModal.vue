<template>
  <div class="m-auto">
    <h1 class="text-2xl my-5">Re-usable Modal</h1>

    <Modal v-if="isModalOpen" @close="isModalOpen = false">
      <h1>Hello Africa!</h1>
    </Modal>
    <button @click="isModalOpen = true">Open Modal</button>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import { ref } from "vue";

export default {
  components: { Modal },
  setup() {
    const isModalOpen = ref(false);

    return { isModalOpen };
  },
};
</script>

<style></style>
