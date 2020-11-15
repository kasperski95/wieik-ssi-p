import express, { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { APIException } from './exception';

type ExpressApp = ReturnType<typeof express>;
type Handler = (req: Request, res: Response) => Promise<void>;
type TokenToRoleMapper<T> = (token: string) => Promise<T | undefined>;
type EndpointMethod<T> = (
  handler: Handler,
  options?: { routeSuffix?: string; authorize?: T[] }
) => ExpressApp;

export abstract class AbstractEndpoint<T> {
  protected app: ExpressApp;
  private apiVersion?: string;
  private mapTokenToRole: TokenToRoleMapper<T>;

  constructor(protected route: string) {}

  abstract main(): void;

  addTo(app: ExpressApp) {
    this.app = app;
    this.main();
    return app;
  }

  get: EndpointMethod<T> = (handler, options) => {
    const route = this.getRoute() + (options?.routeSuffix || '');

    if (options?.authorize) this.authorize(route, options.authorize);

    this.app.get(route, async (req, res) => {
      await this.handleExceptions(handler, [req, res]);
    });
    return this.app;
  };

  post: EndpointMethod<T> = (handler, options) => {
    const route = this.getRoute() + (options?.routeSuffix || '');

    if (options?.authorize) this.authorize(route, options.authorize);

    this.app.post(route, async (req, res) => {
      await this.handleExceptions(handler, [req, res]);
    });
    return this.app;
  };

  setAPIVersion(version: string) {
    this.apiVersion = version;
    return this;
  }

  setTokenToRoleMapper(tokenToRoleMapper: TokenToRoleMapper<T>) {
    this.mapTokenToRole = tokenToRoleMapper;
    return this;
  }

  private async authorize(route: string, roles: T[]) {
    this.app.use(route, async (req, res, next) => {
      if (!this.mapTokenToRole)
        throw new Error('tokenToRoleMapper is undefined');

      const token = req.headers.authorization?.replace('Bearer', '');

      if (!roles.includes(await this.mapTokenToRole(token))) {
        res.statusCode = StatusCodes.UNAUTHORIZED;
        res.send(getReasonPhrase(StatusCodes.UNAUTHORIZED));
        return;
      }
      next();
    });
  }

  private async handleExceptions(handler: Handler, args: Parameters<Handler>) {
    try {
      await handler(...args);
    } catch (e) {
      if (e instanceof APIException) {
        args[1].statusCode = e.statusCode;
        args[1].send(e.message);
      } else {
        throw e;
      }
    }
  }

  private getRoute() {
    return '/' + (this.apiVersion ? this.apiVersion + '/' : '') + this.route;
  }
}
