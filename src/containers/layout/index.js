import React from 'react'
import { connect } from 'react-redux'
import { getOrdersAction } from '../../modules/order/OrderActions'
import Layout from '../../components/layout/layout'

const mapStateToProps = state => {
    return {
        orders: state.order
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLoadUsers: () => dispatch(getOrdersAction())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout)
