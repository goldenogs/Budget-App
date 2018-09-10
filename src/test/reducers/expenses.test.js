import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses'
import moment from 'moment';

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
})

test('should remove expense by id', () => {
  const action = {
      type: 'REMOVE_EXPENSE',
      id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
})

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
  });

  test('should add an expense', () => {
      const addon = {
          id: '11111',
          description: 'addon',
          amount: 220000,
          createdAt: moment(0).add(10, 'day'),
          note: ''
      };
      const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense: addon});
      expect(state).toEqual([...expenses, addon]);

  })

  test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount: 2000000
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toBe(2000000);
  })

  test('should not edit an expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            amount: 2000000
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
  })

  