import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, summDeposits, summWithdrow }) => (
  <section className={styles.balance}>
    <span className={styles.summHistory} role="img" aria-label="arrow-up">
      ⬆️ {summDeposits} $
    </span>
    <span className={styles.summHistory} role="img" aria-label="arrow-down">
      ⬇️ {summWithdrow} $
    </span>
    <span className={styles.summHistory}> Balance: {balance} $</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  summDeposits: PropTypes.number.isRequired,
  summWithdrow: PropTypes.number.isRequired,
};

export default Balance;
