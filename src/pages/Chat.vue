<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-2xl text-center">Real Time Chat</h1>

      <div class="border rounded-lg">
        <div class="h-64 p-2">
          <div
            v-for="chat in state.chats"
            :key="chat.message"
            class="w-full"
            :class="chat.userId === state.userId ? 'text-right' : ''"
          >
            {{ chat.message }}
          </div>
        </div>

        <div class="h-8 p-2">
          <input
            v-model="state.message"
            placeholder="Start typing..."
            class="p-1 border rounded shadow"
            @keydown.enter="addMessage()"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive } from "vue";
import firebase, { chatsRef } from "../utilities/firebase";

export default {
  setup() {
    const state = reactive({
      chats: [],
      message: "",
      userId: null,
    });

    onMounted(async () => {
      chatsRef.on("child_added", (snapshot) => {
        state.userId = firebase.auth().currentUser.uid;
        state.chats.push({ userId: snapshot.key, ...snapshot.val() });
      });
    });

    function addMessage() {
      const newChat = chatsRef.push();
      newChat.set({ userId: state.userId, message: state.message });
      state.message = "";
    }

    return { state, addMessage };
  },
};
</script>

<style></style>
