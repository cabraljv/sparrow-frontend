<template>
    <v-card :class="`ma-1 movie-card `" height="300px" width="200px" @click="$emit('click')" >
      <img class="movie-image" :src="cover" :alt="title">
      <p class="movie-title">{{title}}</p>
    </v-card>
</template>


<script>
export default {
  name: 'MediaCard',
  props: {
    title: String,
    cover: String,
    imdbId: String
  }
}
</script>


<style scoped>
.movie-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.movie-image {
  transition: opacity 0.5s ease-in-out;
  width: 100%;
  height: 100%;
  position: absolute;
}

.movie-card.hover .movie-image {
  opacity: 0.3;
}

.movie-title{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
  transition: opacity 0.5s ease-in-out;
  z-index: 999;
}

</style>