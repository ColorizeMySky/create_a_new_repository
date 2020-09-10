import React, { useState, useEffect }from 'react';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { baseUrl } from '../baseUrl';
import { Loading } from './Functions';
import { addToFavorite, deleteFavorite} from './Functions';



export const Flat = ({ match, history }) => {
  const [ready, setReady] = useState(false);
  const [flat, setFlat] = useState({});

  let favoriteFromStore = [];
  try {
    let storeFavorite = JSON.parse(localStorage.getItem('flat_task_favorite') );
      
	  if(storeFavorite && storeFavorite.length > 0) {
		  favoriteFromStore =  storeFavorite;
		}
	}
	catch(err) {
		console.log("Cookies are not allowed")
  }

  useEffect( () => {
    fetch(baseUrl + "/response/" + match.params.id)
    .then( res => {
      if(res.status !== 200) return {}
      return res.json();
    })
    .then (res => {      
      setFlat(res);
      setReady(true);
    })
    .catch( err => {
      console.log("Some error was happened");
    })
  }, [match.params.id]);

  return (    
    <div>
      <Button size="small" color="primary" onClick={ () => history.goBack()}> Назад  </Button>

      <div className="main">
      {
        !ready ?
        <Loading /> :
        Object.keys(flat).length === 0 ? 
        <div className="info">Sorry, no information was found</div> :
        <div>
          <h2 className="center-text">{ flat.attributes.title }</h2>

          <div className="detail">
            <img src="/images/flat.jpeg"  className='flat-img' alt={ flat.attributes.title } />

            <div className="detail-info">
              <IconButton aria-label="add to favorites"
                className={ favoriteFromStore.includes(flat.id) ? "favorite" : null }
                id={"id" + flat.id}
                onClick={ () =>  document.querySelector('#id' + flat.id).classList.contains("favorite") ? deleteFavorite(flat.id) : addToFavorite(flat.id) }>
                <FavoriteIcon />
              </IconButton>
              <span>Тип: { flat.type }</span>
              <span>Количество комнат: { flat.attributes.rooms }</span>
              <span>Площадь: { flat.attributes.area } { flat.attributes.unit }</span>
              <span>Адрес: { flat.attributes.address.city }, { flat.attributes.address.street }, { flat.attributes.address.house }/{ flat.attributes.address.room }</span>

              <br />

              <span>
                <a href={ "/seller/" + flat.relationships.id }>
                  { flat.relationships.attributes.last_name } { flat.relationships.attributes.first_name } { flat.relationships.attributes.middle_name }
                </a>
              </span>
            </div>
          </div>
        </div>
      }
      </div>
    </div>

  );
}


