import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import {toast} from 'react-toastify';
import _ from 'lodash';
import {saveBulkCreateDoctor} from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
            role: ''
        }
    }

    componentDidMount() {
     this.props.fetchAllDoctors();
     this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProbs, prevState, snapshot) {
        if (prevProbs.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProbs.allScheduleTime !== this.props.allScheduleTime) {
            // console.log('Check object: ', this.props.allScheduleTime);
            let data = this.props.allScheduleTime
            if(data && data.length > 0) {
                data = data.map(item => ({...item, isSelected: false}))  // gán thêm  vào mỗi phần tử trong object trường isSelected
            }
            console.log('Check object data: ', data);
            this.setState({
                rangeTime: data

            })
        }

    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }

        return result
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption,
        });
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    
    handleClickBtnTime = (time) => {
        
        let rangeTime = this.state.rangeTime;
        if( rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map( item => {              // lặp các phần tử trong rangeTime xem phần tử nào có id trùng với id người dùng chọn
             if(item.id === time.id) item.isSelected = !item.isSelected;  // => set lại isSelected của phần tử đó thành true nêu đang là false và ngc lại
             return item
            })

          this.setState({
              rangeTime: rangeTime
          })
        }
        // console.log('Check time: ', rangeTime);
    }

    handleSaveSchedule = async () => {
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];

        if(!currentDate){
            toast.error("Invalid date");
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Invalid doctor");
            return;
        }
        let formatedDate = new Date(currentDate).getTime();

        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            // console.log('Selected time: ', selectedTime);

            if(selectedTime && selectedTime.length > 0){
               selectedTime.map((schedule, index) => {
                   let object = {};
                   object.doctorId = selectedDoctor.value;
                   object.date = formatedDate;
                   object.timeType = schedule.keyMap;
                   result.push(object);
               })
            }else{
                toast.error("Invalid time");
                return; 
            }
        }
        let res = await saveBulkCreateDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })

        if(res && res.code === 0){
          toast.success('Save infor success !')
        } else {
          toast.error('Error occured !!!')
          console.log('Error: ', res);
        }


          console.log('response: ',res);
          console.log( result);
        
    }

    render() {
        let rangeTime = this.state.rangeTime;
        let language = this.props.language;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id='manage-schedule.title' />
                    </div>

                    <div className='container'>
                        <div className='row'>
                           <div className='col-6 form-group'>
                             <label> <FormattedMessage id='manage-schedule.choose-doctor'/></label>
                             <Select
                             value={this.state.selectedDoctor}
                             onChange={this.handleChangeSelect}
                             options={this.state.listDoctors}
                             />
                           </div>
 
                           <div className='col-6 form-group'>
                             <label> <FormattedMessage id='manage-schedule.choose-date'/></label>
                             <DatePicker
                              onChange = {this.handleOnChangeDatePicker}
                              className='form-control'
                              value={this.state.currentDate}
                              minDate={yesterday}
                             />
                           </div>

                           <div className='col-12 pick-hour-container'>
                                {rangeTime && rangeTime.length > 0 && 
                                rangeTime.map((item,index) =>{
                                 return(
                                  <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule" }
                                  key ={index}
                                  onClick={() => this.handleClickBtnTime(item)}
                                  >
                                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                  </button>
                                )
                                })}
                           </div>
                           <div className='col-12'>
                               <button className='btn btn-primary btn-save-schedule'
                               onClick={() => this.handleSaveSchedule()}>
                                  <FormattedMessage id='manage-schedule.save'/>
                               </button>
                           </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctor,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);


