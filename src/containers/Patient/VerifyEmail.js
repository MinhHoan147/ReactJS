import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            code: 0,
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.code === 0) {
                this.setState({
                    status: true,
                    code: res.code
                })
            } else {
                this.setState({
                    status: true,
                    code: res && res.code ? res.code : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps, precState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }


    render() {
        let status = this.state.status
        let code = this.state.code
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {status === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {+code === 0 ?
                                <div className='infor-booking'>
                                    Xác nhận lịch hẹn thành công !
                                    <div>Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của Max Health !</div>
                                    <br></br>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJfpKZj2_h3R8vov7xHEdCkQXCGEcUHLwD-A4p87ePItHOveWg5ldbztPUlj3iHq_HI6I&usqp=CAU'></img>
                                    <div className='more-detail'>Mọi thông tin chi tiết xin liên hệ tới số điện thoại: <p className='contact'>19008888</p>
                                        Hoặc địa chỉ email: <p className='contact'>maxhealthmedical2021@gmail.com</p> để được tư vấn và hỗ trợ kịp thời
                                    </div>
                                </div>

                                :
                                <div className='infor-booking'>
                                    <div>Đã có lỗi xảy ra</div>
                                    Lịch hẹn không tồn tại hoặc đã được xác nhận
                                   <br></br>
                                   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0WYG9moiKzeVSfTJ9F7TIfGU3Z4RxdHq6YA&usqp=CAU'></img>
                                    <div className='more-detail'>Mọi thông tin chi tiết xin liên hệ tới số điện thoại: <p className='contact'>19008888</p>
                                        Hoặc địa chỉ email: <p className='contact'>maxhealthmedical2021@gmail.com</p> để được tư vấn và hỗ trợ kịp thời
                                    </div>
                                </div>
                            }

                        </div>
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);