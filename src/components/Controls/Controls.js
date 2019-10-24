import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

const Controls = ({
  hendleGetValue,
  hendleDeposits,
  hendleWithdrow,
  inputValue,
}) => {
  return (
    <section className={styles.controls}>
      <input
        className={styles.input}
        type="number"
        name="value"
        onChange={e => hendleGetValue(e)}
        placeholder="0"
        value={inputValue}
      />
      <button type="button" onClick={hendleDeposits}>
        Deposit
      </button>
      <button type="button" onClick={hendleWithdrow}>
        Withdraw
      </button>
    </section>
  );
};

Controls.propTypes = {
  hendleGetValue: PropTypes.func.isRequired,
  hendleDeposits: PropTypes.func.isRequired,
  hendleWithdrow: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};
export default Controls;
