import fs from 'fs';
import path from 'path';
import settings from '@global_settings';

const { API_ENTRY_POINT, BASE_DIR, COMPONENT_DIR, ROUTEFILE } = settings;

const isRoute = (file) => file.toLowerCase().endsWith(ROUTEFILE);
function loadApi(dirPath, app) {
  fs.readdir(BASE_DIR + dirPath, (err, files) => {
    for (const file of files) {
      // eslint-disable-next-line
      const filePath = path.join(__dirname, `${dirPath + file}`);
      if (fs.statSync(filePath).isDirectory()) {
        loadApi(`${dirPath + file}/`, app);
      } else if (isRoute(file)) {
        const filename = dirPath + path.basename(file);
        const route = require(`./${filename}`);
        app.use(`${API_ENTRY_POINT}/${route.autoPath}`, route.default);
        console.warn(`ROUTE: ${API_ENTRY_POINT}/${route.autoPath}`);
      }
    }
  });
}

export default function customAPI(app) {
  loadApi(COMPONENT_DIR, app);
}
