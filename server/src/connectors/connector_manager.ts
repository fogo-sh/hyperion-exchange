import {
  CurrencyConnector,
  Dictionary,
  DiscordSnowflake,
  UserDetails,
  BalanceDetails,
  ErrorDetails,
  CurrencyDetails,
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
    const balances: Dictionary<number | null> = {};
    const balancePromises: Array<Promise<[string, number | null]>> = [];

    for (const [code, connector] of Object.entries(this.connectors)) {
      balancePromises.push(
        (async (): Promise<[string, number | null]> => {
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

  /**
   * Retrieves balance of a certain currency for a user.
   * @param user The user to get balance for.
   * @param shortcode The shortcode of the currency to get balance of.
   * @returns The user's balance, or an error response if we are unable to retrieve it.
   */
  async getBalanceForUser(
    user: DiscordSnowflake,
    shortcode: string,
  ): Promise<BalanceDetails | ErrorDetails> {
    if (!(shortcode in this.connectors)) {
      return { error: 'Invalid currency shortcode.', statusCode: 404 };
    }
    const balance = await this.connectors[shortcode].getBalance(user);
    return { user, balance };
  }

  /**
   * Retrieve a list of all currencies and their associated details.
   * @returns The details of all currencies with connectors.
   */
  getCurrencyList(): Array<CurrencyDetails> {
    return Object.values(this.connectors).map(
      (connector): CurrencyDetails => {
        return {
          name: connector.currencyName,
          shortCode: connector.currencyCode,
          site: connector.currencySite,
        };
      },
    );
  }
}
