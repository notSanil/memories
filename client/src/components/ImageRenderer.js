import React, { useState, useRef } from 'react';
import CustomPopup from "./CustomPopup";
import { useIntersection } from './IntersectionObserver';
import './imageRenderer.css';
import Editable from './Editable';

const ImageRenderer = ({ src, width, height, token }) => {
  const [isInView, setIsInView] = useState(false);
  const [imgData, setData] = useState();
  const imgRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [altCaption, setAltCaption] = useState("");
  const backendAddress = "http://localhost:5000";

  const handleClick = () => {
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
      .catch(error => console.log(error)
      );

    fetch(backendAddress + '/getCaption/' + src, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((json) => {
        setCaption(json.caption);
        setAltCaption(json.caption);
      })
      .catch(error => console.log(error)
      );
    setIsInView(true);
  });

  const popupCloseHandler = (e) => {
    setAltCaption(caption);
    setOpen(e);
  }

  const onSave = () => {
    setCaption(altCaption);

    fetch(backendAddress + '/updateCaption/' + src, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"caption": altCaption})
    })
      .then(response => response.json())
      .catch(error => console.log(error)
      );

    setOpen(false);
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
        <img className="popup-image" src={imgData} />
        <Editable
          text={altCaption}
          placeholder="Caption"
          type="input"
        >
          <input
            type="text"
            name="task"
            placeholder="Write a task name"
            value={altCaption}
            onChange={e => setAltCaption(e.target.value)}
          />
        </Editable>
        <button type="button" onClick={onSave}>Save</button>
        <button type='button' onClick={() => popupCloseHandler(false)}>Cancel</button>
      </CustomPopup>
    </div>
  );
};

export default ImageRenderer;
