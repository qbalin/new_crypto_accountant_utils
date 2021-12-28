import Account from './account';
import Conversion from './conversion';
import Fill from './fill';
import Product from './product';
import Transfer from './transfer';
interface CoinbaseAttributes {
    Account: Account;
    Conversion: Conversion;
    Fill: Fill;
    Product: Product;
    Transfer: Transfer;
}
export default CoinbaseAttributes;
