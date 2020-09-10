import React from 'react';
import Loader from 'react-loader-spinner';


export const Loading = () => {
  return <div className='info'>
    <Loader type="Oval" color="#2C3E50" height={80} width={80} className="loader" />
    <p>Loading</p>
  </div>
}


export const addToFavorite = (id) => {
  try {
    let storeFavorite = JSON.parse(localStorage.getItem('flat_task_favorite') );

    if(!storeFavorite) {
      let favorites = [];
      favorites[0] = id;
      localStorage.setItem("flat_task_favorite", JSON.stringify(favorites));
    }
    else if(!storeFavorite.includes(id)){
      let favorites = storeFavorite;
      favorites.push(id);
      localStorage.setItem("flat_task_favorite", JSON.stringify(favorites));
    }
    document.querySelector('#id' + id).classList.add('favorite');

  }
  catch (err) {
    console.log('No cookies allowed')
  }
}

export const deleteFavorite = (id) => {  
  try {
    let storeFavorite = JSON.parse(localStorage.getItem('flat_task_favorite') );

    if(!storeFavorite) {
      return
    }
    else if(storeFavorite.includes(id)){      
      let favorites = storeFavorite.filter( item => item !== id);
      localStorage.setItem("flat_task_favorite", JSON.stringify(favorites));
      document.querySelector('#id' + id).classList.remove('favorite');
    }
  }
  catch (err) {
    console.log('No cookies allowed')
  }
}