import { promises as fs } from 'fs';
import { defineEventHandler } from 'h3';

const updateImageProvider = (data, newProvider) => {
  // Recursively traverse the JSON to find and update all images
  const traverse = (obj) => {
    if (Array.isArray(obj)) {
      obj.forEach(traverse);
    } else if (obj && typeof obj === 'object') {
      if (obj.image && obj.image.data) {
        obj.image.data.attributes.provider = newProvider;
      }
      if (obj.buttons) {
        obj.buttons.forEach(button => {
          if (button.file && button.file.data && button.file.data.attributes) {
            button.file.data.attributes.provider = newProvider;
          }
        });
      }
      Object.keys(obj).forEach(key => {
        traverse(obj[key]);
      });
    }
  };

  traverse(data);
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id;

  try {
    const filePath = 'src/data/page-' + id + '.json';

    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    updateImageProvider(jsonData, 'ipx');

    return jsonData;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to read saved page data.',
      error: error.message
    };
  }
});