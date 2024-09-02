import React from 'react'
import ProgresBar from '@ramonak/react-progress-bar'
import{ Progress }from "antd";

const Analytics = ({allTransactions}) => {
    // console.log("ALL TRansactions....",allTransactions)

    //Category

    const categories=[
        'salary',
        'tip',
        'food',
        'project',
        'bills',
        'tax',
    ];
   
    const totalTransactions=allTransactions.length
    const totalIncomeTransactions=allTransactions.filter((transaction)=>transaction.type === 'income');
    const totalExpenseTransactions=allTransactions.filter((transaction)=>transaction.type === 'expense');

    const totalIncomePercenrage=(totalIncomeTransactions.length/totalTransactions)*100;
    const totalExpensePercentage=(totalExpenseTransactions.length/totalTransactions)*100;

    //total TurnOver

    const totalTurnover = allTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    console.log("TurnOver", totalTurnover);

   

    const totalIncomeTurnover=allTransactions.filter((transaction)=>transaction.type === 'income').
    reduce((acc,transaction)=>acc+transaction.amount,0);

    const totalExpenseTurnOver=allTransactions.filter((transaction)=>transaction.type ==='expense').
    reduce((acc,transaction)=>acc+transaction.amount,0)

    const totalIncomeTurnoverPercent=(totalIncomeTurnover/totalTurnover)*100;
    const totalExpenseTurnoverPercent=(totalExpenseTurnOver/totalTurnover)*100;

   
  return (
    <div className=' container mx-auto p-6 flex justify-evenly '>
  {/* Total Transactions */}
  <div className='max-w-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-lg mb-6 border'>
    <h1 className='text-xl font-semibold mb-4 text-center text-gray-800'>Total Transactions: {totalTransactions}</h1>
    <hr className="border-gray-300 my-4" />
    
    <div className='flex flex-col items-start'>
      <div className='flex items-center mb-2'>
        <h5 className='mr-2 text-gray-700'>Income: {totalIncomeTransactions.length}</h5>
        <hr className="border-gray-300 my-4" />
        <Progress 
          type="circle" 
          strokeColor='#28a745' 
          className='mx-2'
          percent={totalIncomePercenrage.toFixed(0)}
        />
      </div>
      
      <div className='flex items-center'>
        <h5 className='mr-2 text-gray-700'>Expense: {totalExpenseTransactions.length}</h5>
        <hr className="border-gray-300 my-4" />
        <Progress 
          type="circle" 
          strokeColor='#dc3545' 
          className='mx-2'
          percent={totalExpensePercentage.toFixed(0)}
        />
      </div>
    </div>
  </div>

  {/* Total Turnovers */}
  <div className='max-w-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-lg mb-6'>
    <div className='mb-4'>
      <h1 className='text-xl font-semibold text-gray-800'>Total Turnover: {totalTurnover}</h1>
      <hr className="border-gray-300 my-4" />
    </div>
    
    <div className='flex flex-col mb-4'>
      <div className='flex items-center mb-2'>
        <h5 className='mb-2 text-gray-700'>Income: {totalIncomeTurnover}</h5>
        <Progress 
          type="circle" 
          strokeColor='#28a745' 
          className='mx-2'
          percent={totalIncomeTurnoverPercent.toFixed(0)}
        />
      </div>
      
      <div className='flex items-center mb-2'>
        <h5 className='mb-2 text-gray-700'>Expense: {totalExpenseTurnOver}</h5>
        <Progress 
          type="circle" 
          strokeColor='#dc3545' 
          className='mx-2'
          percent={totalExpenseTurnoverPercent.toFixed(0)}
        />
      </div>
    </div>
  </div>

  {/* Category Wise for Income */}
  <div className='max-w-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-lg mb-6'>
    <h4 className='text-xl font-semibold mb-4 text-gray-800'>Category Wise Income</h4>
    <hr className="border-gray-300 my-4" />
    {categories.map(category => {
      const filteredTransactions = allTransactions.filter(transaction =>
        transaction.type === "income" && transaction.category === category
      );

      const amount = filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

      if (totalIncomeTurnover === 0) return null;

      return (
        amount > 0 && (
          <div key={category} className='mb-4'>
            <div className='flex items-center'>
              <h5 className='mr-2 text-gray-700'>{category}</h5>
              
              <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
            </div>
          </div>
        )
      );
    })}
  </div>

  {/* Category Wise for Expense */}
  <div className='max-w-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-lg'>
    <h4 className='text-xl font-semibold mb-4 text-gray-800'>Category Wise Expense</h4>
    <hr className="border-gray-300 my-4" />
    {categories.map((category) => {
      const amount = allTransactions.filter(transaction =>
        transaction.type === 'expense' &&
        transaction.category === category
      ).reduce((acc, transaction) => acc + transaction.amount, 0);

      return (
        amount > 0 && (
          <div key={category} className='mb-4'>
            <div className='flex items-center'>
              <h5 className='mr-2 text-gray-700'>{category}</h5>
              <Progress percent={((amount / totalExpenseTurnOver) * 100).toFixed(0)} />
            </div>
          </div>
        )
      );
    })}
  </div>
</div>

  

  
  )
}

export default Analytics