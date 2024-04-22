import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const Card = (props) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    const host = process.env.REACT_APP_API_BASE_URL;
    const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

      fetch(`${host}/api/menu/fetchAllData?category=${category}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }
          return response.json();
      })
      .then(data => {
          setMenu(data); // Assuming data is an object containing menu details
          setLoading(false);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          setError(error.message);
          setLoading(false);
      });
  }, []);

  // if (loading) {
  //     return <div>Loading...</div>;
  // }

  if (error) {
      return <div>Error: {error}</div>;
  }
    // const { menu } = props;

    return (
        <div className='my-3 flex flex-wrap justify-center'>
            {menu && menu.map((e, index) => (
                <div key={index} className="card rounded-lg flex flex-col justify-between mx-4 my-4" style={{ width: "18rem" }}>
                    <img src={e.imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body flex flex-col  justify-between">
                        <h2 className='text-lg font-bold'>{e.Rname}</h2>
                        {/* <h5 className="card-title">
                            {e.Rname}
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> source </span>
                        </h5> */}
                        <p className="card-text">{e.category}</p>
                        <p className="card-text"><small className="text-muted">{e.address}</small></p>
                        <a rel="noreferrer" href="#" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
