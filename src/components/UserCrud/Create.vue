<template>
  <teleport to="body">
    <Modal v-if="isModalOpen" @close="close()">
      <template #title>Add New User</template>
      <template #body>
        <form @submit.prevent="submit()">
          <div class="p-2">
            <label for="">Name</label>
            <input
              class="w-full p-2 rounded border"
              type="text"
              placeholder="User name"
              v-model="state.form.name"
            />
          </div>
          <div class="p-2">
            <label for="">Email</label>
            <input
              class="w-full p-2 rounded border"
              type="text"
              placeholder="User Email"
              v-model="state.form.email"
            />
          </div>
          <div class="p-2">
            <label for="">Avatar</label>
            <input
              class="w-full p-2 rounded border"
              type="text"
              placeholder="Avatar URL"
              v-model="state.form.avatar"
            />
          </div>
          <div class="p-2">
            <input
              class="w-full p-2 rounded border hover:bg-gray-300"
              type="submit"
              value="create"
              placeholder="Avatar URL"
            />
          </div>
        </form>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import { onUpdated, reactive } from "vue";
import axios from "../../plugins/axios";
import Modal from "../../components/Modal";

export default {
  components: { Modal },
  props: ["isModalOpen", "form"],
  emits: ["updateUser", "addNewUser", "closeModal", "close-modal"],
  setup(props, { emit }) {
    const state = reactive({
      users: [],
      form: {
        name: props.form.name,
        email: props.form.email,
        avatar: "",
        id: "",
      },
    });

    onUpdated(() => {
      state.form.email = props.form.email;
      state.form.name = props.form.name;
      state.form.avatar = props.form.avatar;
      state.form.id = props.form.id;
    });

    async function submit() {
      if (state.form.id) {
        await axios.put(`/users/${state.form.id}`, state.form);

        emit("update-user", state.form);
      } else {
        const { data } = await axios.post("/users", state.form);
        console.log(data);

        emit("add-new-user", data);
      }

      state.form.email = "";
      state.form.name = "";
      state.form.avatar = "";

      close(); //isModalOpen.value = false;
    }

    function close() {
      emit("close-modal");
    }

    return { state, submit, close };
  },
};
</script>

<style></style>
