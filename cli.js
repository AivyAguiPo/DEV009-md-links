
const { mdLinks } = require('./mdLink');

const path = process.argv[2];
const isValidate = process.argv[3];
const validate = isValidate === '--validate'
console.log(process.argv)
mdLinks(path, validate)
  .then(links => {
    console.log('Enlaces encontrados:', links);
  })
  .catch(err => {
    console.error('Error:', err);
  });


