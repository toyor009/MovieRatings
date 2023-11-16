<template>
  <div class="w-[400px] lg:w-full xl:w-[70%] m-auto my-4 p-4">
    <AppButton name="Go Back" @click="router.push('/')" />

    <MovieDetails :movie="movie" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import { movieItems } from "../../src/movies.json";

import MovieDetails from "../../src/components/MovieDetails.vue";

const router = useRouter();
const route = useRoute();

const movie = computed(() => {
  const movieId = route.params.id;
  return movieItems.find((movie) => movie.id == movieId);
});
</script>
