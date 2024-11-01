interface Product {
  readonly id: string,
  readonly base_currency: string,
  readonly quote_currency: string,
  readonly base_min_size: string,
  readonly base_max_size: string,
  readonly quote_increment: string,
  readonly base_increment: string,
  readonly display_name: string,
  readonly min_market_funds: string,
  readonly max_market_funds: string,
  readonly margin_enabled: boolean,
  readonly fx_stablecoin: boolean,
  readonly max_slippage_percentage: string,
  readonly post_only: boolean,
  readonly limit_only: boolean,
  readonly cancel_only: boolean,
  readonly trading_disabled: boolean,
  readonly status: string,
  readonly status_message: string,
  readonly auction_mode: boolean,
}

export default Product;