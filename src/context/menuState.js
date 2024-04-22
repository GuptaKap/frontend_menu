import React from 'react'
import { useState } from "react";

const menuState = ()=> {
    const dataInitial = [];
    const [menu , setMenu] = useState(dataInitial);
    const getMenu = async (e)=>{
    const response = fetch("http://localhost:2000/api/menu/fetchAllData",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
           
        },
    });
    const json = await response.json();
    console.log(json);
    setMenu(json);
}
  return (
    <menuContext.Provider value = {{ menu, getMenu}}>
        {props.children}
    </menuContext.Provider>
  )
}

export default menuState
