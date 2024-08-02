import { defineEventHandler } from 'h3'
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), '/src/data/homepage_cache.json');
  console.log('testing', filePath)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  console.log('data', fileContent)
  return JSON.parse(fileContent)
})