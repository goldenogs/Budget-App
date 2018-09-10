export default (expenses) => {
    const total = expenses.reduce((sum, value) => {
        return sum + value.amount
    }, 0)
    return total
}