/**
 * Represents a snowflake of a Discord object.
 */
export type DiscordSnowflake = string | number;

/**
 * Interface representing a connector to interact with a currency API.
 */
export interface CurrencyConnector {
  /**
   * The full, user-friendly display name of the currency this connector interacts with.
   * @readonly
   */
  readonly currencyName: string;
  /**
   * A short code used to refer to the currency this connector interacts with.
   * @readonly
   */
  readonly currencyCode: string;

  /**
   * Retrieve the amount of this currency a given user has.
   * @param user The user to retrieve a balance for.
   * @returns The user's balance of this currency.
   */
  getBalance(user: DiscordSnowflake): Promise<number>;
  /**
   * Modify the balance of this currency for a given user.
   * @param user The user to modify the balance for.
   * @param amount The amount to change the user's balance by (positive to add, negative to subtract).
   * @returns The user's new balance.
   */
  addBalance(user: DiscordSnowflake, amount: number): Promise<number>;
  /**
   * Retrieves the total amount of this currency in circulation.
   * @returns The combined balances of all users of this currency.
   */
  getTotalInCirculation(): Promise<number>;
}

/**
 * Utility type to represent a typical string to object dictionary.
 * @typeparam T The type of value that is associated with keys for this dictionary.
 */
export type Dictionary<T> = {
  [key: string]: T;
};
