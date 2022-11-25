import React, { useEffect, useState } from 'react';
import ImageRenderer from './ImageRenderer';
import './style.css';

export default function Gallery(props) {
  const [imgData, setImgData] = useState();
  const [loaded, setLoaded] = useState(false);

  const backendAddress = "http://localhost:5000";

  useEffect(() => {
    fetch(backendAddress + '/getUserImages', {
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
      <h1>Lazy Load Images</h1>
      {loaded ?
      (<section> 
        {imgData.map(data => (
          <ImageRenderer
            key={data.id}
            src={data.src}
            width={16}
            height={9}
            token={props.token}
          />
        ))}
      </section>) : <p> Loading</p> }
    </div>
  );
}
