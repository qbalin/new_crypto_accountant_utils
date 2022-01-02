import NormalTransaction from './normal_transaction';
import InternalTransaction from './internal_transaction';
import TokenTransaction from './token_transaction';

interface EtherscanLikeAttributes {
  NormalTransaction: NormalTransaction,
  InternalTransaction: InternalTransaction,
  TokenTransaction: TokenTransaction,
}

export default EtherscanLikeAttributes;