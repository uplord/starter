<template>
  <main>
    <section>
      <div class="inner-container">
        <component
          v-if="sections"
          v-for="(section, key) in sections"
          :key="key"
          :is="getComponent(section.__component)"
          :data="section"
          animate="true"
          :visible="vsibleSections[key].visible"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { usePagesStore } from "~/store/pagesStore";
import { useAsyncData } from '#app';
import { storeToRefs } from "pinia";

import BlockBanner from '@/components/Block/Banner';
import BlockSection from '@/components/Block/Section';

const pagesStore = usePagesStore();
const { page } = storeToRefs(pagesStore);

const componentMapping = {
  'blocks.banner': BlockBanner,
  'blocks.section': BlockSection,
};

const loading = ref(false)

const sections = ref([]);
const id = 1;

// Slide
let populate = 'populate[sections][populate][slide][populate][image]=*';
populate += '&populate[sections][populate][slide][populate][buttons][populate]=file';
// Section
populate += '&populate[sections][populate][section][populate][image]=*';
populate += '&populate[sections][populate][section][populate][buttons][populate]=file';

await useAsyncData('page', () => pagesStore.fetchPage(id, populate));
sections.value = page.value.attributes.sections

console.log(sections.value)

const vsibleSections = ref(Array.from({ length: sections.value.length }, () => ({ visible: false })))

const getComponent = (componentName) => componentMapping[componentName] || null;

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            loading.value = true
            vsibleSections.value[entry.target.index].visible = true
            console.log('visible - ' + entry.target.index)
          }, index * 1200)
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -100px 0px"
    }
  )

  document.querySelectorAll(".js_section").forEach(function (el, index) {
    el.index = index
    observer.observe(el)
  })
})

</script>