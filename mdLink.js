
const fs = require('fs');
const path = require('path');
const { isMarkdownExtension, transformPathAbsolute, getFiles, isDirectory, readFile, getLinks, validateLinks, isFile } = require('./data.js')
const axios = require('axios');

function mdLinks(path, validate) {
  return new Promise((resolve, reject) => {
    try {
      let files = [];
      if (isFile(path)) {
       const absolutaPath = transformPathAbsolute(path);
        isMarkdownExtension(path);
        files.push(absolutaPath);
      }
      if (isDirectory(path)) {
        files = getFiles(path, '.md');
      }
      const promisesReadFile = []
      files.forEach((filePath) => {
        promisesReadFile.push(readFile(filePath));
      });
      Promise.all(promisesReadFile).then(contents => {
        const promisesValidateLink = [];
        contents.forEach(content => {
          const result = getLinks(content);
          result.links.forEach(link => {
            if (validate)
              promisesValidateLink.push(validateLinks(link, result.filePath));
            else
              promisesValidateLink.push(Promise.resolve({ href: link.href, text: link.text, filePath: result.filePath }));
          })
        })
        Promise.all(promisesValidateLink).then(values => {
          resolve(values)
        })
      })
    }
    catch (error) {
      reject(error.message)
    }

  });
}
module.exports = { mdLinks };

