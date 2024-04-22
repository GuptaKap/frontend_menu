import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

function Home(props) {
  const host = process.env.REACT_APP_API_BASE_URL;
  // console.log(process.env.REACT_APP_API_BASE_URL);
  const [category, setCategory] = useState(null);
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${host}/api/menu/fetchcategory`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setCategory(data);
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    fetch(`${host}/api/menu/fetchAllData?category=all`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setMenu(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='flex justify-between'>
        <div className='inline-block mx-16 my-32'>
          <h1 className='font-bold text-5xl'>Store.</h1>
          <div className='text-5xl'>The best way to view all menus. </div>
        </div>
        <div className='mr-32 mt-36'>
          <div className='space-x-2'>
            <i className="fa-solid fa-user"></i>
            <span>Need any help?</span>
          </div>
          <div className='mt-8 space-x-2'>
            <i className="fa-solid fa-location-dot"></i>
            <span>Find near you </span>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
      <div className='flex mx-4 flex-wrap justify-between  text-center'>
        {category && category.map((e, index) => (
          <div key={index}>
            <Link to={`/category?category=${e.name}`}>
              <img className='w-32 h-32 rounded-full ' src={e.image} alt="no img" style={{ backgroundColor: "transparent" }} />
              <div className='text-xl my-2 '>{e.name}</div>
            </Link>
          </div>
        ))}
      </div>
      <div className='my-3 flex flex-wrap justify-center'>
        {menu && menu.map((e, index) => (
          <div key={index} className="card rounded-2xl border-black flex flex-col justify-between mx-4 my-4" style={{ width: "18rem" }}>
            {/* Adjusting image size */}
            <img src={e.imageUrl} className="card-img-top" alt="..." style={{ width: "100%", height: "200px", borderRadius: "10px" }} />
            <div className="card-body flex flex-col  justify-between">
              <h2 className='text-lg font-bold'>{e.Rname}</h2>
              <p className="card-text">{e.category}</p>
              <p className="card-text"><small className="text-muted">{e.address}</small></p>
              <a rel="noreferrer" href="#" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
