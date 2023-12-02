import React from 'react'
import './ProductPage.css'
import { useEffect, useState } from 'react'
import axios from 'axios'



export const ProductPage = () => {
  const [state, setstate] = useState([])
  const[err,seterr]=useState(false)
  const[loding,setLoding]=useState(false)

  const categories = [
   
    { name: 'Asafoetida', value: 'Asafoetida', imageUrl: 'https://www.everestfoods.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/11/Frame-49.png.webp' },

    { name: 'BlendedSpices', value: 'BlendedSpices' , imageUrl: 'https://www.everestfoods.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/11/Frame-39.png.webp'},

    { name: 'ExoticRange', value: "ExoticRange" , imageUrl: 'https://www.everestfoods.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/11/Frame-50.png.webp'},

    { name: 'Paste', value: "Paste", imageUrl: 'https://www.everestfoods.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/11/Frame-40.png.webp' },

    { name: 'PureSpices', value: "PureSpices", imageUrl: 'https://www.everestfoods.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/12/Frame-39.png.webp' }
  ];



  async function API(category){
    setLoding(true)
try {

  let endpoint = category
  ? `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/${category}`
  : 'http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/products';



let res=await axios(endpoint)
setstate(res.data)

console.log(res.data.category)
setLoding(false)

} catch (error) {
  setLoding(false)
  seterr(true)
}
  }
useEffect(()=>{
  API()
},[])

if(loding){
  return <div>loding...</div>
}
if(err){
  return <div>please refresh the page...</div>
}
function handleCategoryClick(catevalue){
  API(catevalue)
}




  return (
    <div className='productpage'>
      
      <div className='imageclick'>
{categories.map((cate)=>(
 <div className='productfilter' key={cate.value}>
 <img className='clickimgproduct' src={cate.imageUrl} alt={cate.name}
   onClick={() => handleCategoryClick(cate.value)}/>

   <p className='nameOfProducts'>{cate.name}</p> 
 </div>

))}
</div>
<h1 className='productheadingonui'>products</h1>
<div className='productonUI'>
      {state && state.map((ele)=>(
        <div key={ele.id} className='productonUIinner'>
            <img className='imageofproducts'  src={ele.image} alt="" />
          <p className='productTitle'> {ele.title}</p>
          <p className='productNAME' > {ele.name} </p>
           </div>
      ))}
    </div>
      
    </div>
  )
}
