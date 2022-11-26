import React, { useState, useRef } from 'react';
import CustomPopup from "./CustomPopup";
import { useIntersection } from './IntersectionObserver';
import './imageRenderer.css';

const ImageRenderer = ({ src, width, height, token}) => {
  const [isInView, setIsInView] = useState(false);
  const [imgData, setData] = useState();
  const imgRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const backendAddress = "http://localhost:5000";

  const handleClick = () => {
    console.log(src + " Clicked");
    setOpen(!isOpen);
  }

  useIntersection(imgRef, () => {
    fetch(backendAddress + '/getimage/' + src, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.blob())
      .then((blob) => {
        var imgURL = URL.createObjectURL(blob);
        setData(imgURL);
      })
      .catch(error => console.log(error))
    
      fetch(backendAddress + '/getCaption/' + src, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then((json) => {
          setCaption(json.caption)
        })
        .catch(error => console.log(error))
    
    
    setIsInView(true);
  });


  const popupCloseHandler = (e) => {
    setOpen(e);
  }

  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        width: '100%'
      }}
    >
      {isInView && (
        <img onClick={handleClick}
          className='image'
          src={imgData}
        />
      )}

      <CustomPopup
        onClose={popupCloseHandler}
        show={isOpen}
        title=""
      >
        <img className="popup-image" src={imgData}/>
        <p>{caption}</p>
      </CustomPopup>
    </div>
  );
};

export default ImageRenderer;
