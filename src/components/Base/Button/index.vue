<template>
  <button
    v-if="button.type == 'submit'"
    type="submit"
    class="button"
    :class="button.class"
  >
    {{ button.text }}
  </button>

  <a
    v-else-if="button.url || button.file.data"
    :href="button.url ? button.url : config.public.strapiUrl + button.file.data.attributes.url"
    class="button"
    :class="button.class"
    :target="button.target"
  >
    {{ button.text }}
  </a>

  <div v-else class="button" :class="button.class">
    {{ button.text }}
  </div>

</template>

<script setup>
const props = defineProps({
  button: {
    type: Object,
  },
})

const config = useRuntimeConfig();
</script>

<style lang="scss">
@import "style";
</style>