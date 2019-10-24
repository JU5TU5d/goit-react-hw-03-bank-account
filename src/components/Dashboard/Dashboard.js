/*eslint-disable*/
import React, { Component } from 'react';
import shortid from 'shortid';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import transactionAlert from '../transactionAlert';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TansactionHistory from '../TransactionHistory/TransactionHistory';
import styles from './Dashboard.module.css';

const stateSum = items => {
  const depositsArr = items.filter(el => el.type === 'Deposits');
  const depositsSumm = depositsArr.reduce(
    (acc, el) => (acc += el.inputValue),
    0,
  );
  const withdrowArr = items.filter(el => el.type === 'Withdrow');
  const withdrowSumm = withdrowArr.reduce(
    (acc, el) => (acc += el.inputValue),
    0,
  );
  const newBalance = depositsSumm - withdrowSumm;

  const stateObj = {
    balance: newBalance,
    deposits: depositsSumm,
    withdrow: withdrowSumm,
  };
  return stateObj;
};

class Dashboard extends Component {
  state = {
    inputValue: '',
    transactions: [],
    balance: 0,
    deposits: 0,
    withdrow: 0,
  };

  componentDidMount() {
    if (localStorage.getItem('transactions')) {
      const transactions = localStorage.getItem('transactions');
      this.setState({
        transactions: JSON.parse(transactions),
        balance: stateSum(JSON.parse(transactions)).balance,
        deposits: stateSum(JSON.parse(transactions)).deposits,
        withdrow: stateSum(JSON.parse(transactions)).withdrow,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions } = this.state;
    if (prevState.transactions !== transactions) {
      this.setState({
        balance: stateSum(transactions).balance,
        deposits: stateSum(transactions).deposits,
        withdrow: stateSum(transactions).withdrow,
      });
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }

  hendleGetValue = e => {
    this.setState({ inputValue: e.target.value });
  };

  hendleDeposits = () => {
    const { inputValue } = this.state;
    const numberValue = Number(inputValue);
    if (numberValue > 0) {
      const createObj = {
        id: shortid.generate(),
        date: new Date().toLocaleString(),
        inputValue: numberValue,
        type: 'Deposits',
      };
      this.setState(state => ({
        transactions: [...state.transactions, createObj],
      }));
      this.resetInput();
      toast.success(transactionAlert.success);
    } else {
      toast.error(transactionAlert.incorrectValue);
    }
  };

  hendleWithdrow = () => {
    const { inputValue, balance } = this.state;
    const numberValue = Number(inputValue);
    if (numberValue <= 0) {
      toast.error(transactionAlert.incorrectValue);
    } else if (balance >= numberValue) {
      const createObj = {
        id: shortid.generate(),
        date: new Date().toLocaleString(),
        inputValue: numberValue,
        type: 'Withdrow',
      };
      this.setState(state => ({
        transactions: [...state.transactions, createObj],
      }));
      this.resetInput();
      toast.success(transactionAlert.success);
    } else {
      toast.error(transactionAlert.noMoney);
    }
  };

  resetInput = () => {
    this.setState({
      inputValue: '',
    });
  };

  render() {
    const {
      balance,
      withdrow,
      deposits,
      transactions,
      inputValue,
    } = this.state;
    return (
      <div className={styles.deshboard}>
        <Controls
          inputValue={inputValue}
          hendleGetValue={this.hendleGetValue}
          hendleDeposits={this.hendleDeposits}
          hendleWithdrow={this.hendleWithdrow}
        />
        <Balance
          className={styles.controls}
          balance={balance}
          summDeposits={deposits}
          summWithdrow={withdrow}
        />
        <TansactionHistory
          className={styles.transactions}
          transactions={transactions}
        />
        <ToastContainer closeButton={false} />
      </div>
    );
  }
}

export default Dashboard;
