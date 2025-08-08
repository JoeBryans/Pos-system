import React from 'react'
import CategoriesCard from '../components/categories/Card'
import { GETCategory } from '../../../../actions/Categories';

const page = async() => {
  const Category = await GETCategory();
  console.log(Category);
  return (
    <div><CategoriesCard Category={Category}/></div>
  )
}

export default page