import React from "react";
import bg from './bg.png';

const Header = props => {

  return (
    <div 
      className='container-fluid' 
      style={{height: '5em', backgroundImage: `url(${bg})`, boxShadow: '0px 0px 1px 1px #0094FFFF'}}> 
      <div className='row'>
        <div className='col-5' />
        <h1>RASP</h1>
      </div>
    </div>
  );
};

export default Header;
