import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { Loading } from './Functions';
import { baseUrl } from '../baseUrl';



export const Seller = ({ match, history }) => {
  const [ready, setReady] = useState(false);
  const [seller, setSeller] = useState({});

  useEffect( () => {
    fetch(baseUrl + "/response?relationships.id=" + match.params.id)
    .then( res => {
      if(res.status !== 200) return [null]
      return res.json();
    })
    .then (res => {      
      setSeller(res[0]);
      setReady(true);
    })
    .catch( err => {
      console.log("Some error was happened");
    })
  }, [match.params.id]);

  console.log(seller)
  
  return (
    <div className="seller">
      <Button size="small" color="primary" onClick={ () => history.goBack()}> Назад  </Button>

      { 
        !ready ?
        <Loading /> :
        !seller ? 
        <div className="info">Sorry, no information was found</div> :
        <div className="detail">
          <div className="detail-info center-text">            
            <span>
              { seller.relationships.attributes.last_name } { seller.relationships.attributes.first_name } { seller.relationships.attributes.middle_name }
            </span>
            <span>Статус продавца: { seller.relationships.type }</span>
            <img src="/images/realtor.png"  className='realtor-img' alt={ seller.relationships.attributes.last_name } />
          </div>
        </div>
      }
    </div>
  );
}
