const fs = require('fs').promises;
const path = require('path');

function isMarkdownFile(filePath) {
  //extensiones válidas
  const markdownExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  //obtiene la extension del archivo
  const ext = path.extname(filePath);
  return markdownExtensions.includes(ext);
}

function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    // Comprobar si la ruta existe
    fs.access(filePath)
      .then(() => {
        // Transformar la ruta a absoluta
        const absolutePath = path.resolve(filePath);

        // Verificar si el archivo es Markdown
        if (!isMarkdownFile(absolutePath)) {
          reject(new Error('El archivo no es de tipo Markdown'));
          return;
        }

        // Leer el contenido del archivo utf-8 codificación a la hora de leer un archivo
        fs.readFile(absolutePath, 'utf-8')
          .then(content => {
            const links = [];

            // Expresión regular para encontrar enlaces en formato [texto](url)
            const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
            let match = linkRegex.exec(content);
            while (match !== null) {
              const [, text, url] = match;
              links.push({ text, url });
              match = linkRegex.exec(content);
            }

            resolve(links);
          })
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });
}

mdLinks('./README.md')
  .then(links => {
    console.log('Enlaces encontrados:', links);
  })
  .catch(err => {
    console.error('Error:', err);
  });