import { expect, use} from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox} from 'sinon';
import { Router, stdRoutes} from '../modules/router';
import { Block, BlockProps } from './block';
import { BlockEntry } from '../modules/types';

describe( 'Router', () => {
  use(sinonChai);
  const sandbox = createSandbox();
  let router: Router;
//  let stubState: SinonStub<any>;

  const data: BlockEntry = { template: '', context: {'': ''} };
  const page = class extends Block {
    constructor( props: BlockProps) {
      super("section", props); 
    }
    
    public override render() : DocumentFragment {
      const fragment: HTMLTemplateElement = this._createDocumentElement('template') as HTMLTemplateElement;
      return fragment.content;
    }
  };

  beforeEach(() => {
    router = new Router(".app");
    router
      .use( stdRoutes.Index, page, data)
      .use( stdRoutes.Login, page, data)
      .use( stdRoutes.Profile, page, data)
      .use( stdRoutes.SignUp, page, data)
      .use( stdRoutes.Chat, page, data)
      .use( stdRoutes.Error404, page, data)
      .use( stdRoutes.Error500, page, data)    
      .start();
  })

  afterEach(()=> {
      sandbox.restore();
  })

  it('Должен переходить по маршруту через router.go()', () => {
    const stubState = sandbox.stub( window.history, 'state');
//    const pushStateStub = stub(window.history, 'pushState');
    router.go( stdRoutes.Login);
//    expect(pushStateStub.calledOnce).to.be.true;
    expect(stubState.args[0][2]).to.equal(stdRoutes.Login);
  });

  // it('should stringify query object for Get request where all parameters are strings', async () => {
  //     http.get('', { data: { a: '1', b: '2' }});
  //     expect(request).calledWithMatch('?a=1&b=2', 'GET');
  // });




});