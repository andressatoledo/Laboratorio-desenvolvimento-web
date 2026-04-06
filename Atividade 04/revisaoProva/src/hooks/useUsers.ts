import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { addUser, removeUser } from '../store/userSlice';

export const useUsers = () => { // 
  const users = useSelector((state: RootState) => state.users.users);  
  const dispatch = useDispatch(); 

  return {
    getUsers: users, 
    addUser: (user: { id: string; name: string }) => dispatch(addUser(user)),
    removeUser: (id: string) => dispatch(removeUser(id))
  };
};