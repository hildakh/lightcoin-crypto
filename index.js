let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
    // this.balance = 0;     // Removed as balance has been added as a getter
  }

  get balance() {
    let balance = 0;
    for (let tran of this.transactions) {
      balance += tran.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }
}

const myAccount = new Account('chapeau-rouge');
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

console.log('Username:', myAccount.username);
console.log('Starting Balance:', myAccount.balance);
console.log('Attempting to withdraw even $1 should fail...');
const t5 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t5.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t6 = new Deposit(100, myAccount);
console.log('Commit result:', t6.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for $100 should be allowed...');
const t7 = new Withdrawal(100, myAccount);
console.log('Commit result:', t7.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Ending account balance: ', myAccount.balance);
console.log('Hmm...Nothing left in my account :(');

console.log('Account transaction history: ', myAccount.transactions);


//Second Round Tests after creating the account
// const t1 = new Deposit(200, myAccount);
// t1.commit();
// console.log('Balance:', myAccount.balance);

// const t2 = new Withdrawal(50, myAccount);
// t2.commit();
// console.log('Last Balance:', myAccount.balance);



/* First round tests
// t1 = new Withdrawal(50.25, myAccount);
// t1.commit();
// console.log('Transaction 1:', t1);

// t2 = new Withdrawal(9.99, myAccount);
// t2.commit();
// console.log('Transaction 2:', t2);
// console.log('Balance:', balance);

// t3 = new Deposit(100, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3);
// console.log('Balance:', balance);
*/
