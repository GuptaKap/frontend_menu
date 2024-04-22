import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const host = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (event) => {
    setQuery(event.target.value);
    setShowResults(true); 
  };

  useEffect(() => {
    let timerOut = setTimeout(()=>{

      if (query.trim() === '') {
        setSearchResults([]);
        setShowResults(false);
        return;
      }
  
      fetch(`${host}/api/menu/search?q=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then(response => {
        if (!response.ok) {
          throw new Error("Failed")
        } 
        return response.json();
      }).then(data => {
        setSearchResults(data);
      })
        .catch(error => {
          console.error('Error fetching category data:', error);
          setError(error.message);
        });
    },400);
    return () => clearTimeout(timerOut);
    
  }, [query]);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  

  const handLogout = () => {
    localStorage.removeItem('token');
    navigate("/login")
  }


  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <div>
                <svg
                  fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 45.001 45.001" xmlSpace="preserve">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path d="M42.73,21.939c-0.525-8.071-6.996-14.56-15.197-15.313c0.066-0.182,0.109-0.375,0.109-0.58 c0-0.942-0.767-1.705-1.705-1.705c-0.941,0-1.707,0.763-1.707,1.705c0,0.205,0.043,0.398,0.106,0.58 C16.139,7.379,9.668,13.868,9.141,21.939h-2.27c0,1.139,0.924,2.063,2.064,2.063h1.851c-2.144,1.083-5.095,3.995-5.095,3.995 l6.771,6.841l2.418-1.446h13.78l9.389-9.39h4.889c1.14,0,2.063-0.924,2.063-2.063H42.73z M27.844,28.929c0,0-4.486,0-6.438,0 c-0.914,0-3.063-1.996-3.063-1.996s4.082,0,5.714,0c2.605,0,3.916-2.05,4.359-2.931h6.01C32.07,25.332,27.844,28.929,27.844,28.929 z M4.08,27.562l9.021,9.021l-4.08,4.078L0,31.64L4.08,27.562z" />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="font-bold text-3xl text-white ml-1">Men</div>
              <span className="text-3xl text-blue-300 ">uCart</span>
            </div>

            <div className="hidden sm:block text-xl text-white my-auto ">
              Drop location
            </div>

            <div className="w-5/6 sm:w-3/6 relative my-auto ml-10">
              <i className="fas fa-search fa-lg absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input type="search" placeholder="Search" value={query} className="w-full h-12 pl-12 pr-4 text-lg rounded-full outline-none bg-gray-700 text-white" onChange={handleChange}  onClick={() => setShowResults(true)} />
              {showResults && (
                <div className="w-full scroll p-4 z-10 absolute my-2 rounded-xl min-h-40 max-h-80 border border-black overflow-y-auto">
                  {searchResults && searchResults.map((e, index) => (
                    <div key={index} className='flex'>
                      <div className=' border-black w-16 h-16 rounded-full'>
                        {/* <img src="https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/1x1/1x1-samosa-chaat.jpg" className="" alt="" /> */}
                      </div>
                      <div className='ml-3'>
                        <h2 className='text-lg font-bold '>{e.Rname}</h2>
                        <p className=" -my-1 ">{e.category}</p> 
                        <p className=""><small className="m-0 p-0">{e.address}</small></p>
                        <p >See Menu » </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </div>

           
            <div className="hidden sm:flex items-center mr-7 ">

              {!token ? (
                <Link to="/login" className="text-white text-xl mr-7">Login</Link>
              ) : (
                <button onClick={handLogout} className="text-white text-xl mr-7">Logout</button>
              )}

              <Link to="/add" className="text-white text-xl mr-7 ">Add Menu</Link>
              <div className='mr-1'>
                <svg width="20px" height="20px" viewBox="0 -3.33 56.309 56.309" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                  <g id="SVGRepo_iconCarrier"> <path id="heart_like" data-name="heart like" d="M957.027,551.415c-.065-.059-.1-.1-.117-.111h0l.453-.425-.457.419c-7.531-7.535-14.246-14.078-19.121-19.645h0c-4.844-5.591-8-10.078-8.069-14.2h0a2.966,2.966,0,0,1,.007-.311h0A14.618,14.618,0,0,1,944.329,502.6h0a14.577,14.577,0,0,1,13.21,8.434h0l.325.7.012-.019.316-.684a14.608,14.608,0,0,1,13.222-8.43h0a14.6,14.6,0,0,1,14.6,14.548h0c0,.109,0,.214.008.311h0c-.075,4.122-3.231,8.607-8.074,14.2h0c-4.868,5.557-11.566,12.088-19.087,19.608h0a.706.706,0,0,0-.054.062h0l-.848.917-.934-.829ZM932.266,517.2l0,.069v.042s0,.053,0,.136h0c-.071,2.666,2.643,7.114,7.441,12.527h0c4.594,5.25,10.984,11.513,18.171,18.685h0c7.2-7.189,13.575-13.441,18.164-18.682h0c4.8-5.411,7.517-9.858,7.446-12.524h0c0-.073,0-.142-.008-.253h0a12.067,12.067,0,0,0-12.059-12.063h0A12.067,12.067,0,0,0,960.5,512.1h0l-.316.685-.183.383-.04.065a2.471,2.471,0,0,1-2.086,1.16h0a2.506,2.506,0,0,1-2.191-1.335h0a2.581,2.581,0,0,1-.121-.258h0l-.325-.7a12.033,12.033,0,0,0-10.9-6.965h0A12.069,12.069,0,0,0,932.266,517.2Zm25.671-5.3s0,.005-.014-.035h0l.014.035Z" transform="translate(-929.715 -502.598)" fill="#2c323" /> </g>
                </svg>
              </div>
              <a href="/" className="text-white text-xl mr-7 ">Save</a>

            </div>
          </div>
        </div>
        <hr className="w-full" />
      </nav>

    </>
  );
}

export default Navbar;
