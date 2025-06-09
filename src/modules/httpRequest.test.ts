import { HTTPTransport, METHODS} from './httpRequest';

//jest.mock('../../api/fetchData');

describe('HTTPTransport', () => {
  let http:  HTTPTransport;
  const mockRequest = jest.fn();

  // Моковые данные
  const testUrl = '/test-url';
  const testOptions = {
    data: { key: 'value' },
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000
  };

  beforeEach(() => {
    http = new HTTPTransport();
    // Мокаем метод request, так как мы тестируем только get
    http.request = mockRequest.mockImplementation(() => Promise.resolve({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should stringify simple query object with strings and numbers', () => {
    const baseUrl = '/api';
    const queryParams = {
      name: 'John',
      age: 30,
      page: 1,
      active: 'true'
    };

    http.get(baseUrl, { data: queryParams });

    const expectedUrl = `${baseUrl}?name=John&age=30&page=1&active=true`;
    
    expect(mockRequest).toHaveBeenCalledWith(
      expectedUrl,
      expect.objectContaining({
        method: METHODS.GET,
        data: queryParams
      }),
      undefined
    );
  });
});

// describe( 'httpRequest', () => {
//     use(sinonChai);
//     const sandbox = createSandbox();
//     let http: HTTPTransport;
//     let request: SinonStub<any>;

//     beforeEach(() => {
//         http = new HTTPTransport();
//         request = sandbox.stub( http, 'request').callsFake( () => Promise.resolve({} as XMLHttpRequest));
//     })

//     afterEach(()=> {
//         sandbox.restore();
//     })
    
//     it('should stringify query object for Get request where all parameters are strings', async () => {
//         http.get('', { data: { a: '1', b: '2' }});
//         expect(request).calledWithMatch('?a=1&b=2', 'GET');
//     });

//     it('should stringify query object for Get request where all parameters are strings and numbers', async () => {
//         http.get('', { data: { a: 1, b: 'string' }});
//         expect(request).calledWithMatch('?a=1&b=string', 'GET');
//     });

//     it('should encode characters for query', async () => {
//         http.get('', { data: { a: '1+2', b: '2 2' }});
//         expect(request).calledWithMatch('?a=1%2B2&b=2%202', 'GET');
//     });

//     it('should encode characters for query', async () => {
//         http.get('', { data: { a: '1=2&1' }});
//         expect(request).calledWithMatch('?a=1%3D2%261', 'GET');
//     });

//     it('should encode characters for query', async () => {
//         http.get('', { data: { 'a=x&4': 'q=w&e' }});
//         expect(request).calledWithMatch('?a%3Dx%264=q%3Dw%26e', 'GET');
//     });
// });
