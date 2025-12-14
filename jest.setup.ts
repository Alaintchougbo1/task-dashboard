import '@testing-library/jest-dom';

jest.mock('zustand/middleware', () => ({
  persist: (config: unknown) => config,
}));