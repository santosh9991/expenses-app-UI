import { useState } from "react";
import { getUpdatedReqBody } from "../utils/commonUtils";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default EditExpense = () => {
    const [formData,setFormData] = useState({
        amount:'',
        category:'',
        merchant: '',
        purchaseDate: '',
        description: ''
    });
    const {expenseId} = useParams();
    const navigate = useNavigate()
    const handleFormData = (e)=>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleEdit = async (e)=>{
        e.preventDefault();
        //edit the selected item

        const url = `https://jobs-tracker-api-ry52.onrender.com/api/v1/expenses/${expenseId}`;
        const token = localStorage.getItem('token');
        const filteredObject = getUpdatedReqBody(formData);

        try{
            const data = await axios.patch(url,filteredObject,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }});
            navigate('/expenses')
        } 
        catch(error){
            console.log('error', error);
        }

    }
    
    return (
      <div className="add-expense">
        <form onSubmit={handleEdit}>
          <div>
            <label>Amount</label>
            <input
              placeholder="Please enter amount"
              name="amount"
              onChange={handleFormData}
              value={formData.amount}
            ></input>
          </div>
          <div>
            <label>Category</label>
            <input
              placeholder="Please enter category"
              name="category"
              onChange={handleFormData}
              value={formData.category}
            ></input>
          </div>
          <div>
            <label>Merchant</label>
            <input
              placeholder="Please enter merchant name"
              name="merchant"
              onChange={handleFormData}
              value={formData.merchant}
            ></input>
          </div>
          <div>
            <label htmlFor="date">Purchase date:</label>
            <input
              type="date"
              id="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleFormData}
            />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleFormData}
            />
          </div>
          <button type="submit"> Edit Expense </button>
        </form>
        
      </div>
    );
  };
  