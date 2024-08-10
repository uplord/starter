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

      let data;
      let response;

      try {
        response = await fetch(`${config.public.strapiApiUrl}/pages/${id}?${populate}`, {
          headers: {
            'Authorization': `Bearer ${config.public.strapiApiKey}`,
          },
        });
        data = await response.json();
        state.page = data.data;
        data.image = 'strapi';

        const saveData = await fetch('/api/save-page', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.page),
        });
        data = await saveData.json();
        state.page = data.data

        await fetch('/api/download-images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.page),
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
      } catch (error) {
        // console.error("Failed to fetch page strapi:", error);

        try {
          response = await fetch(`/api/get-page?id=${id}`);
          if (!response.ok) throw new Error('Failed to fetch local JSON data.');
          data = await response.json();
          // data.image = 'ipx';
          state.page = data;
        } catch (localError) {
          console.error("Failed to fetch page from local JSON:", localError);
        }
      }
    },
  };

  return {
    ...toRefs(state),
    ...actions,
  };
});
