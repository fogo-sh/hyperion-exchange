import express, { Request, Response } from 'express';
import ConnectorManager from './connectors/connector_manager';
import { isErrorDetail } from './types';

const server = express();
const connectorManager = new ConnectorManager();

server.get('/api/user/:user', async (req: Request, resp: Response) => {
  resp.json(await connectorManager.getUser(req.params.user));
});

server.get(
  '/api/user/:user/:shortcode',
  async (req: Request, resp: Response) => {
    const responseDetails = await connectorManager.getBalanceForUser(
      req.params.user,
      req.params.shortcode,
    );
    if (isErrorDetail(responseDetails)) {
      resp.status(responseDetails.statusCode);
    }
    resp.json(responseDetails);
  },
);

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
