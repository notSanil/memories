import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageRenderer from './ImageRenderer';
import './style.css';

export default function PersonPage(props) {
  const [imgData, setImgData] = useState();
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  const backendAddress = "http://localhost:5000";

  useEffect(() => {
    console.log(location);
    const faceID = location.state.id;



    fetch(backendAddress + '/getFaceImages/' + faceID, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.token}`,
      },
    })
      .then(response => response.json())
      .then((json)=>{
        setImgData(json);
        setLoaded(true);
      })
      .catch(error => console.log(error))
  }, []);


  return (
    <div>
      {loaded ?
      (<section> 
        {imgData.map(data => (
          <ImageRenderer
            key={data.id}
            src={data.id}
            width={16}
            height={9}
            token={props.token}
          />
        ))}
      </section>) : <p> Loading</p> }
    </div>
  );
}
