import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMenu = () => {
  const [Mdetails, setMdetails] = useState({ Rname: "", category: "", address: "", state: "", city: "" });
  const [file, setFile] = useState(null);
  let navigate = useNavigate();
  console.log(file);

  const addImage = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch('http://localhost:2000/api/menu/register',formData, {
      method: "POST",
      headers:{
        "Content-Type": "multipart/form-data",
      }
    });
    console.log("first",res);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Rname, category, address, state, city } = Mdetails;
    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("Rname", Rname);
    // formData.append("category", category);
    // formData.append("address", address);
    // formData.append("state", state);
    // formData.append("city", city);

    const response = await fetch('http://localhost:2000/api/menu/add', {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      }, body: JSON.stringify({Rname,category,address,state,city})
    });

    if (response.ok) {
      console.log("Add Details Successfully");
      navigate("/");
    } else {
      console.log("Not Added");
    }
  };

  // const handleFileChange = (e) => {
  //   setImage(e.target.files[0]);
  // };
  const onChange = (e) => {
    setMdetails({ ...Mdetails, [e.target.id]: e.target.value });
  };
  return (
    <>
      <div className='flex'>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='w-1/3'>
          <div className='bg-white border border-black p-4 rounded-lg'>
            <div className='mb-4'>
              <label htmlFor="resName" className='block mb-1 ml-1'>Restaurant Name</label>
              <input type="text" id='Rname' value={Mdetails.Rname} className='w-full border border-gray-400 px-3 py-2 rounded-xl' onChange={onChange} />
            </div>
            <div className='mb-4'>
              <label htmlFor="category" className='block mb-1 ml-1'>Category</label>
              <select name="category" id="category" value={Mdetails.category} className='w-full border border-gray-400 rounded-xl px-3 py-2' onChange={onChange}>
                <option value="">Select</option>
                <option value="Chaat">Chaat</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="North Indian">North Indian</option>
                <option value="Dessert">Dessert</option>
                <option value="South Indian">South Indian</option>
                <option value="Fast Food">Fast Food</option>
              </select>
            </div>
            <div className='mb-4'>
              <label htmlFor="address" className='block mb-1 ml-1'>Address</label>
              <input type="text" id='address' value={Mdetails.address} className='w-full border border-gray-400 rounded-xl px-3 py-2' onChange={onChange} />
            </div>
            <div className='flex mb-4'>
              <div className="w-1/2 pr-4">
                <label htmlFor="resName" className='block mb-1 ml-1'>State</label>
                <input type="text" id='state' value={Mdetails.state} className='w-full border border-gray-400 rounded-xl px-3 py-2' onChange={onChange} />
              </div>
              <div className="w-1/2 pl-4">
                <label htmlFor="resName" className='block mb-1 ml-1'>City</label>
                <input type="text" id='city' value={Mdetails.city} className='w-full border border-gray-400 rounded-xl px-3 py-2' onChange={onChange} />
              </div>
            </div>
            <div>
              <label htmlFor="image" className='block mb-2 ml-1'>Upload Menu Image</label>
              <input type="file" name="image"  id="image" className='w-full border border-gray-400 rounded-xl px-3 py-2 mb-4'onChange={(e)=>setFile(e.target.files[0])}  />
              <button onSubmit={addImage}>Upload</button>
              </div>
              <div>
              <button className='bg-gray-700 text-white text-xl w-full border border-gray-400 rounded-xl px-3 py-2'>Submit</button>
            </div>
          </div>
        </form>
        {/* <div className="w-2/3 flex justify-end items-end">
          <img src="https://images.unsplash.com/photo-1544025162-d7669426599a" alt="Best Food" className="max-w-full max-h-full" />
        </div> */}
      </div>
    </>
  );
}

export default AddMenu;
