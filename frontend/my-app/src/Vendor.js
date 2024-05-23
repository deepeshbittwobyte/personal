import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const SearchBox = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
 
  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };
 
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};
 
const Navbar = () => {
  const [formData, setFormData] = useState({
    ExpenseHead: '',
    ExpenseName: '',
    ExpenseDate: '',
    ExpenseAmount: '',
    ExpenseBy: '',
    VendorName: '',
    PaymentMode: '',
    BillNumber: '',
    Bill: '',
    ExpenseDetail: ''
  });
 
  const [ExpenseName, setExpenseName] = useState([]);
  const [filteredVendorName, setFilteredVendorName] = useState([]);
 
  useEffect(() => {
    setFilteredVendorName(ExpenseName);
  }, [ExpenseName]);
 
  const handleChange = (e, rowIndex, columnName) => {
    const { value } = e.target;
    const updatedExpenseName = ExpenseName.map((Expense, index) => {
      if (index === rowIndex) {
        return {
          ...Expense,
          [columnName]: value
        };
      }
      return Expense;
    });
    setExpenseName(updatedExpenseName);
    setFilteredVendorName(updatedExpenseName);
  };
 
  const handleAddRow = () => {
    setExpenseName([...ExpenseName, formData]);
    setFormData({
      ExpenseHead: '',
      ExpenseName: '',
      ExpenseDate: '',
      ExpenseAmount: '',
      ExpenseBy: '',
      VendorName: '',
      PaymentMode: '',
      BillNumber: '',
      Bill: '',
      ExpenseDetail: ''
    });
  };
 
  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
    const filteredExpenseName = ExpenseName.filter(Expense => {
      return Object.values(Expense).some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    console.log("Filtered ExpenseName:", filteredExpenseName);
    setFilteredVendorName(filteredExpenseName);
  };
 
  const expenseHeadOptions = ['Option 1', 'Option 2', 'Option 3'];
  const paymentModeOptions = ['Cash', 'Credit Card', 'Debit Card', 'Net Banking', 'UPI'];
  const VendorNameOptions = ['Vendor 1', 'Vendor 2', 'Vendor 3']; // Added VendorName options
 
  return (
    <div className='container'>
      <div className="header bg-primary text-white p-3 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="m-0">Expense Add</h1>
        </div>
        <div className="d-flex justify-content-start align-items-start">
  <label htmlFor="languageSelect" className="m-0 mr-3">Language:</label>
  <select id="languageSelect" className="form-control" style={{ width: 'auto' }}>
    <option value="english">English</option>
    <option value="hindi">Hindi</option>
  </select>
</div>
 
        <a className="nav-link" href="/">
          {/* Home Icon */}
        </a>
      </div>
 
      <div className="p-3">
        <form>
          <div className="row">
            <div className="col-md-4">
            <label htmlFor="Expense Head">
  <span style={{ fontWeight: 'bold' }}>Expense Head</span>
  <span style={{ color: 'red' }}>*</span> :
</label>
              <select id="Expense Head" className="form-control" value={formData.ExpenseHead} onChange={(e) => setFormData({ ...formData, ExpenseHead: e.target.value })}>
                <option value="">Select Expense Head</option>
                {expenseHeadOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <label htmlFor="Expense Name">
  <span style={{ fontWeight: 'bold' }}>Expense Name</span>
  <span style={{ color: 'red' }}>*</span> :
</label>
              <input type="text" id="Expense Name" className="form-control" value={formData.ExpenseName} onChange={(e) => setFormData({ ...formData, ExpenseName: e.target.value })} />
              <label htmlFor="Expense Date">
  <span style={{ fontWeight: 'bold' }}>Expense Date</span>
  <span style={{ color: 'red' }}>*</span> :
</label>
              <input type="text" id="Expense Date" className="form-control" value={formData.ExpenseDate} onChange={(e) => setFormData({ ...formData, ExpenseDate: e.target.value })} />
            </div>
            <div className="col-md-4">
            <label htmlFor="Expense Amount">
  <strong>Expense Amount</strong>
  <span style={{ color: 'red' }}>*</span> :
</label>
              <input type="text" id="Expense Amount" className="form-control" name="Expense Amounts" value={formData.ExpenseAmount} onChange={(e) => setFormData({ ...formData, ExpenseAmount: e.target.value })} />
              <label htmlFor="Expense By">
  <span style={{ fontWeight: 'bold' }}>Expense By</span> :
</label>
 
              <input type="text" id="Expense By" className="form-control" name="Expense By" value={formData.ExpenseBy} onChange={(e) => setFormData({ ...formData, ExpenseBy: e.target.value })} />
            </div>
            <div className="col-md-4">
            <label htmlFor="Vendor Name">
  <span style={{ fontWeight: 'bold' }}>Vendor Name</span>
  <span style={{ color: 'red' }}>*</span> :
</label>
 
              <select id="Vendor Name" className="form-control" name="Vendor Name" value={formData.VendorName} onChange={(e) => setFormData({ ...formData, VendorName: e.target.value })}>
                <option value="">Select VendorName</option>
                {VendorNameOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <label htmlFor="Payment Mode">
  <strong>Payment Mode</strong>
  <span style={{ color: 'red' }}>*</span> :
</label>
              <select id="Payment Mode" className="form-control" name="Payment Mode" value={formData.PaymentMode} onChange={(e) => setFormData({ ...formData, PaymentMode: e.target.value })}>
                <option value="">Select Payment Mode</option>
                {paymentModeOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4">
            <label htmlFor="Bill Number">
  <span style={{ fontWeight: 'bold' }}>Bill Number</span>
  <span style={{ color: 'red' }}>*</span> :
</label>
 
              <input type="text" id="Bill Number" className="form-control" name="Bill Number" value={formData.BillNumber} onChange={(e) => setFormData({ ...formData, BillNumber: e.target.value })} />
            </div>
            <div className="col-md-4">
            <label htmlFor="Bill" style={{ fontWeight: 'bold' }}>Bill<span style={{ color: 'red' }}>*</span> :</label>
 
              <input type="text" id="Bill" className="form-control" name="Bill" value={formData.Bill} onChange={(e) => setFormData({ ...formData, Bill: e.target.value })} />
            </div>
            <div className="col-md-4">
            <label htmlFor="Expense Detail" style={{ fontWeight: 'bold' }}>Expense Detail :</label>
 
              <input type="text" id="Expense Detail" className="form-control" name="Expense Detail" value={formData.ExpenseDetail} onChange={(e) => setFormData({ ...formData, ExpenseDetail: e.target.value })} />
            </div>
          </div>
          <div className="text-center mt-3">
          <button className="btn btn-outline-success" type="button" onClick={handleAddRow} style={{ fontWeight: 'bold' }}>Submit</button>
          </div>
        </form>
      </div>
 
      <div className="header bg-primary text-white p-3">
        <h1 className="m-0">Expense List</h1>
      </div>
 
      <div className="search-box p-3 text-left" style={{ width: '200px' }}>
  <SearchBox handleSearch={handleSearch} />
</div>
 
 
      <div className="table-responsive p-3">
        <table className="table">
          <thead>
            <tr>
              <th>ExpenseHead</th>
              <th>ExpenseName</th>
              <th>ExpenseDate</th>
              <th>ExpenseAmount</th>
              <th>ExpenseBy</th>
              <th>VendorName</th>
              <th>PaymentMode</th>
              <th>BillNumber</th>
              <th>Bill</th>
              <th>ExpenseDetail</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendorName?.map((Expense, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(Expense).map(([columnName, value], colIndex) => (
                  <td key={colIndex}>
                    <div className="form-group">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(e, rowIndex, columnName)}
                        className="form-control"
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default Navbar;
