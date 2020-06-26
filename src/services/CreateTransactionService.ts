import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    
    // if(type !== 'income' && type !== 'outcome') {
      // throw Error('The type must be income or outcome');
    // }
    if(!['income','outcome'].includes(type)) {
      throw Error('The type must be income or outcome');
    }

    // const total = this.transactionsRepository.getBalance().total;
    const { total } = this.transactionsRepository.getBalance();
    
    if(type === 'outcome' && value > total) {
        throw Error('The outcome value cannot be greater than the total income value');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;