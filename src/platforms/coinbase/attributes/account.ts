interface Account {
  readonly id: string,
  readonly currency: string,
  readonly balance: string,
  readonly hold: string,
  readonly available: string,
  readonly profile_id: string,
  readonly trading_enabled: boolean,
}

export default Account;