import React, {useEffect, useState } from 'react'
import uuid from 'react-uuid';



const AddList = () => {


  
  
  
  const [AddListData,setAddListData]=useState([])
  const [image,setImage]=useState('')
  const [errorimage,seterrorimage]=useState('')
  const [mail,setmail]=useState('')
  const [password,setpassword]=useState('')
  const [errorpassword,seterrorpassword]=useState('')
  const [errormail,seterrormail]=useState('')
  const [inputValue,setinputValue]=useState('')
  
  const onSubmit = (data) =>{ 
    console.log(image)
    console.log(data)}

    const Validattion=()=>{
      if(mail ==''){
        seterrormail('Email must be required field')
      }
      else if(mail <= 3){
        seterrormail('Email must be required field')
      }
      else if(password ===''){
        seterrorpassword('Password must be required field')
      }
      else if(mail <= 3){
        seterrorpassword('Password must be minimum 3 char used')
      }
      else if(setImage == 'undefined' || setImage == 'null' || setImage == ''){
        seterrorimage('Image must required field')
      }
    }


    useEffect(()=>{
      Validattion()
    },[mail,password,setImage])



const onImageChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }
 }

const handleEdit =(e,id)=>{
  console.log(id)
  const index= AddListData.filter(items=>{
   return items.id === id
  })
  console.log(index)

  const editValue= AddListData.filter(items=>{
    return items.id !== id
   })
   setAddListData(editValue);
   setinputValue(index[0]['inputValue'])
};
const handleDelete =(e,id)=>{
  const deleteValue= AddListData.filter(items=>{
    return items.id !== id
   })
   setAddListData(deleteValue);
};


const handleSave =()=>{
  setAddListData([...AddListData,{id:uuid(),inputValue,isCompleted:false}])
  setinputValue('') 
};


const handleChange=(e)=>{
  setinputValue(e.target.value)
}


  return (
    <>
    <div className='container mx-auto'>
      <div className='text-center bg-dark  p-5'>
        <h1 className='text-white'>CRUD APP</h1>
        <div>
        <input type="text" className='p-2' value={inputValue} onChange={handleChange} />
        <button className='bg-success text-white p-2' disabled={inputValue.length<=3} onClick={handleSave}>Save</button>

        {AddListData.length ===0 && <div className='mt-5'>No Todo List</div>}
        <div className='mt-5'>
          {AddListData.map((items)=>{
            return(
              <div key={items['id']} className='d-flex justify-content-center mt-3'>
                <p className='me-5 text-white'> {items['inputValue']}</p>
                <button className='me-3 bg-info text-white  p-2' onClick={(e)=>handleEdit(e,items.id)} >Edit</button>
                <button className='bg-danger text-white p-2' onClick={(e)=>handleDelete(e,items.id)} >Delete</button>
              </div>
            )
          })}
        </div>
        </div>
      </div>


      <div className='mt-5' onSubmit={onSubmit}>
        <form action="">
          <div>
          <input 
          style={{border:'2px solid black'}}
          value={mail}
          onChange={(e)=>setmail(e.target.value)}
          type="email"
          />
          <p className='text-danger'>{errormail}</p>
          </div>
          <div className='mt-3'>
          <input className='p-2' 
          style={{border:'2px solid black'}}
           type="password" 
           value={password}
           onChange={(e)=>setpassword(e.target.value)}
           placeholder='Plearse enter the password' />
           <p className='text-danger'>{errorpassword}</p>
          </div>
          <div className='mt-3'>
          <p>Select file</p>
          <input className='p-2' style={{border:'2px solid black'}} type='file'/>
          </div>
          <div className='mt-3'>
            <p>Select image</p>
          <input className='p-2' style={{border:'2px solid black'}} type='file'  onChange={onImageChange}/>
          <p className='text-danger'>{errorimage}</p>
          </div>
          <button className='p-2 mt-3' style={{border:'2px solid black'}}>Submit</button>
        </form>
      </div>
    </div> 
    </>
  )
}

export default AddList
