import axios from '../axios'

const handleLoginApi = (email,password) => {
    return axios.post('/api/login', {email, password})
}

const handleGetAllUser = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const handleCreateNewUser = (data) => {
    console.log("check data from service: ", data);
    return axios.post('/api/create-user', data)
}

const handleDeleteUser = (uid) => {
    return axios.delete('/api/delete-user',{
    data: {
      id: uid
    }
  });
}

const getAllCodeService = (inputType) => {
  return axios.get(`/api/getallcode?type=${inputType}`)
}

const handleEditUser = (myData) => {
  return axios.put('/api/edit-user', myData)
}

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctor = () => {
  return axios.get(`/api/get-all-doctor`)
}

const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-infor-doctor`, data)
}

const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveBulkCreateDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorByDate = (doctorId,date) => {
  return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraDoctorInforById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
  return axios.post(`/api/patient-booking-appointment`,data)
}

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-booking-appointment`,data)
}

const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`,data)
}

const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`)
}

const getAllDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`,data)
}

const getAllClinic = () => {
  return axios.get(`/api/get-clinic`)
}

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
  return axios.post('/api/send-remedy', data)
}

export {handleLoginApi, handleGetAllUser, 
  handleCreateNewUser,handleDeleteUser, handleEditUser,
  getAllCodeService, getTopDoctorHomeService, 
  getAllDoctor, saveDetailDoctorService, getDetailInforDoctor, 
  saveBulkCreateDoctor,getScheduleDoctorByDate,getExtraDoctorInforById,
  getProfileDoctorById, postPatientBookAppointment,postVerifyBookAppointment,
  createNewSpecialty, getAllSpecialty, getAllDetailSpecialtyById, createNewClinic,
  getAllClinic,getAllDetailClinicById, getAllPatientForDoctor, postSendRemedy}