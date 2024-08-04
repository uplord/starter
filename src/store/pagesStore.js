import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const usePagesStore = defineStore("pagesStore", () => {
  const config = useRuntimeConfig();

  const headers = {
    Authorization: `Bearer ${config.public.strapiApiKey}`,
  };

  const state = reactive({
    page: []
  });

  const actions = {
    async fetchPage(id = 1, populate = 'populate=*') {

      try {
        const response = await fetch(`${config.public.strapiApiUrl}/pages/${id}?${populate}`, {
          headers: {
            'Authorization': `Bearer ${config.public.strapiApiKey}`,
          },
        });
        const data = await response.json();
        state.page = data.data;
      } catch (error) {
        console.error("Failed to fetch page:", error);
      }
    },
  };

  return {
    ...toRefs(state),
    ...actions,
  };
});
