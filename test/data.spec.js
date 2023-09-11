const {validateLink} = require('../data.js');
const axios = require('axios');
jest.mock('axios');
describe('validateLink', () =>{
    it('Deberia devolver un objeto con status y "OK" si el enlace es válido', async () =>{
      axios.head.mockResolvedValue({ status: 200 });
      const link = { href: 'http://ejemplo.com' };
      const result = await validateLink(link);
      expect(result.status).toBe(200);
      expect(result.ok).toBe('OK');
    });

    it('debería devolver un objeto con status y ok "Fail" si el enlace es inválido', async () => {
        axios.head.mockRejectedValue({ response: { status: 404 } });
        const link = { href: 'http://enlace-invalido.com' };
        const result = await validateLink(link);
        expect(result.status).toBe(404);
        expect(result.ok).toBe('Fail');
      });

  })