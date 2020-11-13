import express, { Request, Response } from 'express';
import { Exception } from './exception';

type ExpressApp = ReturnType<typeof express>;
type Handler = (req: Request, res: Response) => Promise<void>;
type EndpointMethod = (
  handler: Handler,
  options?: { route?: string }
) => ExpressApp;

export abstract class AbstractEndpoint {
  protected app: ExpressApp;

  constructor(protected route: string) {}

  abstract main(): void;

  addTo(app: ExpressApp) {
    this.app = app;
    this.main();
    return app;
  }

  get: EndpointMethod = (handler, options) => {
    this.app.get(options?.route || this.route, async (req, res) => {
      await this.handleExceptions(handler, [req, res]);
    });
    return this.app;
  };

  post: EndpointMethod = (handler, options) => {
    this.app.post(options?.route || this.route, async (req, res) => {
      await this.handleExceptions(handler, [req, res]);
    });
    return this.app;
  };

  async handleExceptions(handler: Handler, args: Parameters<Handler>) {
    try {
      await handler(...args);
    } catch (e) {
      if (e instanceof Exception) {
        args[1].statusCode = e.statusCode;
        args[1].send(e.message);
      } else {
        throw e;
      }
    }
  }
}
