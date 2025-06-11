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

  beforeAll(() => {
    global.XMLHttpRequest = MockXMLHttpRequest as any;
  });

  beforeEach(() => {
    MockXMLHttpRequest.mockInstances = [];
    http = new HTTPTransport();
  });

  it('should track instances', () => {
    new HTTPTransport().get('/test', {});
    const xhr = MockXMLHttpRequest.mockInstances[0];
    expect(xhr.open).toHaveBeenCalledWith('GET', expect.any(String));
  });

  it('GET запрос должен корректно вызывать open с правильными параметрами', () => {
    http.get('/test', {});

    const xhr = MockXMLHttpRequest.mockInstances[0];
    expect(xhr.open).toHaveBeenCalledWith(
      METHODS.GET,
      `${baseApiUrl}/test`
    );
  });

  it('GET запрос должен вызывать send без тела', () => {
    http.get('/test', {});

    const xhr = MockXMLHttpRequest.mockInstances[0];
    expect(xhr.send).toHaveBeenCalledWith();
  });

  it('POST запрос должен отправлять данные в теле запроса', () => {
    const testData = { name: 'John' };
    http.post('/test', { data: testData });

    const xhr = MockXMLHttpRequest.mockInstances[0];
    expect(xhr.send).toHaveBeenCalledWith(JSON.stringify(testData));
  });

  it('должен устанавливать переданные заголовки', () => {
    const headers = { 'Content-Type': 'application/json' };
    http.get('/test', { headers });

    const xhr = MockXMLHttpRequest.mockInstances[0];
    expect(xhr.setRequestHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
  });

  it('Модуль корректно составляет запрос с query параметрами', () => {
    http.get('/test', mockOptions);
    const xhr = MockXMLHttpRequest.mockInstances[0];   

    expect(xhr.open).toHaveBeenCalledWith(
      METHODS.GET, 
      `${baseApiUrl}/test?key1=value1&key2=15&key3=1,2,3`
    );
  });

it('Корректный ответ на действия анонима', async () => {
    const response = await http.get('/auth/user', {});   
    expect(response.status).toBe(401);
  });
});