const fs = require('fs');
const path = require('path');
const {isMarkdownExtension,validateLink}= require('./data.js');
const axios = require('axios');

function mdLinks(filePath, validate) {
  return new Promise((resolve, reject) => {
    // Transformar la ruta a absoluta
    const file = path.resolve(filePath);

    // Verificar si el archivo es Markdown
    if (!isMarkdownExtension(file)) {
      return reject(new Error('El archivo no es Markdown'));

    }
    // Comprobar si la ruta existe
    if (!fs.existsSync(file)) {
      return reject(new Error('La ruta no existe'));
    }
    // Leer el contenido del archivo utf-8 codificado,argumento content =contenido de la data
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
        if (validate) {
          links.push(validateLink({ href, text, file }));
        } else {
          links.push({ href, text, file });
        }
        match = linksFormat.exec(content);
    }
      Promise.all(links)
        .then((validateLink) => {
          resolve(validateLink);
        })
        .catch((error) => {
          reject(error);
        });
  });
});
}

module.exports = { mdLinks };



