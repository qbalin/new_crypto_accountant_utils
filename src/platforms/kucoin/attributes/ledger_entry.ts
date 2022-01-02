interface LedgerEntry {
  id: string,
  currency: string,
  amount: string,
  fee: string,
  balance: string,
  accountType: 'MAIN' | 'TRADE' | 'MARGIN' | 'CONTRACT',
  bizType: 'Withdrawal' | 'Transfer' | 'Exchange' | 'Deposit' | 'Rewards' | 'Staking' | 'Convert to KCS' | 'Soft Staking Profits' | 'Staking Profits' | 'Redemption' | 'EARN - Profits' | 'EARN - Subscription',
  direction: 'out' | 'in',
  createdAt: number,
  context: string | null,
}

export default LedgerEntry;