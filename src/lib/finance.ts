import type { Transaction } from '../types';

export function summarizeTransactions(transactions: readonly Transaction[]) {
  return transactions.reduce((totals, transaction) => {
    if (!Number.isFinite(transaction.amount) || transaction.amount < 0) return totals;
    if (transaction.type === 'income') totals.income += transaction.amount;
    else totals.expenses += transaction.amount;
    return totals;
  }, { income: 0, expenses: 0 });
}

export function applyTransactionToBalance(balance: number, amount: number, type: Transaction['type']): number {
  if (!Number.isFinite(balance) || !Number.isFinite(amount) || amount < 0) return balance;
  return Math.max(0, balance + (type === 'expense' ? -amount : amount));
}

function escapeCsv(value: unknown): string {
  const text = String(value ?? '');
  return /[\",\r\n]/.test(text) ? `\"${text.replace(/\"/g, '\"\"')}\"` : text;
}

export function transactionsToCsv(transactions: readonly Transaction[]): string {
  const rows: unknown[][] = [
    ['ID', 'Name', 'Category', 'Type', 'Amount (PHP)', 'Date', 'PaymentMethod', 'Note'],
    ...transactions.map(t => [t.id, t.name, t.category, t.type, t.amount, t.date, t.paymentMethod, t.note ?? '']),
  ];
  return rows.map(row => row.map(escapeCsv).join(',')).join('\r\n');
}
