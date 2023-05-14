import React,{ useEffect, useRef, useState} from 'react';
import { useForm } from 'react-hook-form'
import { updateUserPost } from '../../apicalls/admin';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { changeLoaderFalse, changeLoaderTrue } from '../../redux/loadingSpinner/loadersAction';
import { getUsers } from '../../redux/adminUsers/adminUsersAction';

function UserEditModal({user, modalVisibilty}) {
    // modal Btn's close and open
    const editModalShowBtn = useRef(null);
    const closeBtn = useRef(null);

    const handleOpenBtn=()=>{
        editModalShowBtn.current.click();
    }
    useEffect(()=>{
        handleOpenBtn();
    },[]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [editId, setEditId] = useState(user._id);
    const [editName, setEditName] = useState(user.name);
    const [editEmail, setEditEmail] = useState(user.email);
    const [editMobile, setEditMobile] = useState(user.mobile);
    const dispatch = useDispatch();

    const handleUpdate=async(data)=>{
        try {
            dispatch(changeLoaderTrue());
            const response = await updateUserPost(data);
            dispatch(changeLoaderFalse());
            if (response.data.success) {
                toast.success(response.data.message);
                modalVisibilty(false);
                closeBtn.current.click();
                dispatch(getUsers());
            } else {
                throw new Error('error occured !!!');
            }
        } catch (err) {
            toast.error(err.message);
        }
    }
    
    return (
        <>
            <button type="button" className="d-none btn btn-lg btn-primary mt-2 d-flex ms-auto" ref={editModalShowBtn} data-bs-toggle="modal" data-bs-target="#editModal"></button>
            <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-3">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeBtn} onClick={()=> {
                                closeBtn.current.click();
                                modalVisibilty(false);
                            }} aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                        <div className="col-md-12"><label className="labels">Name</label><input type="text" {...register("editId", { required: true })} value={editId} onChange={(e)=>setEditId(e.target.value)} className="form-control d-none" /></div>
                            <div className="row mt-2">
                                <div className="col-md-12"><label className="labels">Name</label><input type="text" {...register("editName", { required: true })} value={editName} onChange={(e) => setEditName(e.target.value)} className="form-control" placeholder="Name" /></div>
                                {errors.name && <span className='validationColor pt-1'>This field is required</span>}
                            </div>
                            <div className="row">
                                <div className="col-md-12 mt-3"><label className="labels">Email ID</label><input type="text" {...register("editEmail", { required: true })} className="form-control" placeholder="enter email id" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} /></div>
                                {errors.email && <span className='validationColor'>This field is required</span>}
                                <div className="col-md-12 mt-3"><label className="labels">Mobile Number</label><input type="text" {...register("editMobile", { required: true, minLength: 10, maxLength: 10 })} className="form-control" placeholder="enter phone number" value={editMobile} onChange={(e) => setEditMobile(e.target.value)} /></div>
                                {errors.mobile && <span className='validationColor'>This field is invalid</span>}
                            </div>
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Changes</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserEditModal