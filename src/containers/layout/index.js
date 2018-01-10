import React from 'react'
import PropTypes, { func } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../../actions/order'
import Layout from '../../components/layout/layout'

const mapStateToProps = state => {
    return {
        orders: state.order
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout)
