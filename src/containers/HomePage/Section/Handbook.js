import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { withRouter } from 'react-router'
class Handbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleViewDetaiHandbook = () => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook`)
        }
    }

    render() {
        return (
            <div className='section-share section-handbook'>
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.handbook' /></span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-info' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='outer'>
                                <div className='section-customize1'>
                                    <div className='bg-image section-handbook' onClick={() => this.handleViewDetaiHandbook()} />
                                    <div className='handbook-name'>Phòng tránh dịch Covid-19 hiệu quả</div>
                                </div>
                            </div>
                            <div className='outer'>
                                <div className='section-customize2'>
                                    <div className='bg-image section-handbook' onClick={() => this.handleViewDetaiHandbook()} />
                                    <div className='handbook-name'>Lợi ích của việc tập thể dục mỗi ngày</div>
                                </div>
                            </div>
                            <div className='outer'>
                                <div className='section-customize3'>
                                    <div className='bg-image section-handbook' onClick={() => this.handleViewDetaiHandbook()} />
                                    <div className='handbook-name'>Cẩm nang về chế độ dinh dưỡng</div>
                                </div>
                            </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
