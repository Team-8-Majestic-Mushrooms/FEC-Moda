/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

export default function ExpandedView({
  photos, index, show, onClose, setSelectedPhoto, setIndex,
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  // const [offsets, setOffsets] = useState({ x: '', y: '' });

  function goToPrevious(e) {
    e.preventDefault();
    if (index > 0 && index <= photos.length - 1) {
      setIndex(index - 1);
      setSelectedPhoto(photos.photos[index].thumbnail_url);
    }
  }

  function goToNext(e) {
    e.preventDefault();
    if (index >= 0 && index < photos.length - 1) {
      setIndex(index + 1);
      setSelectedPhoto(photos[index].thumbnail_url);
    }
  }

  function handleZoom(e) {
    e.preventDefault();
    // returns a DOMRect object providing information about the size of an element
    // and its position relative to the viewport.
    const zoomer = e.currentTarget.getBoundingClientRect();
    console.log(e.currentTarget, 'current Target');
    if (!isZoomed) {
      setIsZoomed(true);
      // returns the X (horizontal) coordinate (in pixels) at which the mouse was clicked
      const posX = e.pageX;
      // returns the Y (vertical) coordinate (in pixels) at which the mouse was clicked
      const posY = e.pageY;

      let x = posX - zoomer.left;
      let y = posY - zoomer.top;

      x -= window.scrollX;
      y -= window.scrollY;
      e.target.style.transformOrigin = `${x}px ${y}px`;
      e.target.style.transform = `translate(${x}px, ${y}px) scale(2.5)`;
      e.target.style.transform = '0.5s';
      // e.target.style.transform = 'translate(-691.875px, 76.125px) scale(2.5)';
    } else {
      setIsZoomed(false);
      e.target.style.transform = 'scale(2)';
    }
  }

  if (!show) {
    return null;
  }
  return (
    <div className="Expanded-View-Modal" onClick={onClose}>
      <div className="expanded-image-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="left-button-expanded" onClick={(e) => goToPrevious(e)}>
          <svg height="12px" width="12px" fill="#000" viewBox="0 0 185.4 300">
            <path d="M160.4 300c-6.4 0-12.7-2.5-17.7-7.3L0 150 142.7 7.3c9.8-9.8 25.6-9.8 35.4 0 9.8 9.8 9.8 25.6 0 35.4L70.7 150 178 257.3c9.8 9.8 9.8 25.6 0 35.4-4.9 4.8-11.3 7.3-17.6 7.3z" />
          </svg>
        </button>
        <button type="button" className="right-button-expanded" onClick={(e) => goToNext(e)}><svg height="12px" width="12px" fill="#000" viewBox="0 0 185.4 300"><path d="M7.3 292.7c-9.8-9.8-9.8-25.6 0-35.4L114.6 150 7.3 42.7c-9.8-9.8-9.8-25.6 0-35.4s25.6-9.8 35.4 0L185.4 150 42.7 292.7c-4.9 4.8-11.3 7.3-17.7 7.3-6.4 0-12.7-2.5-17.7-7.3z" /></svg></button>
        <button onClick={onClose} type="button">Close</button>
        <img
          className="expanded-image"
          alt="Expanded gallery"
          src={photos[index].url}
          style={{ display: 'block' }}
          onClick={(e) => handleZoom(e)}
          onMouseMove={(e) => (isZoomed ? handleZoom(e) : null)}
        />
      </div>

    </div>
  );
}
