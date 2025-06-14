import { HTTPTransport, METHODS, baseApiUrl} from './httpRequest';
class MockXMLHttpRequest {
  open = jest.fn();
//  send = jest.fn();

  send = jest.fn(function(this: any) {
      this.status = 401;
      this.response = { reason: 'Unauthorized' };
      if (this.onload) this.onload();
    });
  
  setRequestHeader = jest.fn();
  onload = jest.fn();
  onerror = jest.fn();
  status = 200;
  response = {};

  static mockInstances: MockXMLHttpRequest[] = [];

  constructor() {
    MockXMLHttpRequest.mockInstances.push(this);
  }
}

const mockOptions = {
  data: { key1: 'value1', key2: 15, key3: [1, 2, 3] },
  headers: { 'Content-Type': 'application/json' }
};

describe('HTTPTransport', () => {
  let http: HTTPTransport;

  afterEach(() => {
    global.XMLHttpRequest = XMLHttpRequest;
  });

  beforeEach(() => {
    MockXMLHttpRequest.mockInstances = [];
    http = new HTTPTransport();
  });

  it('Модуль должен устанавливать переданные заголовки', () => {
    global.XMLHttpRequest = MockXMLHttpRequest as any;

    const headers = { 'Content-Type': 'application/json' };
    http.get('/test', { headers });

    const xhr = MockXMLHttpRequest.mockInstances[0];
    expect(xhr.setRequestHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
  });

  it('Модуль должен корректно составлять запрос', () => {
    global.XMLHttpRequest = MockXMLHttpRequest as any;

    http.get('/test', mockOptions);

    const xhr = MockXMLHttpRequest.mockInstances[0];   
    expect(xhr.open).toHaveBeenCalledWith(
      METHODS.GET, 
      `${baseApiUrl}/test?key1=value1&key2=15&key3=1,2,3`
    );
  });

  it('Модуль должен давать Корректный ответ на действия анонима', async () => {
    const response = await http.get('/auth/user', {});   
    expect(response.status).toBe(401);
  });

  it('Модуль должен давать Корректный ответ на неверные данные авторизации', async () => {
    const result = await http.post(`${baseApiUrl}/auth/signin`, { data: {login: 'test', password: 'test'}})
    expect(result.status).toBe(401);
    expect(result.response.reason).toBe('Unauthorized');
  });
});
