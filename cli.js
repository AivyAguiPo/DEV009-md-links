#!/usr/bin/env node
const { mdLinks } = require('./mdLink');
const {calculateLinkStats} = require('./data');

const path = process.argv[2];
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');

mdLinks(path,validate)
  .then(links => {
    if (stats && validate) {
      const statsResult = calculateLinkStats(links);
      console.log('Total de enlaces:', statsResult.total);
      console.log('Enlaces únicos:', statsResult.unique);
      console.log('Enlaces rotos:', statsResult.broken);
    } else if (stats) {
      const statsResult = calculateLinkStats(links);
      console.log('Total de enlaces:', statsResult.total);
      console.log('Enlaces únicos:', statsResult.unique);
    } else {
      console.log('Enlaces encontrados:', links);
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });
