import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';


class Default extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, precState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }


    render() {
    
        return (
           <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Default);