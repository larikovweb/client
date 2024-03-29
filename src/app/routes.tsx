import { AUTH_ROUTE, MAIN_ROUTE, PARTNERSHIP_ROUTE } from '../utils';
import { Pages } from '../pages';
export interface RouteType {
  path: string;
  component: JSX.Element;
}

export const publicRoutes: RouteType[] = [
  { path: MAIN_ROUTE, component: <Pages.Main /> },
  { path: AUTH_ROUTE, component: <Pages.Auth /> },
];

export const privateRoutes: RouteType[] = [
  { path: PARTNERSHIP_ROUTE, component: <Pages.Partner /> },
];
