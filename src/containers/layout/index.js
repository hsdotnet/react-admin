import React from 'react';
import PropTypes, { func } from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/index';
import Layout from '../../components/layout/layout';

const mapStateToProps = state => {
    return {
        navClass: state.layout.navClass,
        expand: state.layout.expand
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
