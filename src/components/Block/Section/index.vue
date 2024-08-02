<template>
  <div class="block block-section alignmax">
    <div class="inner-container">
      <div class="alignwide">
        <div class="sections">
          <div class="section">
            <div class="text-wrap">
              <h2>{{ data.section.title }}</h2>
            </div>
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
  // console.log('Data prop:', props.data.section)
})
</script>