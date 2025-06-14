import {Block, BlockProps} from '../modules/block';
import { Router} from './router'
import { isEqual } from './utils/common';

jest.mock('./block');

jest.mock('./utils/common', () => ({
  isEqual: jest.fn(),
  render: jest.fn()
}));

class MocPage extends Block {
  constructor(props: BlockProps) {
    super("section", props);    
  }                                    
}

describe('Route Navigation (Forward/Backward)', () => {
  const path1 = '/path1';
  const path2 = '/path2';
  const initialPath = '/';

  const mockProps = { rootQuery: '#app' };
  const mockBlockEntry = {
    template: '<div>Test</div>',
    context: { title: 'Test Page' }
  };

  let router: Router;

  beforeEach(() => {
    jest.clearAllMocks();

    (isEqual as jest.Mock).mockImplementation((a, b) => a === b);

    router = new Router( mockProps.rootQuery);
    router
      .use( initialPath, MocPage, mockBlockEntry)
      .use( path1, MocPage, mockBlockEntry)
      .use( path2, MocPage, mockBlockEntry)
      .start();
  });

  it('Тест операции go', () => {
    router.go(path1);
    expect(router['_currentRoute']!.pathname()).toBe(path1);      
  });

  it('Тест двух последовательных операций back', () => {
    router.go(path1);
    router.go(path2);
    
    router.back();
    window.dispatchEvent(new PopStateEvent('popstate', {
      state: { route: path1 }
    }))

    expect(router['_currentRoute']!.pathname()).toBe(path1);      

    router.back();
    window.dispatchEvent(new PopStateEvent('popstate', {
      state: { route: initialPath }
    }))
    expect(router['_currentRoute']!.pathname()).toBe(initialPath);      
  });

  it('Тест операции forward', () => {
    router.go(path1);
    router.go(path2);
    
    router.back();
    router.forward();
    window.dispatchEvent(new PopStateEvent('popstate', {
      state: { route: path2 }
    }))
    expect(router['_currentRoute']!.pathname()).toBe(path2);      
  });
});
