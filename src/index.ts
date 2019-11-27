import express, { Request, Response } from 'express';
import ConnectorManager from './connectors/connector_manager';

const server = express();
const connectorManager = new ConnectorManager();

server.get('/api/user/:user', async (req: Request, resp: Response) => {
  resp.json(await connectorManager.getUser(req.params.user));
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
