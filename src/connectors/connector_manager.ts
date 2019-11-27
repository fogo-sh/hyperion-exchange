import {
  CurrencyConnector,
  Dictionary,
  DiscordSnowflake,
  UserDetails,
} from '../types';
import StackCoinConnector from './stackcoin_connector';

/**
 * Helper class for interacting with each currency's respective [[CurrencyConnector]].
 */
export default class ConnectorManager {
  /**
   * Mapping of currency shortcodes to their respective connectors.
   */
  private connectors: Dictionary<CurrencyConnector> = {};

  /**
   * Instantiates a new ConnectorManager.
   */
  constructor() {
    const connectorObjs: Array<CurrencyConnector> = [new StackCoinConnector()];

    for (const connector of connectorObjs) {
      this.connectors[connector.currencyCode] = connector;
    }
  }

  /**
   * Retrieves details for a given user.
   * @param user The user to get details for.
   * @returns The user's details and balances.
   */
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
