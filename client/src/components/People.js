import React, { useEffect, useState } from 'react';
import PersonCard from './PeopleCard';

export default function People(props) {
  const [faceData, setFaceData] = useState();
  const [loaded, setLoaded] = useState(false);

  const backendAddress = "http://localhost:5000";

  useEffect(() => {
    fetch(backendAddress + '/getUserFaces', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.token}`,
      },
    })
      .then(response => response.json())
      .then((json)=>{
        setFaceData(json);
        setLoaded(true);
      })
      .catch(error => console.log(error))
  }, []);

  const cardClick = (id) => {
    console.log("Clicked " + id)
  }

  return (
    <div>
      {loaded ?
      (<div className="container" style={{margin: '30px 120px', display:'flex', justifyContent:'center'}}> 
        {faceData.map(data => (
          <PersonCard
            key={data.faceID}
            mode={props.mode}
            name={data.name}
            faceID={data.faceID}
            cardClick={cardClick}
          />
        ))}
      </div>) : <p> Loading</p> }
    </div>
  );
}
