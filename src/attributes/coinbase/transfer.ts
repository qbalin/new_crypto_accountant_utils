interface Details {
  readonly fee?: string,
  readonly subtotal?: string,
  readonly cancel_code?: string
  readonly is_instant_usd?: string
  readonly sent_to_address?: string,
  readonly coinbase_payout_at?: string
  readonly coinbase_account_id: string,
  readonly coinbase_deposit_id?: string
  readonly coinbase_withdrawal_id?: string,
  readonly coinbase_transaction_id?: string,
  readonly crypto_transaction_hash?: string,
  readonly coinbase_payment_method_id: string,
  readonly coinbase_payment_method_type?: string
}

interface Transfer {
  readonly id: string
  readonly type: 'deposit' | 'withdraw'
  readonly created_at: string
  readonly completed_at: string | null
  readonly canceled_at: string | null
  readonly processed_at: string | null
  readonly account_id: string
  readonly user_id: string
  readonly user_nonce: string
  readonly amount: string
  readonly details: Details
  readonly idem: null
}

export default Transfer;