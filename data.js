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

function validateLink(link) {
  return axios.head(link.href)
    .then((response) => Object.assign({}, link, {
      status: response.status,
      ok: response.status >= 200 && response.status < 400 ? 'OK' : 'Fail',
    }))
    .catch((error) => Object.assign({}, link, {
      status: error.response ? error.response.status : 'N/A',
      ok: 'Fail',
    }));
}
module.exports = {isMarkdownExtension,validateLink};