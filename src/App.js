import React, {useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/pages/ToDo/ToDo';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import SingleTask from './components/pages/SingleTask/SingleTask';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './helpers/history';
import AuthRoute from './components/AuthRoute';

const toastProps = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
  };


function App({loading, successMessage, errorMessage}) {

  useEffect(()=>{
    
    if(successMessage){
      toast.success(successMessage, toastProps);
    }

    if(errorMessage){
      toast.error(errorMessage, toastProps);
    }
    
  }, [successMessage, errorMessage]);

  return (
    <div className="App">
    <Router history={history}>
    <NavMenu />

    <Switch>
      <AuthRoute 
      path='/'
      component = {ToDo}
      type='private'
      exact
    />
      <AuthRoute 
       path='/register'
       component = {Register}
       type='public'
       exact
      />
      <AuthRoute 
       path='/login'
       component = {Login}
       type='public'
       exact
      />
      <AuthRoute 
      path='/home'
      component = {ToDo}
      type='private'
      exact = {true}
      />

      <Route 
      path='/about'
      component = {About}
      exact = {true}
      />
      <Route 
      path='/contact'
      component = {Contact}
      exact
      />
      <AuthRoute 
      path='/task/:taskId'
      component = {SingleTask}
      type='private'
      exact
      />
      <Route 
      path='/not-found'
      component = {NotFound}
      exact
      />

      <Redirect to='/not-found'/>
      </Switch>


    </Router>
{ loading && <Spinner />}
<ToastContainer />

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      successMessage: state.successMessage,
      errorMessage: state.errorMessage
  };
};

export default connect(mapStateToProps)(App);
