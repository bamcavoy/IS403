const fs = require('fs').promises;
const path = require('path');

async function getImages() {
    try {
      const uploadsDir = path.join(__dirname, '..', 'assets', 'uploads');  // Updated path
      const files = await fs.readdir(uploadsDir);
      return files.map(file => path.join('/uploads', file));  // Remove /assets from the path
    } catch (error) {
      console.error('Error reading images:', error);
      return [];
    }
  }
  
module.exports = { getImages };
