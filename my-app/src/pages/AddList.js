import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { decrement, increment, TodoEditId, UserId } from '../features/counter/counterSlice';



const AddList = () => {


  const Uid = useSelector((state) => state.counter.id)
  const Editid = useSelector((state) => state.counter.editid)
  const dispatch = useDispatch()

  
  
  
  const [AddListData,setAddListData]=useState([])
  const [image,setImage]=useState('')
  const [errorimage,seterrorimage]=useState('')
  const [mail,setmail]=useState('')
  const [password,setpassword]=useState('')
  const [errorpassword,seterrorpassword]=useState('')
  const [errormail,seterrormail]=useState('')
  const [inputValue,setinputValue]=useState('')
  const [errorinputValue,seterrorinputValue]=useState('')
  
  const onSubmit = (data) =>{ 
    console.log(image)
    console.log(data)}

    const Validattion=()=>{

      if(inputValue ==''&& inputValue.length ==0){
        seterrorinputValue('')
      }
      else if(inputValue.length <=3){
        seterrorinputValue('Input must be minimum 3 char')
      }
      else if(inputValue.length >3){
        seterrorinputValue('')
      }
      if(mail ==''){
        seterrorinputValue('')
        seterrormail('Email must be required field')
      }
      else if(mail <= 3){
        seterrorinputValue('')
        seterrormail('Email must be required field')
      }
      else if(password ===''){
        seterrorinputValue('')
        seterrormail('')
        seterrorpassword('Password must be required field')
      }
      else if(mail <= 3){
        seterrorinputValue('')
        seterrormail('')
        seterrorpassword('Password must be minimum 3 char used')
      }
      else if(setImage == 'undefined' || setImage == 'null' || setImage == ''){
        seterrorinputValue('')
        seterrormail('')
        seterrorpassword('')
        seterrorimage('Image must required field')
      }else{
        seterrormail('')
        seterrorpassword('')
        seterrorimage('')
      }
    }


    useEffect(()=>{
      Validattion()
    },[mail,password,setImage,inputValue])



const onImageChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }
 }

const handleEdit =(e)=>{
  console.log(Editid)
  const index= AddListData.filter(items=>{
   return items.id === Editid
  })
  console.log(index[0]['inputValue'])

  const editValue= AddListData.filter(items=>{
    return items.id !== Editid
   })
   setAddListData(editValue);
   setinputValue(index[0]['inputValue'])
  };



const handleDelete =(e)=>{
  const deleteValue= AddListData.filter(items=>{
    return items.id !== Uid
   })
   setAddListData(deleteValue);
};


const handleSave =()=>{
  console.log(inputValue)
  console.log([...AddListData,{id:uuid(),inputValue,isCompleted:false}])
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
        <p className='text-danger mt-3'>{errorinputValue}</p>
        <button className='bg-success text-white p-2' disabled={inputValue.length<=3} onClick={handleSave}>Save</button>

        {AddListData.length ===0 && <div className='mt-5 text-white'>No Todo List</div>}
        <div className='mt-5'>
          {AddListData.map((items)=>{
            console.log(items)
            return(
              <div key={items['id']} className='d-flex justify-content-center mt-3'>
                <p className='me-5 text-white'> {items['inputValue']}</p>
                <button className='me-3 bg-info text-white  p-2' onClick={(e)=>{handleEdit(e);dispatch(TodoEditId(items.id))}} >Edit</button>
                <button className='bg-danger text-white p-2' onClick={(e)=>{handleDelete(e);dispatch(UserId(items.id))}} >Delete</button>
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
          <input className='p-2' style={{border:'2px solid black'}} type='file' id="img" name="img" accept="image/*"  onChange={onImageChange}/>
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
