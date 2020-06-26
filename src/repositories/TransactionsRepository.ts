import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    // const balance
    const { income, outcome } = this.transactions.reduce((accumulator: Balance, transaction: Transaction) => {

      transaction.type === 'income'
        ? accumulator.income += transaction.value
        : accumulator.outcome += transaction.value;

      return accumulator;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    // balance.total = balance.income - balance.outcome;

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;