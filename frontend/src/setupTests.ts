import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for jsdom + react-router-dom
import { TextEncoder, TextDecoder } from 'util';

Object.defineProperty(globalThis, 'TextEncoder', {
  writable: true,
  value: TextEncoder,
});

Object.defineProperty(globalThis, 'TextDecoder', {
  writable: true,
  value: TextDecoder,
});