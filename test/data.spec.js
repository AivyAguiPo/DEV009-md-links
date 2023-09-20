const {isMarkdownExtension,transformPathAbsolute, getFiles, readFile, getLinks, validateLinks, isFile }= require('../data')
const {mdLinks} = require('../mdLink');
const axios = require('axios');
jest.mock('axios');

describe('mdLinks', () =>{
    it('validando', () =>{
       // mdLink('files')
         mdLinks('pruebas/archivoPrueba.md')
    })
})
describe('validar getFile devuelva una lista de archivos.', () => {
    it('deberia devolver una lista de archivos', () => {
        const files = getFiles('pruebas', '.md');
        expect(files.length).toBeGreaterThan(0);
    });
});

describe('validar isFile', () => {
    it('comprobar si la ruta existe', () => {
        const filePath = 'path/to/nonexistentfile.md';
        expect(() => {
            isFile(filePath);
          }).toThrowError(`La ruta "${filePath}" no existe.`);
      });
})
describe('validar readFile devuelva el contenido del archivo', () => {
    it('deberia devolver el contenido del archivo', () => {
        const contenFile = readFile('pruebas/archivoPrueba.md');
        expect(contenFile).not.toBeNull();
    })
})

describe('validar getLinks devuelva los link ', () => {
    it('deberia devolver los link', async () => {
        const contentFile = {
            content: 'Estos son enlaces de ejemplo [Google](https://www.google.com/) y [GitHub](https://github.com/).',
            filePath: '/ruta/al/archivo.md',
          };
          const result = getLinks(contentFile);

          // Verificar que la función devuelva un array de enlaces
          expect(result.links).toEqual([
            {
              text: 'Google',
              href: 'https://www.google.com/',
            },
            {
              text: 'GitHub',
              href: 'https://github.com/',
            },
          ]);
      
          // Verificar que la ruta del archivo sea la misma que la proporcionada
          expect(result.filePath).toBe('/ruta/al/archivo.md');
        });
      
})

describe('validar validateLink valide los link', () => {
    it('deberia validar los links', async () => {
        axios.head.mockResolvedValue({ status: 200 });
        const result = await validateLinks('https://www.youtube.com');
        expect(result.status).toEqual(200);
    })
    it('deberia validar un link invalido', async () => {
        axios.head.mockRejectedValue({ response: { status: 404 } });
        const result = await validateLinks('https://noexiste.com');
        expect(result.status).toEqual(404);
    })
})