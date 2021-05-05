import React from 'react';

const Popover = ({children, style}) => (
  <div className="popover" style={style}>
    <div className="popover-content">{children}</div>
    <div className="popover-arrow" x-arrow=""></div>
  </div>
);

export default Popover;
