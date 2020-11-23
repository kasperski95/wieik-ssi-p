export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
} as const;

export const endpoints = {
  auth: 'auth',
  car: 'car',
  brand: 'brand',
  track: 'track',
  user: 'user',
  setup: 'setup',
} as const;

export const setups = process.env.REACT_APP_SETUPS;
