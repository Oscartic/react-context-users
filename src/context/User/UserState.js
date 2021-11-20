import { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import axios from 'axios';
const UserState = (props) => {
    
    const initialState = {
        users: [],
        selectedUser: null
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);
    
    const getUsers = async () => {
        try {
            const { data } = await axios.get('https://reqres.in/api/users');
            console.log("[✔︎][getUsers] respond to success", data)
            dispatch({
                type: 'GET_USERS',
                payload: data.data
            });   
        } catch (error) {
            console.log("[❌][getUsers] respond to success", error.message);
        }
    }

    const getProfile = async  (id) => {  
        try {
            const { data } = await axios.get(`https://reqres.in/api/users/${id}`);
            console.log("[✔︎][getProfile] respond to success", data)
            dispatch({
                type: 'GET_PROFILE',
                payload: data.data
            });   
        } catch (error) {
            console.log("[❌][getProfile] respond to success", error.message);
        }
    }

    return(
        <UserContext.Provider value={{
            users: state.users,
            selectedUser: state.selectedUser,
            getUsers,
            getProfile,
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;