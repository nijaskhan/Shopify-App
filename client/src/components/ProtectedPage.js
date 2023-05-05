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
                setValidateUser(response.data);
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
        validateUser &&(
            <div className='container-fluid px-0' style={{maxHeight: '100vw', overflow: '-moz-hidden-unscrollable'}}>
                <header className='row py-2 d-flex align-items-center px-4' style={{backgroundColor: '#000000'}}>
                    <div className='col-lg-10 col-md-7 col-6'>
                        <div className='d-flex'>
                        <i class="ri-shopping-bag-fill fs-1 px-2 text-light"></i>
                        <h1 className='ps-2 py-2 text-light'>SHOPIFY</h1>
                        </div>
                    </div>
                    <div className='col-lg-2 col-md-5 col-6'>
                        <div className='text-light border justify-content-center d-flex align-items-center'>
                            <i class="ri-user-3-line pb-2 pe-2 fs-4"></i>
                            <p className='pt-2 fs-5'>{validateUser.name} </p> 
                            <p className='pt-2 fs-5 px-3'>|</p>
                            <i class="ri-logout-box-r-line pb-2 fs-4" style={{cursor: 'pointer'}} onClick={()=>{
                                localStorage.removeItem('token');
                                navigate('/login');
                            }}></i>
                        </div>
                    </div>
                </header>
                {children}
            </div>
        )
    )
}

export default ProtectedPage;