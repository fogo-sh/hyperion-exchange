import {
  CurrencyConnector,
  Dictionary,
  DiscordSnowflake,
  UserDetails,
} from '../types';
import StackCoinConnector from './stackcoin_connector';

export default class ConnectorManager {
  private connectors: Dictionary<CurrencyConnector> = {};

  constructor() {
    const connectorObjs: Array<CurrencyConnector> = [new StackCoinConnector()];

    for (const connector of connectorObjs) {
      this.connectors[connector.currencyCode] = connector;
    }
  }

  async getUser(user: DiscordSnowflake): Promise<UserDetails> {
    const balances: Dictionary<number> = {};
    const balancePromises: Array<Promise<[string, number]>> = [];

    for (const [code, connector] of Object.entries(this.connectors)) {
      balancePromises.push(
        (async (): Promise<[string, number]> => {
          const balance = await connector.getBalance(user);
          return [code, balance];
        })(),
      );
    }
    
    const entries = await Promise.all(balancePromises);
    for (const [code, balance] of entries) {
      balances[code] = balance;
    }
    return { user, balances };
  }
}
