<template>
  <div class="button-group">
    <BaseButton
      v-for="(button, index) in buttons"
      :key="index"
      :button="button"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  buttons: {
    type: Object,
  },
})
</script>

<style lang="scss">
@import "style";
</style>
