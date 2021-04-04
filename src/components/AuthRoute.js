import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function AuthRoute({path, component: Component, type, isAuthenticated}){
    return (
      <Route 
      path={path}
      render={(props)=>{
        if(isAuthenticated && type==='public'){
          return <Redirect to='/'/>;
        }

        if(!isAuthenticated && type==='private'){
          return <Redirect to='/login'/>;
        }

        return <Component {...props}/>;
      }}
     />
    );
  
  
  }

  const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    };
  };

  export default connect(mapStateToProps)(AuthRoute)