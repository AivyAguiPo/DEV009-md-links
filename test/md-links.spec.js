const fs = require('fs/promises');
const { mdLinks } = require('../mdLink');
const path = require('path');

describe('mdLinks', () => {
  it('debería rechazar la promesa si el archivo no es Markdown', () => {
    const filePath = 'path/to/nonmarkdownfile.txt';

    return expect(mdLinks(filePath)).rejects.toThrow('El archivo no es Markdown');
  });

  it('debería rechazar la promesa si la ruta no existe', () => {
    const filePath = 'path/to/nonexistentfile.md';

    return expect(mdLinks(filePath)).rejects.toThrow('La ruta no existe');
  });

  it('debería resolver la promesa con los enlaces encontrados en el archivo Markdown', async () => {
    const filePath = 'README.md'; // Reemplaza con una ruta de archivo que contenga enlaces Markdown válidos.
  
    // Utilizamos async/await para esperar la resolución de la promesa
    const links = await mdLinks(filePath);
  
    // Verificamos que 'links' sea un arreglo no vacío
    expect(Array.isArray(links)).toBeTruthy();
    expect(links.length).toBeGreaterThan(0);
  
    // Verificamos que todos los enlaces tengan las propiedades adecuadas (href, text, file)
    links.forEach(link => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('file');
    });
  });
});
  