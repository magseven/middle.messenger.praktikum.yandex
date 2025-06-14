import { HTTPTransport, METHODS, baseApiUrl} from './httpRequest';

const mockOptions = {
  data: { key1: 'value1', key2: 15, key3: [1, 2, 3] },
  headers: { 'Content-Type': 'application/json' }
};

describe('HTTPTransport', () => {
  let http: HTTPTransport;

  const xhrMock: Partial<XMLHttpRequest> = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      readyState: 4,
      status: 200,
      response: 'Hello World!'
    };    

  beforeEach(() => {
    jest.restoreAllMocks();    
    http = new HTTPTransport();
  });

  it('Модуль должен устанавливать переданные заголовки', () => {

    jest.spyOn( window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest);
    const headers = { 'Content-Type': 'application/json' };
    http.get('/test', { headers });

    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
  });

  it('Модуль должен корректно составлять запрос', () => {
    jest.spyOn( window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest);
    http.get('/test', mockOptions);

    expect(xhrMock.open).toHaveBeenCalledWith(
      METHODS.GET, 
      `${baseApiUrl}/test?key1=value1&key2=15&key3=1,2,3`
    );
  });

  it('Модуль должен давать Корректный ответ на действия анонима', async () => {
    const response = await http.get('/auth/user', {});   
    expect(response.status).toBe(401);
  });

  it('Модуль должен давать Корректный ответ на неверные данные авторизации', async () => {
    const result = await http.post('/auth/signin', { data: {login: 'test', password: 'test'}})
    expect(result.status).toBe(401);
    expect( JSON.parse( result.response).reason).toBe('Login or password is incorrect');
  });


});
