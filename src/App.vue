<template>
<v-app>
  <router-view/>
</v-app>
</template>

<script>



export default {
  name: 'App',
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow: hidden; /* Prevents scroll on the whole app */
}

.v-application--wrap {
  min-height: 100vh; /* Ensures Vuetify content fits the viewport height */
  overflow-y: hidden; /* Hides vertical scroll */
}
</style>