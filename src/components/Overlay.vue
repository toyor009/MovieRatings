<template>
  <div
    class="fixed w-screen h-screen top-0 right-0 bg-black bg-opacity-80 flex items-center justify-center"
    :class="`z-[${props.zIndex}]`"
    @click.self="emit('close')"
  >
    <slot />
  </div>
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
});

const emit = defineEmits(["close"]);
</script>
