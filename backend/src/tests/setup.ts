import { jest,  } from '@jest/globals';

// Define the type for the fetch mock
global.fetch = jest.fn() as unknown as typeof fetch;

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled Promise Rejection:', error);
});