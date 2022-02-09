import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeFooter.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'

class HomeFooter extends Component {

    render() {
        let language = this.props.language
        return (
            <div className='home-footer'>
                <div className='home-footer-content'>

                    <div className='content-left'>
                        <div>Công ty Cổ phần Công nghệ MaxHealth</div>
                        <div><i className="fas fa-map-marker-alt"></i> 28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>
                        <div><i className="fas fa-check"></i> ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</div>
                        <div className='footer-logo1'></div>
                    </div>
                    <div className='content-mid'>
                        <div className='footer-logo1'></div>
                        <div>All for your health</div>
                    </div>
                    <div className='content-right'>
                        {/* <div>Trụ sở chính tại:</div>
                        <div><i className="fas fa-building"></i>  28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>
                        <br></br> */}
                        <div>Hỗ trợ khách hàng:</div>
                        <br></br>
                        <div><i className="fas fa-phone-volume"></i>  Hotline: 19008888 (24/24)</div>
                        <br></br>
                        <div><i className="fas fa-envelope"></i> Mail: support@maxhealthcare.vn (7h - 18h)</div>
                    </div>
                </div>

            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
