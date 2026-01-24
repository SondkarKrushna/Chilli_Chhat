// hooks/useLogout.ts
import { useDispatch } from 'react-redux';
import { logout } from '../authSlice';

export const useLogout = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch({ type: 'global/resetStore' });    
    dispatch(logout());                           

    localStorage.clear();                         
    sessionStorage.clear();

    

    // Or plain js:
    window.location.replace('/');
  };
};