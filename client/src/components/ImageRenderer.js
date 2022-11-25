import React, { useState, useRef } from 'react';
import { useIntersection } from './IntersectionObserver';
import './imageRenderer.css';

const ImageRenderer = ({ src, width, height, token }) => {
  const [isInView, setIsInView] = useState(false);
  const [imgData, setData] = useState();
  const [isOpen, setOpen] = useState(false);
  const imgRef = useRef();

  const backendAddress = "http://localhost:5000";

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


    setIsInView(true);
  });

  const handleClick = function () {
    setOpen(!isOpen);
  }
  
  //TODO: Change this dialog for a better dialog

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
        <img
          className='image'
          src={imgData}
          onClick={handleClick}
        />
      )}
      {isOpen && (
        <dialog
          className="dialog"
          style={{ position: 'absolute' }}
          open
          onClick={handleClick}
        >
          <img
            className="image"
            src={imgData}
            onClick={handleClick}
            alt="no image"
          />
        </dialog>
        )}
    </div>
  );
};

export default ImageRenderer;
