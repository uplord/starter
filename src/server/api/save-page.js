import { promises as fs } from 'fs';
import { defineEventHandler, readBody } from 'h3';
import path from 'path';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  // Define the path to the JSON file
  const filePath = path.resolve(process.cwd(), 'src/public/data/page-' + id + '.json');
  const baseUrl = config.public.siteUrl;
  const strapiUrl = config.public.strapiUrl;

  const updateImageUrls = (obj) => {
  
    const updateUrls = (data) => {
      if (typeof data === 'object' && data !== null) {
        for (const key in data) {
          if (data[key] && typeof data[key] === 'object') {
            updateUrls(data[key]);
          } else if (key === 'url' && typeof data[key] === 'string') {
            if (data[key].startsWith('/uploads/')) {
              // data[key] = baseUrl + data[key];
            }
          }
        }
      }
    };
  
    updateUrls(obj);
    return obj;
  };

  try {
    const updatedBody = updateImageUrls(body);

    // Write the data to the file
    await fs.writeFile(filePath, JSON.stringify(updatedBody, null, 2), 'utf-8');

    return {
      success: true,
      message: 'Page data saved successfully!',
      data: updatedBody,  // Return the updated data
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save page data.',
      error: error.message,
    };
  }
});