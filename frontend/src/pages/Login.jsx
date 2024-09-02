import React from 'react'
import Layout from '../components/Layout/Layout'
import Template from '../components/common/Template'

const Login = () => {
  return (
  
    <Layout>
       <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      formType="login"
    />
    </Layout>

  )
}

export default Login