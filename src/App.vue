<template>
  <div class="w-[400px] lg:w-full xl:w-[70%] m-auto my-4 p-4">
    <div class="flex justify-between">
      <div>
        <p class="text-white">
          Total Movies: {{ totalMovie }}

          <template v-if="movies.length">
            <span class="mx-4"> / </span>

            Average Rating: {{ averageRating }}
          </template>
        </p>
      </div>

      <div class="flex gap-3">
        <AppButton
          v-if="movies.length"
          name="Remove Ratings"
          @click="removeRatings"
        />
        <AppButton name="Add Movie" @click="showAddMovieModal = true" />
      </div>
    </div>

    <div class="lg:grid grid-cols-3 gap-4 my-4">
      <div
        v-for="(movie, movieIndex) in movies"
        class="mb-4 lg:mb-0"
        :key="movieIndex"
        @mouseenter="activeMovieIndex = String(movieIndex)"
        @mouseleave="activeMovieIndex = ''"
      >
        <div class="relative">
          <!-- Star -->
          <StarIcon class="absolute right-1 w-11 h-11 text-yellow-500" />
          <h1 class="absolute top-3 right-[23px] text-red-950">
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
                  @click="updateRating(movieIndex, star)"
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
              v-show="activeMovieIndex == String(movieIndex)"
              class="flex items-center gap-3"
            >
              <!-- Edit -->
              <span title="Edit movie">
                <PencilIcon
                  class="w-[21px] h-[19px] cursor-pointer hover:text-blue-500"
                  @click="startMovieEdit(movieIndex, movie)"
                />
              </span>

              <!-- Delete -->
              <span title="Delete movie">
                <TrashIcon
                  class="w-[21px] h-[19px] cursor-pointer hover:text-red-500"
                  @click="movies.splice(movieIndex, 1)"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Overlay v-if="showAddMovieModal" @close="closeAddMovieModal">
    <AddNewMovieForm
      :id="movies.length + 1"
      :editingMovie="editingMovie"
      @add-movie="addNewMovie"
      @update-movie="updateMovie"
      @close="closeAddMovieModal"
    />
  </Overlay>
</template>

<script setup>
import { computed, ref } from "vue";

import { movieItems } from "./movies.json";
import { StarIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

import Overlay from "./components/Overlay.vue";
import AddNewMovieForm from "./components/AddNewMovieForm.vue";

const movies = ref([...movieItems]);
const activeMovieIndex = ref("");
const editingMovieIndex = ref(null);
const editingMovie = ref({});
const showAddMovieModal = ref(false);

const totalMovie = computed(() => movies.value.length);

const averageRating = computed(() => {
  const totalRating = movies.value.reduce(
    (pv, movie) => pv + movie.rating || 0,
    0
  );
  return (totalRating / totalMovie.value).toFixed(1);
});

function updateRating(index, rating) {
  movies.value[index].rating = rating;
}

function addNewMovie(newMovie) {
  movies.value.push(newMovie);
}

function updateMovie(movie) {
  movies.value[editingMovieIndex.value] = movie;
}

function startMovieEdit(movieIndex, movie) {
  editingMovieIndex.value = movieIndex;
  editingMovie.value = movie;
  showAddMovieModal.value = true;
}

function closeAddMovieModal() {
  showAddMovieModal.value = false;
  editingMovieIndex.value = null;
  editingMovie.value = {};
}

function removeRatings() {
  movies.value.forEach((movie) => (movie.rating = 0));
}
</script>
