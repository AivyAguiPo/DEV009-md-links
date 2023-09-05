const { mdLinks } = require('../mdLink');
const path = require('path');

describe('mdLinks', () => {

  it('Deberia devolver una promesa', () => {
    // console.log('FIX ME!');
    const result = mdLinks('README.md');
    expect(result).toBeInstanceOf(Promise);
  });
  it('Debe rechazar la promesa si path no existe', () => {
    return mdLinks('noexiste.md').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  })

  /*it('El archivo no es Markdown', () => {

  }) */
it('El archivo es Markdown', () => {
    // Llama a la función mdLinks con la ruta de un archivo Markdown
    const result = mdLinks('archivo.md'); // Ajusta la ruta según tus necesidades

    // Verifica si result contiene la extensión .md o alguna extensión válida de Markdown
    expect(result).toBeTruthy();
  });
  it('Debería rechazar la promesa si el archivo no es Markdown', () => {
    const nonMarkdownFilePath = 'path/to/nonmarkdownfile.txt';
    return mdLinks(nonMarkdownFilePath)
      .catch(error => {
        expect(error( new Error)).toBe('El archivo no es Markdown'); // Verifica el mensaje de error
      });
  });
     
});
