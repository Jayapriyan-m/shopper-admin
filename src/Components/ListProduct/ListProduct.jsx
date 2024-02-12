import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts , setAllProducts] = useState([]);

  const fetchInfo = async () => {
  await fetch('http://localhost:4000/allproducts')
  .then((res)=>res.json())
  .then((data)=>{console.log(data); setAllProducts(data)}); }

    useEffect(()=>{
      fetchInfo();
    },[])

  const removeProduct = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
        <h1>All Product List</h1>
        <div className="listproduct-format-main">
          <p className='product-col'>Products</p>
          <p className='title-col'>Title</p>
          <p className='oldprice-col'>Old Price</p>
          <p className='newprice-col'>New Price</p>
          <p className='category-col'>Category</p>
          <p className='remove-col'>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product,index)=>{
            return <> <div key={index} className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p className='title-row'>{product.name}</p>
                <p>&#8377;{product.old_price}</p>
                <p>&#8377;{product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
            </div>
            <hr /></>
          })}
        </div>
    </div>
  )
}

export default ListProduct