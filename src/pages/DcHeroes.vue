<template>
    <div class="m-auto">
    <h1 class="text-2xl text-center">DC Heores {{heroCount}}</h1>
    <ul>
      <li class="flex justify-between" v-for="(hero, index) in heroes" :key="hero.name">
        <div>
          {{hero.name}}
        </div>
        <button type="button" @click="removeHero(index)">x</button>
      </li>
    </ul>
    <form class="mt-10" @submit.prevent="addHero">
      <input class="border rounded" v-model="heroName" placeholder="Type hero name"/>
      <button 
      class="border rounded bg-gradient-to-r from-red-700 to-pink-500 text-white"
      type="submit">Add Hero</button>
    </form>
    </div>
</template>

<script>
export default {
    computed: {
      heroCount() {
        return this.heroes.length;
      },
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
    methods: {
      addHero() {
        if(this.heroName !== '') {
          this.heroes.unshift({name: this.heroName});
          this.heroName = '';
        }
      },
      removeHero(index) {
        this.heroes = this.heroes.filter((heror, i) => i !== index)
      }
    },
    data() {
      return {
        heroName: '',
        heroes: [{name: 'Flash'}, {name: 'SuperMan'}, {name: 'Arrow'}, {name: 'Batman'}]
      }
    }
}
</script>