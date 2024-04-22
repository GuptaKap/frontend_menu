import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMenu = () => {
  const [Mdetails, setMdetails] = useState({ Rname: "", category: "", address: "", state: "", city: "" });
  const [image, setImage] = useState("");
  const cloud_name = "dngh5sdod";
  let navigate = useNavigate();

  const host = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Rname, category, address, state, city } = Mdetails;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "image_preset");
    data.append("cloud_name", cloud_name);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "post",
        body: data
      });
      const imageData = await res.json();
      const imageUrl = imageData.secure_url;

      const response = await fetch(`${host}/api/menu/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Rname, category, address, state, city, imageUrl })
      });

      if (response.ok) {
        console.log("Add Details Successfully");
        // navigate("/");
        window.location.reload();
      } else {
        console.log("Not Added");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onChange = (e) => {
    setMdetails({ ...Mdetails, [e.target.id]: e.target.value });
  };

  return (
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
            <input type="file" name="image" id="image" className='w-full border border-gray-400 rounded-xl px-3 py-2 mb-4' onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div>
            <button className='bg-gray-700 text-white text-xl w-full border border-gray-400 rounded-xl px-3 py-2'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;
