<template>
  <div class="m-auto">
    <h1 class="text-2xl text-center">DC Heores {{ heroCount }}</h1>
    <ul>
      <li
        class="flex justify-between"
        v-for="(hero, index) in heroes"
        :key="hero.name"
      >
        <div>
          {{ hero.name }}
        </div>
        <button type="button" @click="removeHero(index)">x</button>
      </li>
    </ul>
    <form class="mt-10" @submit.prevent="addHero">
      <input
        class="border rounded"
        v-model="heroName"
        ref="heroNameRef"
        placeholder="Type hero name"
      />
      <button
        class="border rounded bg-gradient-to-r from-red-700 to-pink-500 text-white"
        type="submit"
      >
        Add Hero
      </button>
    </form>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";

export default {
  setup() {
    const heroNameRef = ref("");
    const heroName = ref("");
    const heroes = ref([
      { name: "Flash" },
      { name: "SuperMan" },
      { name: "Arrow" },
      { name: "Batman" },
    ]);

    const heroCount = computed(() => {
      return heroes.value.length;
    });

    onMounted(() => {
      heroNameRef.value.focus();
    });

    function addHero() {
      if (heroName.value !== "") {
        heroes.value.unshift({ name: heroName.value });
        heroName.value = "";
      }
    }

    function removeHero(index) {
      heroes.value = heroes.value.filter((heror, i) => i !== index);
    }

    return { heroes, heroName, heroNameRef, heroCount, addHero, removeHero };
  },
  computed: {
    // fullname: {
    //   get() {
    //     return `${this.fname} ${this.lname}`;
    //   },
    //   set(fullname) {
    //     const names = fullname.split(" ");
    //     this.fname = names[0];
    //     this.lname = names[1];
    //   }
    // }
  },
};
</script>
