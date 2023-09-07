const fs = require('fs');
const path = require('path');
//const isMarkdownExtension = require('./data.js');

function isMarkdownExtension(filePath) {
  //extensiones válidas
  const markdownExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  //obtiene la extension del archivo
  const ext = path.extname(filePath);
  return markdownExtensions.includes(ext);
}
function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    // Comprobar si la ruta existe
    // Transformar la ruta a absoluta
    const file = path.resolve(filePath);

    // Verificar si el archivo es Markdown
    if (!isMarkdownExtension(file)) {
      return reject(new Error('El archivo no es Markdown'));

    }
    if (!fs.existsSync(file)) {
      return reject(new Error('La ruta no existe'));
    }
     // Leer el contenido del archivo utf-8 codificado
     fs.readFile(file, 'utf-8', (err, content) => {
      if (err) {
        return reject(err);
      }

      const links = [];

      // Expresión regular para encontrar enlaces en formato [texto](url)
      const linksFormat = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
      let match = linksFormat.exec(content);
      while (match !== null) {
        const [, text, href] = match;
        links.push({ href, text, file });
        match = linksFormat.exec(content);
      }

      resolve(links);
      /* resolve({
        filePath: absolutePath,
        links: links
      }); */
    });

  });
}

module.exports = { mdLinks };



