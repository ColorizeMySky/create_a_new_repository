import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActions, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

import { cardsContext } from './Main';
import { addToFavorite, deleteFavorite} from './Functions';



const Cards = () => {
  const { data } = useContext(cardsContext);
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
  


  return (
    data.length < 1 ? 
    <div className="info">Sorry, no information was found</div> :
    <section className="cards">
      {
        data.map( flat => {
          return(
            <Card className='flat-card' key={ flat.id }>
              <h2 className="flat-title">{ flat.attributes.title }</h2>

              <CardContent>
                <img src="/images/flat.jpeg"  className='flat-img' alt={ flat.attributes.title } />
                
                <CardActions className="flat-footer">
                <IconButton aria-label="add to favorites"
                  className={ favoriteFromStore.includes(flat.id) ? "favorite" : null }
                  id={"id" + flat.id}
                  onClick={ () =>  document.querySelector('#id' + flat.id).classList.contains("favorite") ? deleteFavorite(flat.id) : addToFavorite(flat.id) }>
                  <FavoriteIcon />
                </IconButton>

                <div className="flat-info">
                  <span>Площадь: { flat.attributes.area } {flat.attributes.unit}</span>
                  <span>Комнат: { flat.attributes.rooms }</span>
                </div>
                </CardActions>                
              </CardContent>

              <Button size="small" color="primary" >
                <Link to={ '/flat/' + flat.id }>
                  Детали
                </Link>
              </Button>
            </Card>
          )
        })
      }
    </section>
  );
}

export default Cards;