const { mdLinks } = require('./mdLink');

 mdLinks('README.md')
  .then(links => {
    console.log('Enlaces encontrados:', links);
  })
  .catch(err => {
    console.error('Error:', err);
  });



mdLinks("README.md", true)
  .then((links) => {
    console.log('Enlaces con validación:', links)
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);


/*mdLinks("./some/example.md", false)
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);*/
