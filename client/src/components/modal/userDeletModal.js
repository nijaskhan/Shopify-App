import React, { useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import {deleteUser} from '../../apicalls/admin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeLoaderFalse, changeLoaderTrue } from '../../redux/loadingSpinner/loadersAction';

function UserDeleteModal({ user, modalVisibilty, setItem, users, setUsers }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteUser = async (user) => {
        try {
            dispatch(changeLoaderTrue());
            const response = await deleteUser(user._id);
            dispatch(changeLoaderFalse());
            if (response.data.success) {
                toast.success(response.data.message);
                hideConfirmBtnModel.current.click();
                setUsers(users.filter(obj=> obj._id!==user._id));
                setItem(null);
            } else {
                throw new Error("user not deleted !!");
            }
        } catch (err) {
            toast.error(err.message);
            setItem(null);
            navigate('/admin');
            hideConfirmBtnModel.current.click();
        }
    }
    const confirmBtnModal = useRef(null);
    const hideConfirmBtnModel = useRef(null);

    useEffect(() => {
        confirmBtnModal.current.click();
    }, []);
    return (
        <div>
            <button type="button" class="btn d-none btn-primary" ref={confirmBtnModal} data-bs-toggle="modal" data-bs-target="#deleteUserModal"></button>
            <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">confirmation</h5>
                            <button type="button" ref={hideConfirmBtnModel} class="btn-close" onClick={() => {
                                hideConfirmBtnModel.current.click();
                                modalVisibilty(false);
                            }} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Do you want to delete this user {user.name} ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={()=> modalVisibilty(false)} data-bs-dismiss="modal">cancel</button>
                            <button type="button" onClick={() => handleDeleteUser(user)} class="btn btn-danger">delete user</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserDeleteModal