import { CurrencyConnector, Dictionary } from '../types';

export default class ConnectorManager {
  connectors: Dictionary<CurrencyConnector> = {};

  constructor() {}
}
