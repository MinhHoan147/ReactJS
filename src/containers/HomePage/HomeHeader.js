import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils'
import { changeLanguageAction } from '../../store/actions';
import {withRouter} from 'react-router'
class HomeHeader extends Component {
    
    changeLanguage = (language) => {
       this.props.changeLanguageAction(language)
    }

    returnHome = () =>{
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }


    render() {
       let language = this.props.language
        return (
            <React.Fragment>
            <div className='home-header-menu'>
                <div className='home-header-content'>
                 <div className='content-left'>
                     <div><i className="fas fa-bars"></i></div>
                     <div className='header-logo' onClick={() => this.returnHome()}></div>
                 </div>
                 <div className='content-mid'>
                       <div className='child-content'>
                           <div><FormattedMessage id="home-header.specialty"/></div>
                           <div className='sub-title'><FormattedMessage id="home-header.find-specialty"/></div>
                       </div>
                       <div className='child-content'>
                           <div><FormattedMessage id="home-header.health-facilities"/></div>
                           <div className='sub-title'><FormattedMessage id="home-header.find-facilities"/></div>
                       </div>
                       <div className='child-content'>
                           <div><FormattedMessage id="home-header.doctor"/></div>
                           <div className='sub-title'><FormattedMessage id="home-header.find-doctor"/></div>
                       </div>
                       <div className='child-content'>
                           <div><FormattedMessage id="home-header.health-packet"/></div>
                           <div className='sub-title'><FormattedMessage id="home-header.find-packet"/></div>
                       </div>
                      
                 </div>
                 <div className='content-right'>
                          <div className='support'><i className="fas fa-question-circle"></i><FormattedMessage id="home-header.support"/></div>
                          <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}><span onClick={()=> this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                          <div className='language'> | </div>
                          <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}><span onClick={()=> this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                 </div>
                </div>
            </div>
            { this.props.isShowBanne === true &&
            <div className='home-header-banner'>
              <div className='up'> 
                   <div className='title1'>For your health</div>
                   <div className='search-bar'>
                   <i className="fas fa-search"></i>
                   <input className='search' type='text' placeholder='Tìm kiếm' />
                   </div>
              </div>
              <div className='down'>
                   <div className='options'>
                       <div className='child'>
                           <div className='child-icon'><i className="fas fa-hospital"></i></div>
                           <div className='child-text'>Khám chuyên khoa</div>
                       </div><div className='child'>
                           <div className='child-icon'><i className="fas fa-stethoscope"></i></div>
                           <div className='child-text'>Khám tổng quát</div>
                       </div><div className='child'>
                           <div className='child-icon'><i className="fas fa-vial"></i></div>
                           <div className='child-text'>Xét nghiệm y học</div>
                       </div><div className='child'>
                           <div className='child-icon'><i className="fas fa-notes-medical"></i></div>
                           <div className='child-text'>Cẩm nang y tế</div>
                       </div>
                       
                   </div>
              </div>
               
            </div>
            }
            </React.Fragment>
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
        changeLanguageAction: (language) => dispatch(changeLanguageAction(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
