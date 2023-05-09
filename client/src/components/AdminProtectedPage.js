import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

function AdminProtectedPage({ children }) {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState();

    useEffect(() => {
        if (localStorage.getItem('admintoken')){
            setAdmin(JSON.parse(localStorage.getItem('admin')));
        }else{
            toast.error("please login to continue");
            navigate('/admin/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        admin && (
            <div className='container-fluid px-0 mx-0' style={{ overflowX: 'hidden' }} >
                <header className='row d-flex align-items-center px-4' style={{ backgroundColor: '#000000' }}>
                    <div className='col-lg-10 col-md-7 col-6'>
                        <div className='d-flex'>
                            <i class="ri-user-settings-line fs-1 px-2 text-light"></i>
                            <Link to={'/admin'} style={{textDecorationLine: 'none'}}><h1 className='ps-2 py-2 text-light'>ADMIN PANEL</h1></Link>
                        </div>
                    </div>
                    <div className='col-lg-2 col-md-5 col-6'>
                        <div className='text-light border justify-content-center d-flex align-items-center'>
                            <span className='d-flex' onClick={()=> navigate('/profile')} style={{cursor: 'pointer'}}>
                                <i class="ri-user-3-line pt-1 pe-2 fs-4"></i>
                                <p className='pt-2 fs-5'>{admin.name} </p>
                            </span>
                            <p className='pt-2 fs-5 px-4'>|</p>
                            <i class="ri-logout-box-r-line pb-2 fs-4" style={{ cursor: 'pointer' }} onClick={() => {
                                localStorage.removeItem('admintoken');
                                localStorage.removeItem('admin');
                                navigate('/admin/login');
                            }}></i>
                        </div>
                    </div>
                </header>
                {children}
            </div>
        )
    )
}

export default AdminProtectedPage;