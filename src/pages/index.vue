<template>
  <main>
    <section>
      <div class="inner-container">
        <h1>Homepage</h1>
        <component v-for="(section, key) in sections" :is="getComponent(section.__component)" :data="section" />
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

function getComponent(componentName) {
  return componentMapping[componentName] || null;
}

const sections = ref([]);

const populate = 'populate[sections][populate][slide][populate]=*&populate[sections][populate][section][populate]=*';

// const { data, error } = await useAsyncData('page', () => 
//   $fetch(`/api/page?page=1&populate=${encodeURIComponent(populate)}`)
// );

// if (!error.value) {
//   sections.value = data.value;
// }
const data = ref(null)
const response = await fetch('/api/data')
data.value = await response.json()
console.log('json', data.value)

const config = useRuntimeConfig();
const strapiUrl = `${config.public.strapiApiUrl}/pages/1?${populate}`;

try {
  const response = await $fetch(strapiUrl, {
    headers: {
      Authorization: `Bearer ${config.public.strapiApiKey}`,
    },
  });
  const sections = response.data.attributes.sections;
  console.log('Get from api');
  console.log('api', sections)
} catch (error) {
    console.log('Get from cache');
}

</script>