"use client"
import React from 'react'
import Product from './components/Product'
import { useProductContext } from './context/ProductContext'

const page = () => {
  const { data } = useProductContext()
  return (
    <div className=''>
      <Product items={data} />
    </div>
  )
}

export default page
