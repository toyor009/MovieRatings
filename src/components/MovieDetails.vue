<template>
  <div v-if="movie" class="lg:flex mt-10 h-[520px] text-white">
    <!-- Image -->
    <img :src="movie.image" alt="image" class="w-full h-[520px] basis-0" />

    <div class="flex flex-col justify-start lg:justify-center lg:h-full p-4">
      <!-- Title -->
      <h1 class="font-bold text-xl">{{ movie.name }}</h1>

      <!-- Genres -->
      <div class="mt-2 flex gap-1">
        <div
          v-for="(genre, genIndex) in movie.genres"
          :key="genIndex"
          class="px-2 bg-[#6566F0] rounded-xl text-white text-sm font-semibold"
        >
          {{ genre }}
        </div>
      </div>

      <!-- Description -->
      <p class="mt-3 font-semibold">
        {{ movie.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Movie } from "../types";

defineOptions({
  name: "movie-item",
});

const props = defineProps<{
  movie: Movie;
}>();
</script>
