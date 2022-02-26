import React from 'react';

const backdrop = (props) => (
  props.show ? <div className="w-full h-full fixed z-100 bg-black bg-opacity-50 left-0 top-0" onClick={props.clicked}></div> : null
);

export default backdrop;