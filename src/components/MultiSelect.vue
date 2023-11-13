<template>
  <div>
    <select name="" id="" value="">
      <option v-for="option in options" :key="option" value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "multi-select",
});

const props = defineProps({
  zIndex: {
    type: Number || String,
    default: 1,
  },
});

const emit = defineEmits(["close"]);

const options = ["Comedy", "Action", "Thriller"];
</script>
