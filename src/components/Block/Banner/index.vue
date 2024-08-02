<template>
  <div class="banner">
    <div clas="slides">
      <div 
        v-for="(slide, key) in data.slide"
        :key="key"
        class="slide"
      >
        <div class="text-content">
          <div class="text-wap">
            <h2>{{ slide.title }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
})

onMounted(() => {
  // console.log('Data prop:', props.data.slide)
})
</script>