import express, { Request, Response, static as useStatic } from 'express';
import { config as setupDotenv } from 'dotenv';
import ConnectorManager from './connectors/connector_manager';
import { isErrorDetail, ValidDetails } from './types';
import { join } from 'path';

setupDotenv({
  path: join(__dirname, '..', '..', '.env'),
});

const server = express();
const connectorManager = new ConnectorManager();

server.use(useStatic(join(__dirname, '..', '..', 'frontend', 'build')));

/**
 * Wraps a callback function, handling error responses from it.
 * @param callback The function to wrap.
 * @returns The wrapped function, suitable for use as an express callback.
 */
function wrapApiRoute(
  callback: (req: Request, resp: Response) => Promise<ValidDetails>,
): (req: Request, resp: Response) => Promise<undefined> {
  return async (req: Request, resp: Response): Promise<undefined> => {
    const responseData = await callback(req, resp);
    if (isErrorDetail(responseData)) {
      resp.status(responseData.statusCode);
    }
    resp.json(responseData);
    return;
  };
}

server.get(
  '/api/users/:user',
  wrapApiRoute(async (req: Request, resp: Response) => {
    return connectorManager.getUser(req.params.user);
  }),
);

server.get(
  '/api/users/:user/:shortcode',
  wrapApiRoute(async (req: Request, resp: Response) => {
    return connectorManager.getBalanceForUser(
      req.params.user,
      req.params.shortcode,
    );
  }),
);

server.get(
  '/api/currencies/:shortcode',
  wrapApiRoute(async (req: Request, resp: Response) => {
    return connectorManager.getAllBalances(req.params.shortcode);
  }),
);

server.get('/api/currencies/', (req: Request, resp: Response) => {
  resp.json(connectorManager.getCurrencyList());
});

server.get('*', (req: Request, resp: Response) => {
  resp.sendFile(join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
