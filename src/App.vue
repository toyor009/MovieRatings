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
      <transition-group name="fade">
        <MovieItem
          v-for="(movie, movieIndex) in movies"
          :key="`${movieIndex}-${movie.name}`"
          :movie="movie"
          @edit="startMovieEdit(movieIndex, movie)"
          @remove="movies.splice(movieIndex, 1)"
          @update:rating="updateRating(movieIndex, $event)"
        />
      </transition-group>
    </div>
  </div>

  <transition name="fade">
    <AppModal v-if="showAddMovieModal" @close="closeAddMovieModal">
      <AddNewMovieForm
        :id="movies.length + 1"
        :editingMovie="editingMovie"
        @add-movie="addNewMovie"
        @update-movie="updateMovie"
        @close="closeAddMovieModal"
      />
    </AppModal>
  </transition>
</template>

<script setup>
import { computed, ref } from "vue";

import { movieItems } from "./movies.json";

import AppModal from "./components/AppModal.vue";
import AddNewMovieForm from "./components/AddNewMovieForm.vue";
import MovieItem from "./components/MovieItem.vue";

const movies = ref([...movieItems]);

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
  editingMovie.value = { ...movie };
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
