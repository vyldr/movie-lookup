<template>
  <div id="root">
    <!-- Search area -->
    <div id="search-area">
      <h1>Search for movies</h1>
      <input v-model="query" placeholder="Movie title" />
      <button @click="$fetch">search</button>
    </div>

    <!-- Display loading state -->
    <p v-if="$fetchState.pending">Searching...</p>
    <p v-else-if="$fetchState.error">An error occurred</p>

    <!-- Results -->
    <div v-else id="results">
      <div class="result" v-for="movie of movies">
        <img class="poster" :src="'https://' + movie.poster_image_url" />
        <div class="movieData">
          <div>{{ movie.title }}</div>
          <div>ID: {{ movie.movie_id }}</div>
          <div>{{ movie.popularity_summary }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      movies: []
    };
  },
  async fetch() {
    this.movies = await fetch(
      `http://localhost:3000/movies?search=${this.query}`
    ).then(res => res.json());
  }
};
</script>

<style>
#root {
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  width:100%;
}

#search-area {
  padding: 4rem;
  margin: auto;
  text-align: center;
}

#results {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.result {
  background-color: #ddd;
  padding: 1rem;
  margin: 0.5rem;
}

.movieData {
  /* float: left; */
  width: 10rem;
}

.poster {
  width: 12rem;
}
</style>
