import React, { useState, useEffect, createContext } from 'react';

import { baseUrl } from '../baseUrl';
import Cards from './Cards';
import { Loading } from './Functions';



export const cardsContext = createContext(null);




function Main() {

  const [ready, setReady] = useState(false);
  const [data, setData] = useState([]);
  const cards = { data };


  useEffect( () => {
    fetch(baseUrl + "/response")
    .then( res => {
      if(res.status !== 200) return []
      return res.json();
    })
    .then (res => {      
      setData(res);
      setReady(true);
    })
    .catch( err => {
      console.log("Some error was happened");
    })
  }, []);

  return (
    <cardsContext.Provider value={ cards }>
      <main className="main">
        {
          ready ? <Cards /> : <Loading />
        }
      </main>
    </cardsContext.Provider>
  );
}

export default Main;