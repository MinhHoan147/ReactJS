import actionTypes from './actionTypes'

import { getAllCodeService, handleCreateNewUser, handleGetAllUser, 
         handleDeleteUser, handleEditUser, getTopDoctorHomeService,
          getAllDoctor, saveDetailDoctorService,getAllSpecialty,getAllClinic } from '../../services/userService';
import {toast} from 'react-toastify'

//GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START})

            let res = await getAllCodeService("GENDER");
            if (res && res.code === 0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log('Gender ERROR: ', error);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})


//POSITION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("POSITION");
            if (res && res.code === 0){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.log('Position ERROR: ', error);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})


//ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("ROLE");
            if (res && res.code === 0){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log('Role ERROR: ', error);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})


//CREATE
export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleCreateNewUser(data);    
            if (res && res.code === 0){
                toast.success("create user successfully")
                dispatch(createUserSuccess())
                dispatch(fetchAllUserStart())
            }else{
                toast.error("create user fail")
                dispatch(createUserFail());
            }
        } catch (error) {
            toast.error("create user fail")

            dispatch(createUserFail());
            console.log('createUserFail:  ', error);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})


//READ
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await handleGetAllUser("ALL");
            if (res && res.code === 0){
                dispatch(fetchAllUserSuccess(res.Users))
            }else{
                dispatch(fetchAllUserFail());
            }
        } catch (error) {
            dispatch(fetchAllUserFail());
            console.log('Get all user ERROR: ', error);
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
     type: actionTypes.FETCH_ALLUSER_SUCCESS,
     users: data
})

export const fetchAllUserFail = (data) => ({
    type: actionTypes.FETCH_ALLUSER_FAIL,
})


//DELETE
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleDeleteUser(userId);    
            if (res && res.code === 0){
                toast.success("delete user successfully")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            }else{
                toast.error("delete user fail")

                dispatch(deleteUserFail());
            }
        } catch (error) {
            toast.error("delete user fail")
            dispatch(deleteUserFail());
            console.log('createUserFail:  ', error);
        }
    }
}

export const deleteUserSuccess = () => ({
   type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})


//EDIT
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleEditUser(data);    
            if (res && res.code === 0){
                toast.success("edit user successfully")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            }else{
                toast.error("edit user fail")

                dispatch(editUserFail());
            }
        } catch (error) {
            toast.error("edit user fail")
            dispatch(editUserFail());
            console.log('EditUser error:  ', error);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
 })
 
 export const editUserFail = () => ({
     type: actionTypes.EDIT_USER_FAIL 
 })


 //TOP DOCTOR
 export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');    
            if (res && res.code === 0){
                dispatch(fetchTopDoctorSuccess(res.data))
            }else{

                dispatch(fetchTopDoctorFail());
            }
        } catch (error) {
            dispatch(fetchTopDoctorFail());
            console.log('Fetch top doctor error:  ', error);
        }
    }
}

export const fetchTopDoctorSuccess = (doctorData) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: doctorData
    
 })
 
 export const fetchTopDoctorFail = () => ({
     type: actionTypes.FETCH_TOP_DOCTOR_FAIL 
 })

 export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor();    
            if (res && res.code === 0){
                dispatch(fetchAllDoctorSuccess(res.data))
            }else{

                dispatch(fetchAllDoctorFail());
            }
        } catch (error) {
            dispatch(fetchAllDoctorFail());
            console.log('Fetch top doctor error:  ', error);
        }
    }
}

export const fetchAllDoctorSuccess = (doctorData) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS ,
    data: doctorData
    
 })
 
 export const fetchAllDoctorFail = () => ({
     type: actionTypes.FETCH_ALL_DOCTOR_FAIL 
 })


 export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);    
            console.log('CHeck action: ', res);
            if (res && res.code === 0){
                toast.success("Successful")
                dispatch(saveDetailDoctorSuccess())
            }else{
                toast.error("Error !")
                dispatch(saveDetailDoctorFail());
            }
        } catch (error) {
            toast.error("Error !")
            dispatch(saveDetailDoctorFail());
            console.log('error:  ', error);
        }
    }
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS ,
})
 
 export const saveDetailDoctorFail = () => ({
     type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
 })

 export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');    
            if (res && res.code === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else{

                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
            });
            console.log('Fetch schedule time error :  ', error);
        }
    }
}


export const getAllRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.code === 0 &&
                resPayment && resPayment.code === 0 &&
                resProvince && resProvince.code === 0 &&
                resSpecialty && resSpecialty.code === 0 &&
                resClinic && resClinic.code === 0
                ){
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty: resSpecialty.data,
                        resClinic: resClinic.data
                    }
                    // console.log("DATA: ",data);
                dispatch(fetchRequiredDoctorInforSuccess(data))
            }else{
                dispatch(fetchRequiredDoctorInforFail());
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInforFail());
            console.log('fetchRequiredDoctorInforFail ERROR: ', error);
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (requiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: requiredData
})

export const fetchRequiredDoctorInforFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL
})