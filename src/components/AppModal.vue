<template>
  <transition name="fade">
    <div
      v-if="props.show"
      class="fixed w-screen h-screen top-0 right-0 bg-black bg-opacity-80 backdrop-blur flex items-center justify-center"
      :class="`z-[${props.zIndex}]`"
      @click.self="emit('close')"
    >
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
defineOptions({
  name: "overlay",
});

const props = defineProps({
  zIndex: {
    type: Number || String,
    default: 1,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
</script>
