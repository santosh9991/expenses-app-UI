export default AddExpense = ({formData, handleFormData, handleSubmit}) => {
    
  return (
    <div className="add-expense">
      <form onSubmit={handleSubmit}>
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
        <button type="submit"> Add Expense </button>
      </form>
    </div>
  );
};
