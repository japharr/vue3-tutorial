<template>
  <AppHeader :isLoggedIn="isLoggedIn" @open-login-modal="isLoginOpen = true" />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <LoginModal v-if="isLoginOpen" @close-login-modal="isLoginOpen = false" />
  </teleport>
</template>

<script>
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";
import firebase from "./utilities/firebase";

export default {
  components: { AppHeader, LoginModal },
  data() {
    return {
      isLoginOpen: false,
      authUser: {},
      isLoggedIn: false,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.authUser = user;
        this.isLoggedIn = true;
      } else {
        // No user is signed in.
        this.authUser = {};
        this.isLoggedIn = false;
      }
    });
  },
};
</script>
