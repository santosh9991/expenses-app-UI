
import './expensesTable.css';
import { formatDateToMMDDYYYY } from '../utils/commonUtils';
const ExpensesTable = ({expensesList, handleEdit, handleDelete})=>{
    return (<div className='expenses-list'>
    {/* <ul>
           {expensesList && expensesList.map((expense)=>{
            return <li> <div className='expense-list-item' key={expense._id}><h3>CreatedAt: {formatDateToMMDDYYYY(new Date(expense.createdAt))}</h3><h3>Merchant:{expense.merchant}</h3> <h3>Category:{expense.category} </h3><h3>Amount:{expense.amount}</h3></div></li>
           })}            
    </ul> */}
    <table>
        <thead>
            <tr>
            <th>Purchase Date</th>
            <th>Category</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Description</th>
            </tr>
        </thead>
        <tbody>
        {expensesList && expensesList.map((expense)=>{
            return (
              <tr key={expense._id}>
                <td>
                  {formatDateToMMDDYYYY(new Date(expense.purchaseDate))}
                </td>
                <td>{expense.merchant}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>
                  <button onClick={()=>{
                    return handleEdit(expense._id)
                    }}>edit</button>
                  <button onClick={()=>handleDelete(expense._id)}>delete</button>
                </td>
              </tr>
            );
           })} 
        </tbody>
    </table>
    </div>)
}
export default ExpensesTable;