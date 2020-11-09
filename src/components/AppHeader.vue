<template>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2"
  >
    <router-link
      class="mx-2"
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      >{{ link.title }}</router-link
    >
    <button v-if="isLoggedIn" class="mx-2" @click="logout()">Logout</button>
    <button v-else class="mx-2" @click="$emit('open-login-modal')">
      Login
    </button>
  </nav>
</template>

<script>
import firebase from "../utilities/firebase";
export default {
  props: { isLoggedIn: { type: Boolean, required: true } },
  data() {
    return {
      links: [
        { title: "DC Heroes", to: "/dc-heroes" },
        { title: "Calendar", to: "/calendar" },
        { title: "Markdown", to: "/markdown" },
        { title: "Slider", to: "/slider" },
        { title: "Calculator", to: "/calculator" },
        { title: "Modal", to: "/reusable-modal" },
        { title: "Chat", to: "/chat" },
      ],
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
        })
        .catch((e) => {
          // An error happened.
          console.log(e);
        });
    },
  },
};
</script>
