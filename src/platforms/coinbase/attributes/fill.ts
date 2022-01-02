interface Fill {
  readonly created_at: string,
  readonly trade_id: number,
  readonly product_id: string,
  readonly order_id: string,
  readonly user_id: string,
  readonly profile_id: string,
  readonly liquidity: string,
  readonly price: string,
  readonly size: string,
  readonly fee: string,
  readonly side: 'buy' | 'sell',
  readonly settled: boolean,
  readonly usd_volume: string,
}

export default Fill;