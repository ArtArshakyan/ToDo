import * as actionTypes from './actionTypes';
import {checkLoginStatus} from '../helpers/auth';

const defaultState = { 
    tasks: [],
    task: null,
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    editTasksSuccess: false,
    editTaskSuccess: false,
    loading: false,
    successMessage: null,
    errorMessage: null,
    isAuthenticated: checkLoginStatus()
};


export default function reducer(state=defaultState, action){
    
    switch(action.type){
      case actionTypes.PENDING:{
        return {
          ...state,
          loading: true,
          addTaskSuccess: false,
          deleteTasksSuccess: false,
          editTasksSuccess: false,
          successMessage: null,
          errorMessage: null
        };
      }
      case actionTypes.ERROR:{
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      }

      case actionTypes.GET_TASKS:{
        return {
          ...state,
          tasks: action.tasks,
          loading: false
        };
      }

      case actionTypes.GET_TASK:{
        return {
          ...state,
          task: action.task,
          loading: false
        };
      }

      case actionTypes.ADD_TASK:{
        return {
          ...state,
          tasks: [...state.tasks, action.task],
          addTaskSuccess: true,
          loading: false,
          successMessage: 'Task created successfully!!!'
        };
      }
      case actionTypes.DELETE_TASK:{
        if(action.from === 'single'){
          return {
            ...state,
            task: null,
            loading: false,
            successMessage: 'Task deleted successfully!!!'
          };

        }

        const newTasks = state.tasks.filter((task) => action.taskId !== task._id);
        return {
          ...state,
          tasks: newTasks,
          loading: false,
          successMessage: 'Task deleted successfully!!!'
        };
      }

      case actionTypes.DELETE_TASKS:{

        const newTasks = state.tasks.filter((task) => {
          if (action.taskIds.has(task._id)) {
              return false;
          }
          return true;
      });

        return {
          ...state,
          tasks: newTasks,
          deleteTasksSuccess: true,
          loading: false,
          successMessage: 'Tasks deleted successfully!!!'
        };
      }
      case actionTypes.EDIT_TASK:{
        let successMessage = 'Task edited successfully!!!';
    
        if(action.status){
          if(action.status === 'done'){
            successMessage = 'Congrats, you have completed the task!!!';
          }
          else{
            successMessage = 'The task is active now!!!';
          }
        }



        if(action.from === 'single'){
          return {
            ...state,
            task: action.editedTask,
            editTaskSuccess: true,
            loading: false,
            successMessage: successMessage
          };

        }

        const tasks = [...state.tasks];
        const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
        tasks[foundIndex] = action.editedTask;
       
        return {
          ...state,
          tasks,
          editTasksSuccess: true,
          loading: false,
          successMessage: successMessage
        };
      }


      case actionTypes.REGISTER_SUCCESS:{
        return {
          ...state,
          loading: false,
          successMessage: 'Congrats, you are a new user now!!!'
        };
      }

      case actionTypes.LOGIN_SUCCESS:{
        return {
          ...state,
          loading: false,
          isAuthenticated: true
        };
      }

      case actionTypes.LOGOUT:
        return {
        ...state,
          loading: false,
          isAuthenticated: false
      }

      default: return state;
    }
    }