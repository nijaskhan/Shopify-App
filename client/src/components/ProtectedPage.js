import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';

function ProtectedPage({children}) {
    const [validateUser, setValidateUser] = useState();
    const navigate = useNavigate();

    const validateToken = async()=>{
        try{
            const response = await GetCurrentUser();
            if(response.success){
                setValidateUser(response);
            }else{
                throw new Error(response.message);
            }
        }catch(err){
            toast.error(err.message);
            navigate('/login');
        }
    }
    useEffect(() => {
        if(localStorage.getItem('token')){
            validateToken();
        }else{
            toast.error("please login to continue");
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            {validateUser &&(
                <div>
                    {validateUser.name}
                    {children}
                </div>
            )}
        </>
    )
}

export default ProtectedPage;