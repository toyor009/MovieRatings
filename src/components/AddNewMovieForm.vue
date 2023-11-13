<template>
  <div class="bg-[#19252A] w-[500px] p-4">
    <h3 class="text-white font-bold mb-5">{{ formTitle }}</h3>

    <form>
      <div>
        <label class="text-white" for="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          class="nm-input"
          v-model="movie.name"
        />
      </div>

      <div>
        <label class="text-white" for="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows="3"
          class="nm-input"
          v-model="movie.description"
        />
      </div>

      <div>
        <label class="text-white" for="image">Image</label>
        <input
          name="image"
          id="image"
          type="text"
          class="nm-input"
          v-model="movie.image"
        />
      </div>

      <div>
        <label class="text-white" for="genres">Genres</label>
        <div name="genres" id="genres" class="nm-input">
          <div
            v-for="genre in genres"
            :key="genre"
            class="genre-item"
            :class="isSelectedGenre(genre) && 'bg-blue-600'"
            @click="updateMovieGenre(genre)"
          >
            {{ genre }}
          </div>
        </div>
      </div>

      <div>
        <label class="text-white mr-3" for="inTheaters">In theaters?</label>
        <input
          name="inTheaters"
          id="inTheaters"
          type="checkbox"
          class="nm-input cursor-pointer"
          v-model="movie.inTheaters"
        />
      </div>

      <div class="flex justify-between">
        <AppButton type="secondary" name="Cancel" @click="closeForm" />
        <AppButton
          :name="isEditing ? 'Update Movie' : 'Add Movie'"
          @click="handleFormSubmission"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, computed } from "vue";
import { Movie } from "../types";

defineOptions({
  name: "add-new-movie-form",
});

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  editingMovie: {
    type: Object as PropType<Movie>,
    default: () => ({}),
  },
});

const emit = defineEmits(["close", "add-movie", "update-movie"]);

const defaultMovie: Movie = {
  id: null,
  name: "",
  description: "",
  image: "",
  rating: 0,
  genres: [],
  inTheaters: false,
};

const movie = ref({
  ...defaultMovie,
  id: props.id,
});

const genres = ["Comedy", "Action", "Crime", "Drama", "Thriller"];

const isEditing = computed(() => !!props.editingMovie?.name);

const formTitle = computed(() =>
  isEditing.value ? "Edit Movie" : "Add New Movie"
);

const formIsFilled = computed(() => {
  const { name, description, image, genres } = movie.value;
  return !!name && !!description && !!image && genres.length > 0;
});

function isSelectedGenre(genre: string) {
  return movie.value.genres.includes(genre);
}

function updateMovieGenre(genre: string) {
  if (isSelectedGenre(genre)) {
    removeGenre(genre);
    return;
  }

  movie.value.genres.push(genre);
}

function removeGenre(genre: string) {
  const index = movie.value.genres.indexOf(genre);
  movie.value.genres.splice(index, 1);
}

function handleFormSubmission() {
  if (!formIsFilled.value) return;

  if (isEditing.value) {
    emit("update-movie", movie.value);
  } else emit("add-movie", movie.value);

  movie.value = {
    ...defaultMovie,
  };

  closeForm();
}

function closeForm() {
  emit("close");
}

movie.value = isEditing.value
  ? { ...props.editingMovie }
  : {
      ...defaultMovie,
      id: props.id,
    };
</script>

<style lang="scss" scoped>
.nm-input {
  @apply mb-4 bg-[#0C131F] text-white rounded w-full;
  border: 1px solid #2e383a;

  &[type="text"] {
    @apply h-8;
  }

  &[type="checkbox"] {
    width: unset;
  }
}

.genre-item {
  @apply mb-1 px-2 cursor-pointer hover:bg-gray-500;
}
</style>
