const { getFiles, getLinks, validateLinks, calculateLinkStats } = require('../data')
const { mdLinks } = require('../mdLink');
const axios = require('axios');
jest.mock('axios');

describe('validar getFile devuelva una lista de archivos.', () => {
  it('deberia devolver una lista de archivos', () => {
    const files = getFiles('pruebas', '.md');
    expect(files.length).toBeGreaterThan(0);
  });

});
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
  test('debe devolver enlaces cuando la ruta es un directorio', () => {
    // Configura el mock de Axios para devolver una respuesta simulada
    axios.get.mockResolvedValue({ status: 200 }); // Puedes personalizar la respuesta según tus necesidades

    const testDirectory = 'pruebas'; // Reemplaza con la ruta de tu directorio de prueba

    return mdLinks(testDirectory, true) // Habilita la validación
      .then(links => {
        // Verifica que links sea un array de objetos con propiedades href, text y filePath
        expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBeGreaterThan(0);
        expect(links[0]).toHaveProperty('href');
        expect(links[0]).toHaveProperty('text');
        expect(links[0]).toHaveProperty('filePath');

        // Verifica que Axios haya sido llamado con la URL correcta
        expect(links.length).toBe(23);
      });
  });
})

describe('calculateLinkStats', () => {
  it('debería calcular las estadísticas correctamente', () => {
    const links = [
      { href: 'https://example.com/page1', ok: 'OK' },
      { href: 'https://example.com/page2', ok: 'OK' },
      { href: 'https://example.com/page1', ok: 'Fail' },
      // Agrega más enlaces según sea necesario para tus pruebas
    ];
    const stats = calculateLinkStats(links);
    // Asegúrate de que las estadísticas se calculen correctamente
    expect(stats.total).toBe(3); // Cambia este valor según el número de enlaces
    expect(stats.unique).toBe(2); // Cambia este valor si esperas enlaces duplicados
    expect(stats.broken).toBe(1); // Cambia este valor si esperas enlaces rotos
  });
});