import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersFetchFailure, usersFetchSuccess } from '../redux/users/usersAction';
import { changeLoaderFalse, changeLoaderTrue } from '../redux/loadingSpinner/loadersAction';

function ProtectedPage({ children }) {
    const user = useSelector(value => value.users.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateToken = async () => {
        try {
            dispatch(changeLoaderTrue());
            const response = await GetCurrentUser();
            if (response.success) {
                dispatch(usersFetchSuccess(response.data));
                dispatch(changeLoaderFalse());
            } else {
                dispatch(usersFetchFailure(response.message));
                dispatch(changeLoaderFalse);
                throw new Error(response.message);
            }
        } catch (err) {
            dispatch(usersFetchFailure());
            toast.error(err.message);
            navigate('/login');
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) validateToken();
        else {
            toast.error("please login to continue");
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        user && (
            <div className='container-fluid px-0 mx-0' style={{ overflowX: 'hidden' }} >
                <header className='row d-flex align-items-center px-4' style={{ backgroundColor: '#000000' }}>
                    <div className='col-lg-10 col-md-7 col-6'>
                        <div className='d-flex'>
                            <i class="ri-shopping-bag-fill fs-1 px-2 text-light"></i>
                            <Link to={'/'} style={{textDecorationLine: 'none'}}><h1 className='ps-2 py-2 text-light'>SHOPIFY</h1></Link>
                        </div>
                    </div>
                    <div className='col-lg-2 col-md-5 col-6'>
                        <div className='text-light border justify-content-center d-flex align-items-center'>
                            <span className='d-flex' onClick={()=> navigate('/profile')} style={{cursor: 'pointer'}}>
                                <i class="ri-user-3-line pt-1 pe-2 fs-4"></i>
                                <p className='pt-2 fs-5'>{user.name} </p>
                            </span>
                            <p className='pt-2 fs-5 px-4'>|</p>
                            <i class="ri-logout-box-r-line pb-2 fs-4" style={{ cursor: 'pointer' }} onClick={() => {
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