<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-2xl text-center">User Crud</h1>
      <div class="mt-10">
        <Create
          :isModalOpen="isModalOpen"
          :form="state.form"
          @add-new-user="addNewUser"
          @update-user="updateUser"
          @close-modal="isModalOpen = false"
        />
        <button
          class="px-2 py-1 rounded border my-4"
          @click="isModalOpen = true"
        >
          Add User
        </button>
        <table>
          <thead>
            <tr>
              <th class="px-4 py-2 border">ID</th>
              <th class="px-4 py-2 border">Avatar</th>
              <th class="px-4 py-2 border">Name</th>
              <th class="px-4 py-2 border">Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in state.users" :key="user.id">
              <td class="border px-4 py-2">{{ user._id }}</td>
              <td class="border px-4 py-2">
                <img
                  :src="user.avatar"
                  :alt="user.name"
                  width="50"
                  class="rounded-full"
                />
              </td>
              <td class="border px-4 py-2">{{ user.name }}</td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2">
                <button
                  class="px-2 py-1 mx-1 bg-red-800 rounded text-white"
                  @click="deleteUser(user._id)"
                >
                  Delete
                </button>
                <button
                  class="px-2 py-1 mx-1 bg-green-800 rounded text-white"
                  @click="editUser(user._id)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between">
          <button
            class="px-3 py-2 border rounded"
            @click="prev()"
            :disabled="state.users.page === 1"
            :class="state.users.page === 1 ? 'bg-gray-100' : 'hover:shadow'"
          >
            Prev
          </button>
          <button
            class="px-3 py-2 border rounded"
            @click="next()"
            :disabled="state.users.page === state.users.total_pages"
            :class="
              state.users.page === state.users.total_pages
                ? 'bg-gray-100'
                : 'hover:shadow'
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "../plugins/axios";
import Create from "../components/UserCrud/Create";

export default {
  components: { Create },
  setup() {
    const isModalOpen = ref(false);
    const state = reactive({
      users: [],
      form: {},
    });

    onMounted(async () => {
      const { data } = await axios.get(`/users`);
      state.users = data;
    });

    async function next() {
      const { data } = await axios.get(`/users?page=2`);
      state.users = data;
    }

    async function prev() {
      const { data } = await axios.get(`/users?page=1`);
      state.users = data;
    }

    async function deleteUser(id) {
      await axios.delete(`/users/${id}`);

      const list = state.users.filter((user) => user._id !== id);

      state.users = list;
    }

    function editUser(id) {
      const user = state.users.filter((user) => user._id == id)[0];

      console.log(user);
      console.log(user.email);

      state.form.email = user.email;
      state.form.name = user.name;
      state.form.avatar = user.avatar;
      state.form.id = user._id;

      isModalOpen.value = true;
    }

    function addNewUser(data) {
      state.users.push(data);
    }

    function updateUser(data) {
      const index = state.users.findIndex((obj) => obj._id === data.id);
      state.users[index].name = data.name;
      state.users[index].email = data.email;
      state.users[index].avatar = data.avatar;
    }

    return {
      state,
      next,
      prev,
      deleteUser,
      editUser,
      addNewUser,
      updateUser,
      isModalOpen,
    };
  },
};
</script>

<style></style>
