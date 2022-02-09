import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Slider from "react-slick";
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import {withRouter} from 'react-router'


class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }

    componentDidMount() {
        this.props.fetchTopDoctorRedux();
    }

    handleViewDetailDoctor = (doctor) => {
    if(this.props.history){
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    }


    render() {
        let arrDoctors = this.state.arrDoctors
        let language = this.props.language

        return (

            <div className='section-share section-outstanding-doctor'>
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.outstanding-doctor'/></span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-info'/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((items,index) => {
                                    let imageBase64 = ''
                                    if(items.image){
                                        imageBase64 = new Buffer(items.image, 'base64').toString('binary')
                                    }

                                    let nameVi = `${items.positionData.valueVi}, ${items.lastName} ${items.firstName}`;
                                    let nameEn = `${items.positionData.valueEn}, ${items.firstName} ${items.lastName}`;

                                    
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(items)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor1' 
                                                    style={{ backgroundImage: `url(${imageBase64})`}}
                                                    />
                                                </div>
                                                <div className='position text-center'>
                                                    <div> {language === LANGUAGES.VI ? nameVi : nameEn }</div>
                                                    {/* <div>Cơ xương khớp </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            
        


                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorRedux: () => dispatch(actions.fetchTopDoctor())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
