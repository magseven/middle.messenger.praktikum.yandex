import Route from './route';
import { Block } from './block';
import { isEqual } from './utils/common';

// Мокаем зависимости
jest.mock('./utils/common', () => ({
  isEqual: jest.fn(),
  render: jest.fn()
}));

jest.mock('./block');

// Мок window.history
const mockHistory = {
  pushState: jest.fn(),
  replaceState: jest.fn(),
  back: jest.fn(),
  forward: jest.fn()
};

Object.defineProperty(window, 'history', {
  value: mockHistory,
  writable: true
});

describe('Route Navigation (Forward/Backward)', () => {
  const initialPath = '/initial';
  const newPath = '/new';
  const mockProps = { rootQuery: '#app' };
  const mockBlockEntry = {
    template: '<div>Test</div>',
    context: { title: 'Test Page' }
  };

  let route: Route;

  beforeEach(() => {
    jest.clearAllMocks();
    route = new Route(initialPath, Block, mockBlockEntry, mockProps);
    (isEqual as jest.Mock).mockImplementation((a, b) => a === b);
  });

  describe('Forward Navigation', () => {
    it('should update history state on forward navigation', () => {
      route.navigate(newPath);
      
      expect(window.history.pushState).toHaveBeenCalledWith(
        { route: newPath },
        '',
        newPath
      );
      expect(route.pathname()).toBe(newPath);
    });

    it('should render new content when path matches', () => {
      const renderSpy = jest.spyOn(route, 'render');
      
      route.navigate(initialPath); // Переход на текущий путь
      expect(renderSpy).toHaveBeenCalled();
    });

    it('should not render when path doesnt match', () => {
      const renderSpy = jest.spyOn(route, 'render');
      
      route.navigate('/non-existent');
      expect(renderSpy).not.toHaveBeenCalled();
    });
  });

  describe('Backward Navigation', () => {
    it('should handle back button via popstate event', () => {
      const backSpy = jest.spyOn(route, 'leave');
      window.dispatchEvent(new PopStateEvent('popstate', {
        state: { route: initialPath }
      }));
      
      expect(backSpy).toHaveBeenCalled();
    });

    it('should unmount current block when going back', () => {
      // Сначала переходим вперед
      route.navigate(newPath);
      const blockInstance = (route as any)._block;
      const unmountSpy = jest.spyOn(blockInstance, 'dispatchComponentDidUnMount');
      
      // Имитируем переход назад
      window.dispatchEvent(new PopStateEvent('popstate', {
        state: { route: initialPath }
      }));
      
      expect(unmountSpy).toHaveBeenCalled();
      expect((route as any)._block).toBeNull();
    });

    it('should restore previous route on back', () => {
      route.navigate(newPath);
      expect(route.pathname()).toBe(newPath);
      
      // Имитируем переход назад
      window.dispatchEvent(new PopStateEvent('popstate', {
        state: { route: initialPath }
      }));
      
      expect(route.pathname()).toBe(initialPath);
    });
  });

  describe('Integrated Navigation Flow', () => {
    it('should handle complete forward-back cycle', () => {
      // Исходное состояние
      expect(route.pathname()).toBe(initialPath);
      
      // Шаг 1: Переход вперед
      route.navigate(newPath);
      expect(route.pathname()).toBe(newPath);
      expect(window.history.pushState).toHaveBeenCalled();
      
      // Шаг 2: Переход назад
      window.dispatchEvent(new PopStateEvent('popstate', {
        state: { route: initialPath }
      }));
      expect(route.pathname()).toBe(initialPath);
      
      // Шаг 3: Переход вперед снова
      route.navigate(newPath);
      expect(route.pathname()).toBe(newPath);
    });

    it('should handle multiple consecutive back navigations', () => {
      const path1 = '/page1';
      const path2 = '/page2';
      
      // Создаем историю: initial -> page1 -> page2
      route.navigate(path1);
      route.navigate(path2);
      
      // Первый back
      window.dispatchEvent(new PopStateEvent('popstate', {
        state: { route: path1 }
      }));
      expect(route.pathname()).toBe(path1);
      
      // Второй back
      window.dispatchEvent(new PopStateEvent('popstate', {
        state: { route: initialPath }
      }));
      expect(route.pathname()).toBe(initialPath);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty state in popstate', () => {
      expect(() => {
        window.dispatchEvent(new PopStateEvent('popstate'));
      }).not.toThrow();
    });

    it('should ignore popstate for non-matching routes', () => {
      const renderSpy = jest.spyOn(route, 'render');
      
      window.dispatchEvent(new PopStateEvent('popstate', {
        state: { route: '/unknown' }
      }));
      
      expect(renderSpy).not.toHaveBeenCalled();
    });

    it('should handle duplicate forward navigations', () => {
      route.navigate(newPath);
      jest.clearAllMocks(); // Сброс счетчиков
      
      // Повторный переход на тот же путь
      route.navigate(newPath);
      expect(window.history.pushState).not.toHaveBeenCalled();
    });
  });
});