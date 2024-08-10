<template>
  <NuxtImg
    :provider="image.data.attributes.provider == 'ipx' ? image.data.attributes.provider : 'strapi'"
    :src="image.data.attributes.url"
    format="webp"
    fit="outside"
    :alt="title"
    :width="image.data.attributes.width"
    :height="image.data.attributes.height"
  />
</template>

<script setup>
const props = defineProps({
  image: {
    type: Object,
  },
  title: {
    type: String,
  },
})
</script>