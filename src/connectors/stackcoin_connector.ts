import { CurrencyConnector, DiscordSnowflake } from '../types';

export default class StackCoinConnector implements CurrencyConnector {
  currencyName = 'StackCoin';
  currencyCode = 'stk';

  async getBalance(user: DiscordSnowflake): Promise<number> {
    throw new Error('Method not implemented.');
  }
  async addBalance(user: DiscordSnowflake, amount: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
  async getTotalInCirculation(): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
