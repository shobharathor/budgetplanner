import React, { createContext, useState } from 'react'
export const BudgetContext = createContext();

const BudgetProvider = ({children}) => {
  
  const [left,setLeft] = useState(2000);
  const [spent,setSpent] = useState(0);

  let list = localStorage.getItem('list');
  if (list !== null) {
      list = JSON.parse(list);
  } else {
    list = [];
  }

  const [name,setName] = useState('');
  const [cost,setCost] = useState(0);
  const [expenses,setExpenses] = useState([]);

  const addExpenseRow = (e) => {
    e.preventDefault();
    const arr = [...expenses];
    arr.push({name:name,cost:cost,id:arr.length+1});
    localStorage.setItem('list',JSON.stringify(arr));
    setExpenses(arr);
    setLeft(left-cost);
    setSpent(parseInt(spent)+parseInt(cost));
    setName('');
    setCost(0);
  }

  const removeRow = (id) => {
    const arr = [...expenses];
    let deletedRow;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        deletedRow = arr.splice(i,1);
        localStorage.setItem('list',JSON.stringify(arr));
        break;
      }
    }
    setExpenses(arr);
    setLeft(left + parseInt(deletedRow[0].cost));
    setSpent(spent - deletedRow[0].cost);
  }

  return (
    <BudgetContext.Provider value={{left,setLeft,spent,setSpent,name,setName,cost,setCost,expenses,setExpenses,addExpenseRow,removeRow}}>
        {children}
    </BudgetContext.Provider>
  )
}

export default BudgetProvider
