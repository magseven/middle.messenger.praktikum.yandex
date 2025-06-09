import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // или 'node' для серверных проектов
  
  // Где искать тесты
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // Игнорируемые пути
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/.next/' // для Next.js
  ],
  
  // Настройки модулей
  moduleNameMapper: {
    // Для обработки CSS/SCSS модулей (нужен identity-obj-proxy)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    
    // Для статических файлов
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    
    // Алиасы из tsconfig (если используете)
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // Настройки TypeScript
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  
  // Глобальные настройки
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Покрытие кода
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!src/**/index.ts', // игнорировать файлы-экспорты
    '!src/**/*.stories.tsx' // игнорировать Storybook-файлы
  ],
  
  // Дополнительные флаги
  clearMocks: true,
  restoreMocks: true
};

export default config;

