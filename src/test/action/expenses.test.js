import {addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense( {id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

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

test('testing addexpense with no data', () => {
    const action = (addExpense({}));
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
})