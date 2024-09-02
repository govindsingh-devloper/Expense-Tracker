import React from 'react'
import Template from "../components/common/Template"
import Layout from '../components/Layout/Layout'

const SignUP = () => {
  return (
   <Layout>
     <Template
      title="Welcome Back"
      description1="Track Your Expenses for Future Purpose."
      description2="AND Beware From Misunderstanding."
      formType="signup"
    />
   </Layout>
  )
}

export default SignUP