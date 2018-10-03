import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisisuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt}) => {
    expensesData[id] = { description, note, amount, createdAt};
  })
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})

test('should setup remove expense action object', () => {
    const action = removeExpense( {id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should remove expense from database', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
})

test('should update notes', () => {
    const action = editExpense('111222', {notes: 'hi im update'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '111222',
        updates: {
            notes: 'hi im update'
        }
    })
})

test('test', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = { amount: 21045};
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  })
})
test('testing addexpense with no data', () => {
    const action = (addExpense(expenses[2]));
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
})

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'This one is better',
      createdAt: 1000
    };
  
    store.dispatch(startAddExpense(expenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
  
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
  });
  
  test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaults = {
      description: '',
      amount: 0,
      note: '',
      createdAt: 0
    };
  
    store.dispatch(startAddExpense({})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });
  
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
  });

  test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
  })

  test('should fetch data correctly', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });
      done();
    })
  })