class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transcration = [];
  }
  get balance() {
    let balance = 0;
    for (let elem of this.transcration) {
      balance += elem.value;
    }
    return balance;
  }

  addTranscration(transcration) {
    this.transcration.push(transcration);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      console.log("Your Account does not have enough money");
    } else {
      this.time = new Date();
      this.account.addTranscration(this);
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    if (this.account.balance - this.amount <= 0) {
      return false;
    } else {
      return true;
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log("Transaction 1:", t1);
console.log("Balance:", myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log("Transaction 2:", t2);

console.log("Balance:", myAccount.balance);

t3 = new Deposit(120.0, myAccount);
t3.commit();
console.log("Transaction 3:", t3);
console.log("Balance:", myAccount.balance);
