export default interface Transaction {
    id: string,
    reference_id: string,
    amount: number,
    transaction_type: string,
    date: Date
}