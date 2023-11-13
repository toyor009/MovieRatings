<template>
  <button v-bind="$attrs" :class="props.type" type="button">
    <slot v-if="$slots.default" />

    <span v-else>
      {{ props.name }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineOptions({
  name: "app-button",
  inheritAttrs: false,
});

type ButtonType = "primary" | "secondary";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },

  type: {
    type: String as PropType<ButtonType>,
    default: "primary",
  },
});
</script>

<style lang="scss" scoped>
button {
  @apply p-2.5 rounded-md text-white font-semibold;

  &.primary {
    @apply bg-[#19AAC3];
  }

  &.secondary {
    @apply bg-[#5B6474];
  }
}
</style>
