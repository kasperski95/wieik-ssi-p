import express, { Request, Response } from 'express';
import { APIException } from './exception';

type ExpressApp = ReturnType<typeof express>;
type Handler = (req: Request, res: Response) => Promise<void>;
type EndpointMethod = (
  handler: Handler,
  options?: { routeSuffix?: string }
) => ExpressApp;

export abstract class AbstractEndpoint {
  protected app: ExpressApp;
  private apiVersion?: string;

  constructor(protected route: string) {}

  abstract main(): void;

  addTo(app: ExpressApp) {
    this.app = app;
    this.main();
    return app;
  }

  get: EndpointMethod = (handler, options) => {
    this.app.get(
      this.getRoute() + (options?.routeSuffix || ''),
      async (req, res) => {
        await this.handleExceptions(handler, [req, res]);
      }
    );
    return this.app;
  };

  post: EndpointMethod = (handler, options) => {
    this.app.post(
      this.getRoute() + (options?.routeSuffix || ''),
      async (req, res) => {
        await this.handleExceptions(handler, [req, res]);
      }
    );
    return this.app;
  };

  setAPIVersion(version: string) {
    this.apiVersion = version;
    return this;
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
