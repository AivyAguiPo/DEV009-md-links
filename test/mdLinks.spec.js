const fs = require('fs/promises');
const { mdLinks } = require('../mdLink');
const path = require('path');

describe('mdLinks', () => {
  it('debería rechazar la promesa si el archivo no es Markdown', () => {
    const filePath = 'path/to/nonmarkdownfile.txt';
   expect(mdLinks(filePath)).rejects.toEqual('La ruta "path/to/nonmarkdownfile.txt" no existe.');
  });

  it('debería rechazar la promesa si la ruta no existe', () => {
    const filePath = 'path/to/nonexistentfile.md';
   expect(mdLinks(filePath)).rejects.toEqual('La ruta \"path/to/nonexistentfile.md\" no existe.');
  });

  it('debería resolver la promesa con los enlaces encontrados en el archivo Markdown', async () => {
    const filePath = 'README.md'; // ruta de archivo con enlace Markdown válido.
  
    // Utilizamos async/await para esperar la resolución de la promesa
    const links = await mdLinks(filePath);
  
    // Verificamos que 'links' sea un arreglo no vacío
    expect(Array.isArray(links)).toBeTruthy();
    expect(links.length).toBeGreaterThan(0);
  
    // Verificamos que todos los enlaces tengan las propiedades adecuadas (href, text, file)
    links.forEach(link => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('filePath');
    });
  });
});

