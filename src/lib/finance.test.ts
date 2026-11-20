import { describe, expect, it } from 'vitest';
import type { Transaction } from '../types';
import { applyTransactionToBalance, summarizeTransactions, transactionsToCsv } from './finance';

const tx = (overrides: Partial<Transaction> = {}): Transaction => ({ id: 'tx-1', name: 'Lunch', category: 'Food', categoryIcon: 'restaurant', type: 'expense', amount: 120, date: '2026-11-18', paymentMethod: 'Cash', ...overrides });

describe('finance helpers', () => {
  it('summarizes income and expenses without mutating records', () => {
    const data = [tx(), tx({ id: 'tx-2', type: 'income', amount: 500 })];
    expect(summarizeTransactions(data)).toEqual({ income: 500, expenses: 120 });
    expect(data).toHaveLength(2);
  });
  it('ignores invalid and negative transaction amounts', () => {
    expect(summarizeTransactions([tx({ amount: -1 }), tx({ amount: Number.NaN }), tx({ type: 'income', amount: 25 })])).toEqual({ income: 25, expenses: 0 });
  });
  it('returns zero totals for an empty ledger', () => expect(summarizeTransactions([])).toEqual({ income: 0, expenses: 0 }));
  it('clamps expense balance at zero and adds income', () => {
    expect(applyTransactionToBalance(10, 30, 'expense')).toBe(0);
    expect(applyTransactionToBalance(100, 50, 'income')).toBe(150);
  });
  it('rejects negative amounts and preserves the original balance', () => expect(applyTransactionToBalance(100, -5, 'income')).toBe(100));
  it('serializes stable columns and escapes CSV special characters', () => {
    expect(transactionsToCsv([tx({ name: 'Lunch, "special"\nset', note: undefined })])).toContain('"Lunch, ""special""\nset"');
    expect(transactionsToCsv([tx()])).toContain('tx-1,Lunch,Food,expense,120,2026-11-18,Cash,');
  });
});
