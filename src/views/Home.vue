<template>

<v-app-bar app>
  <v-toolbar-title>Sparrow</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-text-field
    v-model="search"
    append-inner-icon="mdi-magnify"
    @click:append-inner="searchMovies"
    @keydown.enter="searchMovies"
    label="Search"
    variant="outlined"
    single-line
    density="compact"
    hide-details
  ></v-text-field>
  <v-spacer></v-spacer>
</v-app-bar>
<v-col class="mt-16">
  <v-row>
    <media-card @click="selectMovie(movie.imdbID)" v-for="movie of movies" :key="movie.imdbID" :cover="movie.poster" :title="movie.title"></media-card>
  </v-row>

</v-col>
</template>

<script>
import MediaCard from '@/components/MediaCard.vue'
import moviesApi from '@/services/moviesApi'

export default {
  components: {
    MediaCard,
  },
  name: 'Home',
  data() {
    return {
      search: '',
      movies: []
    }
  },

  methods: {
    async searchMovies() {
      console.log('Searching movies...')
      const response = await moviesApi.searchNMovies(this.search)
      console.log(response)
      this.movies = response
    },
    selectMovie(imdbID) {
      console.log('Selected movie:', imdbID)
      this.$router.push({ name: 'MoviePage', params: { id: imdbID } })
    }
  }
}
</script>

<style>

</style>