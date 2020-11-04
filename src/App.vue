<template>
  <AppHeader/>
  <div class="w-full flex">
    <Calender/>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader';
  import Calender from './components/Calender';

  export default {
    components: { AppHeader, Calender },
  }
</script>