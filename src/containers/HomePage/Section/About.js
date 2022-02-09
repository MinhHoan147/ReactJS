import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                   <div className='section-about-header'>
                        <FormattedMessage id='homepage.About'/>
                   </div>
                   <div className='section-about-content'>
                       <div className='content-left'>
                       <iframe className="video" width="100%" height="430px" 
                       src="https://www.youtube.com/embed/74DWwSxsVSs" 
                       title="YouTube video player" 
                       frameBorder="0" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       allowFullScreen></iframe>
                       </div>
                       <div className='content-right'>
                           <p>
                           <FormattedMessage id='homepage.About-content'/>
                           </p>
                           <div className='logo1'></div>
                           <div className='logo2'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
