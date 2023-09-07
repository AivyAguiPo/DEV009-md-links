const { mdLinks } = require('./mdLink');

 mdLinks('./data.js')
  .then(links => {
    console.log('Enlaces encontrados:', links);
  })
  .catch(err => {
    console.error('Error:', err);
  });
 
