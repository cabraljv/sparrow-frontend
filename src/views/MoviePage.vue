<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card shaped>
          <v-img 
            :src="movie.cover" 
            class="white--text"
            height="400px"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>{{ movie.title }}</v-card-title>
          </v-img>
          <v-card-text>
            {{ movie.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="playMovie" :disabled="loadingPlayMovie" :loading="loadingPlayMovie">
              Play
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moviesApi from '@/services/moviesApi'
export default {
  name: 'MoviePage',
  data() {
    return {
      movie: {
        title: 'Inception',
        cover: 'https://example.com/inception-cover.jpg',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.'
      },
      loadingPlayMovie: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async playMovie() {
      // Implement functionality to play the movie
      console.log("Playing movie...");
      this.loadingPlayMovie = true

      const result = await moviesApi.startWatchMovie(this.$route.params.id)

      const verifyMovieIsReady = async () => {
        console.log('Verifying if movie is ready...')
        const ready = await moviesApi.getMovieStatusByM3u8(result.hash)
        if(ready) {
          this.$router.push({ name: 'Player', params: { id: result.hash } })
        } else {
          setTimeout(verifyMovieIsReady, 5000)
        }

      }

      verifyMovieIsReady()

    },
    async fetchData() {
      // Fetch movie data from the API
      console.log('Fetching movie data...')
      const id = this.$route.params.id
      const response = await moviesApi.getMovieById(id)
      console.log(response)
      this.movie.title = response.Title
      this.movie.cover = response.Poster
    }
  }
}
</script>

<style>
</style>
