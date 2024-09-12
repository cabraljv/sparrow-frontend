<template>
  <v-app-bar app>
    <logo />
    <v-spacer></v-spacer>
    <v-text-field
      v-model="search"
      append-inner-icon="mdi-magnify"
      @click:append-inner="searchMedia"
      @keydown.enter="searchMedia"
      label="Search"
      variant="outlined"
      single-line
      density="compact"
      hide-details
    ></v-text-field>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import Logo from "./LogoSparrow.vue";

export default {
  components: { Logo },
  props: {
    onSearch: {
      type: Function,
      required: true,
    },
  },
  name: "NavBar",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchMedia() {
      this.onSearch(this.search);
    },
  },
};
</script>

<style></style>
