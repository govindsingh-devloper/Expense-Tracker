import React from 'react'
import Layout from '../components/Layout/Layout'
import Template from '../components/common/Template'

const Login = () => {
  return (
  
    <Layout>
       <Template
      title="Welcome Back"
      description1="Expenses Need to be Tracked."
      description2="Track Your Transaction in a Visulize Manner."
      formType="login"
    />
    </Layout>

  )
}

export default Login