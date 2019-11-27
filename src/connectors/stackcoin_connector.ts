import request from 'request-promise-native';

import { CurrencyConnector, DiscordSnowflake, Dictionary } from '../types';

/**
 * Type representing the API response for requesting an individual user's balance.
 */
type BalanceResponse = {
  id: DiscordSnowflake;
  bal: string;
};

/**
 * Type representing the API response for requesting all user's balances.
 */
type AllBalancesResponse = Dictionary<{
  bal: string;
}>;

/**
 * API connector to connect to the StackCoin API.
 */
export default class StackCoinConnector implements CurrencyConnector {
  /**
   * The full, user-friendly display name of the currency this connector interacts with.
   * @readonly
   */
  readonly currencyName = 'StackCoin';
  /**
   * A short code used to refer to the currency this connector interacts with.
   * @readonly
   */
  readonly currencyCode = 'stk';

  /**
   * Retrieve the amount of this currency a given user has.
   * @param user The user to retrieve a balance for.
   * @returns The user's balance of this currency.
   */
  async getBalance(user: DiscordSnowflake): Promise<number> {
    const balanceResponse: BalanceResponse = await request.get({
      uri: `https://stackcoin.world/user/${user}`,
      json: true,
    });
    return parseInt(balanceResponse.bal, 10);
  }

  /**
   * Modify the balance of this currency for a given user.
   * @param user The user to modify the balance for.
   * @param amount The amount to change the user's balance by (positive to add, negative to subtract).
   * @returns The user's new balance.
   */
  async addBalance(user: DiscordSnowflake, amount: number): Promise<number> {
    throw new Error('Method not implemented.');
  }

  /**
   * Retrieves the total amount of this currency in circulation.
   * @returns The combined balances of all users of this currency.
   */
  async getTotalInCirculation(): Promise<number> {
    const allBalancesResponse: AllBalancesResponse = await request.get({
      uri: 'https://stackcoin.world/user/',
      json: true,
    });
    return Object.values(allBalancesResponse)
      .map((balance: { bal: string }): number => parseInt(balance.bal))
      .reduce((total: number, balance: number) => total + balance);
  }
}
