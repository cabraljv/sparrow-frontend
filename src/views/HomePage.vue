<template>
  <navbar :onSearch="searchMovies"></navbar>
  <v-col class="mt-16">
    <v-row
      v-if="loadings.search"
      class="justify-center align-center"
      style="height: 100%"
    >
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          :size="70"
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else-if="errors.search">
      <v-alert dense outlined type="error">
        {{ errors.search }}
      </v-alert>
    </v-row>
    <v-row v-else>
      <media-card
        @click="selectMovie(movie.imdbID)"
        v-for="movie of movies"
        :key="movie.imdbID"
        :cover="movie.poster"
        :title="movie.title"
      ></media-card>
    </v-row>
  </v-col>
</template>

<script>
import MediaCard from "@/components/MediaCard.vue";
import moviesApi from "@/services/moviesApi";
import Navbar from "@/components/NavBar.vue";

export default {
  components: {
    MediaCard,
    Navbar,
  },
  name: "HomePage",
  data() {
    return {
      search: "",
      loadings: {
        search: false,
      },
      errors: {
        search: null,
      },
      movies: [
        {
          title: "Harry Potter and the Deathly Hallows: Part 2",
          year: "2011",
          imdbID: "tt1201607",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
        },
        {
          title: "Harry Potter and the Sorcerer's Stone",
          year: "2001",
          imdbID: "tt0241527",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
        },
        {
          title: "Harry Potter and the Prisoner of Azkaban",
          year: "2004",
          imdbID: "tt0304141",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
        },
        {
          title: "Harry Potter and the Chamber of Secrets",
          year: "2002",
          imdbID: "tt0295297",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_SX300.jpg",
        },
        {
          title: "Harry Potter and the Goblet of Fire",
          year: "2005",
          imdbID: "tt0330373",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg",
        },
        {
          title: "Harry Potter and the Order of the Phoenix",
          year: "2007",
          imdbID: "tt0373889",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BOTA3MmRmZDgtOWU1Ny00ZDc5LWFkN2YtNzNlY2UxZmY0N2IyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
        },
        {
          title: "Harry Potter and the Deathly Hallows: Part 1",
          year: "2010",
          imdbID: "tt0926084",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_SX300.jpg",
        },
        {
          title: "Harry Potter and the Half-Blood Prince",
          year: "2009",
          imdbID: "tt0417741",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg",
        },
        {
          title: "Harry Potter 20th Anniversary: Return to Hogwarts",
          year: "2022",
          imdbID: "tt16116174",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BZWRlMjI2YzgtOTRiOC00NTMwLTgyNDctMWY0ZGUzNzUxYmYzXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
        },
        {
          title: "Harry Potter and the Forbidden Journey",
          year: "2010",
          imdbID: "tt1756545",
          type: "movie",
          poster:
            "https://m.media-amazon.com/images/M/MV5BNDM0YzMyNGUtMTU1Yy00OTE2LWE5NzYtZDZhMTBmN2RkNjg3XkEyXkFqcGdeQXVyMzU5NjU1MDA@._V1_SX300.jpg",
        },
      ],
    };
  },
  methods: {
    async searchMovies() {
      this.loadings.search = true;
      try {
        console.log("Searching movies...");
        const response = await moviesApi.searchNMovies(this.search);
        console.log(response);
        this.movies = response;
      } catch (error) {
        console.error("Error searching movies:", error);
        this.errors.search = error.message;
      }
      this.loadings.search = false;
    },
    selectMovie(imdbID) {
      console.log("Selected movie:", imdbID);
      this.$router.push({ name: "MoviePage", params: { id: imdbID } });
    },
  },
  mounted() {},
};
</script>

<style></style>
