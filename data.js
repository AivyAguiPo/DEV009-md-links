const path = require('path');
const fs = require('fs');
const axios = require('axios');

function isMarkdownExtension(filePath) {
  //extensiones válidas
  const markdownExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  //obtiene la extension del archivo
  const ext = path.extname(filePath);
  return markdownExtensions.includes(ext);
}

function transformPathAbsolute(relativePath) {
  // Transformar la ruta a absoluta
  const absolutePath = path.resolve(relativePath);
  return absolutePath;
}

function isFile(path) {
      if (!fs.existsSync(path)) {
          throw new Error(`La ruta "${path}" no existe.`);
        }
      
        const stats = fs.statSync(path);
        return stats.isFile();
      }
  function isDirectory(path) {
        // Recordar retornar true si es directorio
        const response = fs.statSync(path);
        if (response.isDirectory())
            return true;
    }

function getFiles(directoryPath, extension) {
  // Use fs.readdirSync to get a list of all files in the directory.
  //TODO: Validar si el directorio existe
  const files = fs.readdirSync(directoryPath);

  // Use path.extname to filter the files by their extension.
  const filteredFiles = files.filter((file) => {
      const ext = path.extname(file);
      return ext === extension;
  });
  // Map the filtered file names to their full paths.
  const fullPaths = filteredFiles.map((file) => path.join(directoryPath, file));

  return fullPaths;
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, content) => {
          if (err) {
              return reject(err);
          }
          return resolve({ content, filePath })
      });
  })
}

function getLinks(contentFile) {
  const links = [];
  // Expresión regular para encontrar enlaces en formato [texto](url)
  const linksFormat = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
  let match = linksFormat.exec(contentFile.content);
  while (match !== null) {
      const [, text, href] = match;
      links.push({ href, text });
      match = linksFormat.exec(contentFile.content);
  }
  return { links, filePath: contentFile.filePath }
}

function validateLinks(link, filePath) {
  return axios.head(link.href)
      .then((response) => Object.assign({}, {
          filePath,
          link: link.href,
          text: link.text,
          status: response.status,
          ok: response.status >= 200 && response.status < 400 ? 'OK' : 'Fail',
      }))
      .catch((error) => Object.assign({}, {
          filePath,
          link: link.href,
          text: link.text,
          status: error.response ? error.response.status : 'N/A',
          ok: 'Fail',
      }));
}
module.exports = { isMarkdownExtension, transformPathAbsolute, isFile, isDirectory, getFiles, readFile, getLinks, validateLinks };