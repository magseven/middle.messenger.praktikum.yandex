import { expect, use} from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub} from 'sinon';
import { HTTPTransport} from './httpRequest';

describe( 'httpRequest', () => {
    use(sinonChai);
    const sandbox = createSandbox();
    let http: HTTPTransport;
    let request: SinonStub<any>;

    beforeEach(() => {
        http = new HTTPTransport();
        request = sandbox.stub( http, 'request').callsFake( () => Promise.resolve({} as XMLHttpRequest));
    })

    afterEach(()=> {
        sandbox.restore();
    })
    
    it('should stringify query object for Get request where all parameters are strings', async () => {
        http.get('', { data: { a: '1', b: '2' }});
        expect(request).calledWithMatch('?a=1&b=2', 'GET');
    });

    it('should stringify query object for Get request where all parameters are strings and numbers', async () => {
        http.get('', { data: { a: 1, b: 'string' }});
        expect(request).calledWithMatch('?a=1&b=string', 'GET');
    });

    it('should encode characters for query', async () => {
        http.get('', { data: { a: '1+2', b: '2 2' }});
        expect(request).calledWithMatch('?a=1%2B2&b=2%202', 'GET');
    });

    it('should encode characters for query', async () => {
        http.get('', { data: { a: '1=2&1' }});
        expect(request).calledWithMatch('?a=1%3D2%261', 'GET');
    });

    it('should encode characters for query', async () => {
        http.get('', { data: { 'a=x&4': 'q=w&e' }});
        expect(request).calledWithMatch('?a%3Dx%264=q%3Dw%26e', 'GET');
    });
});
