<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';


export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
  box-sizing: border-box;
}

body {
  background-color: #1d1c1c;
}
</style>
