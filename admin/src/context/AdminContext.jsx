import { createContext, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

// Define the provider component
const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState('');
     const [doctors,setDoctors]=useState([]);
    // Get the backend URL from environment variables
   const backendUrl = import.meta.env.VITE_BACKEND_URL;
 const getAllDoctors=async ()=>{
    try{
        const {data}=await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}});
        if(data.success){
            setDoctors(data.doctors);
            console.log(data.doctors); // Log the data directly to verify
        }else{
            toast.error(data.message);
        }
    }catch(error){
       toast.error(error.message);
    }
}

    // Log to check if it's defined
   
    const changeAvailability=async (docId)=>{
        try{
             const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
             if(data.success){
                toast.success(data.message)
                getAllDoctors()
             }else{
                toast.error(data.message);
             }
        }catch(error){
            toast.error(error.message)
                     
        }
    }
    // Prepare the value to pass to the context
    const value = { aToken, setAToken, backendUrl ,getAllDoctors,doctors,setDoctors,changeAvailability};

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
