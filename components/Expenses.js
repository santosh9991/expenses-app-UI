import { useEffect, useState } from 'react';
import './expenses.css'
import axios from 'axios';
import {formatDateToMMDDYYYY, getUpdatedReqBody} from '../utils/commonUtils'
import AddExpense from './AddExpense';
import ExpensesTable from './ExpensesTable';
import { useNavigate } from 'react-router';
export default Expenses = ()=>{
    const [formData,setFormData] = useState({
        amount:'',
        category:'',
        merchant: '',
        purchaseDate: '',
        description: ''
    });
    const navigate = useNavigate();
    const [expensesList, setExpensesList]=useState([]);
    const handleFormData = (e)=>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = 'https://jobs-tracker-api-ry52.onrender.com/api/v1/expenses'
        const token = localStorage.getItem('token');
        try{
            const data = await axios.post(url,
                formData,
                {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }});
            getAllExpenses();
        }
        catch(error){
            console.log('error', error);
        } 
    }
    const getAllExpenses = async ()=>{
        const url = 'https://jobs-tracker-api-ry52.onrender.com/api/v1/expenses';
        const token = localStorage.getItem('token')
        try{
            const data = await axios.get(url,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }});
            setExpensesList(data.data.expenses)

            console.log('data',data);
        } 
        catch(error){
            console.log('error', error);
        }
    }
    const handleEdit = async (expenseId)=>{
        //edit the selected item
        navigate(`/expenses/edit/${expenseId}`)
        
    }
    const handleDelete = async (expenseId)=>{
        const url = `https://jobs-tracker-api-ry52.onrender.com/api/v1/expenses/${expenseId}`;
        const token = localStorage.getItem('token');
        const filteredObject = getUpdatedReqBody(formData)
        try{
            const data = await axios.delete(url,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }});
            getAllExpenses()
        } 
        catch(error){
            console.log('error', error);
        } 
    }
    useEffect(()=>{
        // setExpensesList(getAllExpenses())
        getAllExpenses()
    },[])
    return (<div className='expenses'>
        <AddExpense formData={formData} handleFormData={handleFormData} handleSubmit={handleSubmit}/>
        <ExpensesTable expensesList={expensesList} handleDelete={handleDelete} handleEdit={handleEdit}/>
        
    </div>)
}