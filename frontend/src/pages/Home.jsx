import React, { useEffect, useState } from 'react'
import {Form, Input, Modal, Select, Table,DatePicker} from 'antd'
import Layout from '../components/Layout/Layout'
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/apiconnector';
import { transactionEndpoints } from '../services/api';
import toast from 'react-hot-toast';
import { setLoading } from '../slices/profile';


import { AiOutlineUnorderedList,AiOutlineAreaChart,AiOutlineEdit,AiOutlineDelete } from "react-icons/ai";

import moment from 'moment'
import Analytics from '../components/Analytics';


const {RangePicker}=DatePicker;

const Home = () => {
  const [showModal,setShowModal]=useState(false);
  const [allTransactions,setAllTransactions]=useState([]);
  const {loading}=useSelector((state)=>state.auth)
  const {user}=useSelector((state)=>state.profile);
  const {token} =useSelector((state)=>state.auth);

  const [frequency,setFrequency]=useState('7');
  const [selectedDate,setSelectedDate]=useState([]);
  const [type,setType]=useState('all')

  const [viewData,setViewData]=useState('table');

  const [edit,setEdit]=useState(null)


  const handleSubmit=async(values)=>{
    if(!user.token){
      throw new Error("Authentication  Not found")
    }
    try {
   
          if(edit){
            const response=await apiConnector("PUT",transactionEndpoints.EDIT_TRANSACTION_API,{
              ...values,
              transactionId:edit._id,
              
            }, );
            setLoading(false);
            console.log("EDIT RESPONSE...",response)
            toast.success("Transaction ADDED SUCCESSFULLY");



          }else{
            const response=await apiConnector("POST",transactionEndpoints.ADD_TRANSACTION_API,{
              ...values,ownerName:user._id,
      },
      {
        Authorization: `Bearer ${token}`,
      }
        )

        console.log("Transaction response....",response);
      if(!response.data.success){

        throw new Error(response.data.message)
      }

        toast.success("Transaction Addes SuccessFully");
        setShowModal(false);
        setEdit(null)
          }
      

     
    } catch (error) {
      setLoading(false);
      console.log("Failed to ADD transaction");
      toast.error("Failed to ADD Transaction");
      
    }
  }



  useEffect(()=>{
      //get ALL transactions
      const getAllTransaction=async()=>{
        try {
          setLoading(true);
          const response=await apiConnector("POST",transactionEndpoints.GET_TRANSACTION_API,{
            userid:user._id,
            frequency,
            selectedDate,
            type
          });
          if(!response.data.success){
            throw new Error(response.data.message)
          }
          setLoading(false);
          setAllTransactions(response.data.data)
         
          // console.log("Transaction Data",response.data);
        } catch (error) {
          console.log("error");
          toast.error(error.message);
          
        }
      }

    getAllTransaction();
  },[frequency,selectedDate,type])

//Handle ON Delete
const handleonDelete=async(record)=>{
  try {
    setLoading(true);
    await apiConnector("DELETE",transactionEndpoints.DELETE_TRANSACTION,{
      transactionId:record._id
    })
    setLoading(false);
    toast.success("Transaction Deleted SuccessFully")
    
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error("Unable TO delete")
    
  }


}

  //table data

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span className="text-gray-700">{moment(text).format('YYYY-MM-DD')}</span>,
      key: 'date',
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: 'amount',
      render: (text) => <span className="text-gray-900 font-medium">${text}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: 'type',
      render: (text) => <span className="text-gray-600 capitalize">{text}</span>,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: 'reference',
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: 'category',
      render: (text) => <span className="text-gray-600 capitalize">{text}</span>,
    },
    {
      title: "Actions",
      key: 'actions',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <AiOutlineEdit 
            className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors text-2xl"
            onClick={() => {
              setEdit(record);
              setShowModal(true);
            }} 
          />
          <AiOutlineDelete 
            className="text-red-600 cursor-pointer hover:text-red-800 transition-colors text-2xl"
            onClick={() => handleonDelete(record)} 
          />
        </div>
      ),
    },
  ];
  return (
    <Layout>
    {
      loading && <div>Loading.......</div>
    }
    <div className='flex bg-richblue-800 items-center justify-between px-4 py-3  rounded-lg border'>
        {/* Filters */}
        <div className='flex flex-col '>
          <h6 className='text-lg font-semibold mb-2'>Select Frequency</h6>
          <Select 
            value={frequency} 
            onChange={(e) => setFrequency(e)} 
            className='w-full mb-2'
          >
            <Select.Option value="7">LAST 1 WEEK</Select.Option>
            <Select.Option value="30">LAST 1 MONTH</Select.Option>
            <Select.Option value="365">LAST 1 YEAR</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && 
            <RangePicker 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e)} 
              className='w-full' 
            />
          }
        </div>

        {/* Type Filters */}
        <div className='flex flex-col'>
          <h6 className='text-lg font-semibold mb-2'>Select Type</h6>
          <Select 
            value={type} 
            onChange={(e) => setType(e)} 
            className='w-full mb-2'
          >
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
          {frequency === "custom" && 
            <RangePicker 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e)} 
              className='w-full' 
            />
          }
        </div>

        {/* Icons */}
        <div className='flex flex-col '>
       
        <h1 className='text-lg font-semibold mb-2'>Analytics</h1>
         <div className='flex space-x-4 justify-center  border rounded-lg '>
         <AiOutlineUnorderedList 
            
            className='text-2xl cursor-pointer hover:text-blue-600 transition-colors w-full mb-2' 
            onClick={() => setViewData('table')} 
          />
          <AiOutlineAreaChart 
            className='text-2xl cursor-pointer hover:text-green-600 transition-colors w-full mb-2' 
            onClick={() => setViewData('Analytics')} 
          />
         </div>
        </div>

        {/* Add New Button */}
        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

      {/* Table Data */}
      
      <div className='mt-6 p-4   rounded-lg'>
        {viewData === 'table' 
          ? <Table columns={columns} dataSource={allTransactions} /> 
          : <Analytics allTransactions={allTransactions} />
        }
      </div>

      {/* Modal */}
      <Modal 
        title={edit ? "Edit Transaction" : "Add Transaction"} 
        open={showModal} 
        onCancel={() => setShowModal(false)}
        footer={null} 
        className='rounded-lg'
      >
        <Form 
          layout='vertical' 
          onFinish={handleSubmit} 
          initialValues={edit}
          className='space-y-4'
        >
          <Form.Item label="Amount" name="amount">
            <Input type='text' className='bg-gray-100' />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select className='bg-gray-100'>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select className='bg-gray-100'>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type='date' className='bg-gray-100' />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type='text' className='bg-gray-100' />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type='text' className='bg-gray-100' />
          </Form.Item>

          <div className='flex justify-end'>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Home