import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.siteUrl;
  const strapiUrl = config.public.strapiUrl;
  const outputDir = path.join(process.cwd(), 'src/public/assets/uploads');

  await fs.mkdir(outputDir, { recursive: true });

  const body = await readBody(event);
  const jsonData = body;

  const extractImageUrls = (obj) => {
    let urls = [];

    const findUrls = (data) => {
      if (typeof data === 'object' && data !== null) {
        for (const key in data) {
          if (data[key] && typeof data[key] === 'object') {
            findUrls(data[key]);
          } else if (key === 'url' && typeof data[key] === 'string') {
            // Check if the URL points to an image file
            if (/\.(jpeg|jpg|png|gif|svg|webp|bmp|pdf)$/i.test(data[key])) {
              urls.push(data[key]);
            }
          }
        }
      }
    };

    findUrls(obj);
    return urls;
  };

  const downloadImage = async (url, outputPath) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      await fs.writeFile(outputPath, Buffer.from(buffer));
    } catch (error) {
      console.error(`Failed to download ${url}:`, error.message);
    }
  };

  const downloadAllImages = async () => {
    const imageUrls = extractImageUrls(jsonData.attributes);

    for (const imagePath of imageUrls) {
      // const url = `${baseUrl}${imagePath}`;
      const url = strapiUrl + imagePath.replace(baseUrl, '')
      const outputPath = path.join(outputDir, path.basename(imagePath));

      try {
        // Check if the file already exists
        await fs.access(outputPath);
        console.log(`File ${outputPath} already exists. Skipping download.`);
      } catch (error) {
        // File does not exist, proceed with the download
        console.log(`Downloading ${url} to ${outputPath}...`);
        await downloadImage(url, outputPath);
      }
    }
  };

  try {
    await downloadAllImages();
    return { status: 'success', message: 'All images downloaded successfully!' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
});
