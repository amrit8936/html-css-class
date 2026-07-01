function createBankAccount(initialBalance) {
    let balance = initialBalance;
    return {
        deposit(amount) {
            balance += amount;
            console.log(`Deposited INR ${amount}`);
        },
        withdraw(amount) {
            if (amount > balance) {
                console.log('Insufficient funds');
                return;
            }
            balance -= amount;
            console.log(`Withdrew INR ${amount}`);
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
account.deposit(50);
console.log(account.getBalance());