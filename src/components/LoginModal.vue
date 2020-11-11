<template>
  <div v-if="isLoginOpen">
    <section
      @click="close()"
      class="z-20 w-screen h-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
          <div class="p-2 border">
            <h1 class="text-2xl text-center">Login</h1>
            <GoogleLogin @close-google-login="close()" />
            <form class="p-2" @submit.prevent="submit()">
              <div class="my-4">
                <label for="">Email or Username</label>
                <input
                  class="rounded shadow p-2 w-full"
                  type="text"
                  ref="emailRef"
                  v-model="email"
                  placeholder="Enter your email or username"
                />
              </div>
              <div class="my-4">
                <label for="">Password</label>
                <input
                  class="rounded shadow p-2 w-full"
                  type="password"
                  v-model="password"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  :disabled="isLoading"
                  :class="isLoading ? 'opacity-50' : ''"
                  class="w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-600 text-white p-2"
                >
                  <span v-if="!isLoading">Login</span>
                  <span v-else>Loading...</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../utilities/firebase";
import GoogleLogin from "../components/login/GoogleLogin";

export default {
  components: { GoogleLogin },
  computed: {
    isLoginOpen() {
      return this.$store.state.isLoginOpen;
    },
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.email = "";
          this.password = "";
          this.isLoading = false;
          this.close();
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
    close() {
      // this.$emit("close-login-modal");
      this.$store.commit("setLoginModal", false);
    },
  },
  mounted() {
    //this.$refs.emailRef.focus();
  },
};
</script>

<style></style>
