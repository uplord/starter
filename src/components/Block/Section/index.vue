<template>
  <div v-if="data.section" class="block block-section alignmax"
    :class="{
      'animate js_section': animate === 'true',
      visible: visible == true
    }"
  >
    <div class="inner-container">
      <div class="alignwide">
        <div class="sections">
          <div class="section"
            :class="[
              data.section.class,
              {
                full: !data.section.image
              }
            ]"
          >
            <div v-if="data.section.image.data != null" class="image-wrap">
              <Image :image="data.section.image" :title="data.section.title" />
            </div>
            <div class="text-wrap inner-container">
              <h2 v-if="data.section.subtitle" class="h4 primary">{{ data.section.subtitle }}</h2>
              <h3 class="h2">{{ data.section.title }}</h3>
              <div v-if="data.section.content" class="inner-container">
                <StrapiBlocks :content="data.section.content" />
              </div>
              <BaseButtons v-if="data.section.buttons" :buttons="data.section.buttons" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';

const props = defineProps(["animate", "visible", "data", "id"])
</script>

<style lang="scss">
@import "style";
</style>