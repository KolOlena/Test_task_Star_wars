import React from "react";
import './ErrorPage.css';


const ErrorPage = () => {
  return (
    <div className='card-body'>
      <p className="badge badge-danger">404</p>
      <p className="error-p1">This planet has not yet been created</p>
      <p className="error-p2">Or no longer exists...</p>
      <p className="error-p3">Try your luck again</p>
    </div>
  )
};

export default ErrorPage;
