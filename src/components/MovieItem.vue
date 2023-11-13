<template>
  <div
    class="mb-4 lg:mb-0"
    @mouseenter="activeMovieIndex = String(movie.id)"
    @mouseleave="activeMovieIndex = ''"
  >
    <div class="relative">
      <!-- Star -->
      <StarIcon class="absolute right-1 w-11 h-11 text-yellow-500" />
      <h1 class="absolute top-3 right-[23px] text-red-950 font-bold">
        {{ movie.rating || "-" }}
      </h1>
    </div>

    <!-- Image -->
    <img :src="movie.image" alt="image" class="w-full h-[520px]" />

    <div class="min-h-[260px] bg-white p-4 rounded-b flex flex-col">
      <div class="flex-1">
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

      <div class="mt-5 flex items-center justify-between font-semibold">
        <!-- Rating -->
        <div class="flex items-center gap-2">
          Rating: ({{ movie.rating }}/5)
          <div class="flex items-center">
            <button
              v-for="(star, starIndex) in 5"
              :key="starIndex"
              @click="emit('update:rating', star)"
            >
              <StarIcon
                class="w-[21px] h-[19px]"
                :class="
                  movie.rating >= star ? 'text-yellow-500' : 'text-gray-500'
                "
              />
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div
          v-show="activeMovieIndex == String(movie.id)"
          class="flex items-center gap-3"
        >
          <!-- Edit -->
          <span title="Edit movie">
            <PencilIcon
              class="w-[21px] h-[19px] cursor-pointer hover:text-blue-500"
              @click="emit('edit')"
            />
          </span>

          <!-- Delete -->
          <span title="Delete movie">
            <TrashIcon
              class="w-[21px] h-[19px] cursor-pointer hover:text-red-500"
              @click="emit('remove')"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue";

import { StarIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

import { Movie } from "../types";

defineOptions({
  name: "movie-item",
});

const props = defineProps<{
  movie: Movie;
}>();

const emit = defineEmits(["edit", "remove", "update:rating"]);

const activeMovieIndex = ref("");
</script>
