import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadGender: false,
    genders: [],
    positions: [],
    roles: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadGender = true
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadGender = false;
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];

            return {
                ...state
            }
        case actionTypes.FETCH_ALLUSER_SUCCESS:
            state.users = action.users;

            return {
                ...state
            }
        case actionTypes.FETCH_ALLUSER_FAIL:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.allDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;

            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
            state.allScheduleTime = [];
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;