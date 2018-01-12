import React from 'react'
import { connect } from 'react-redux'
import { Table, Input, Button, Form } from 'antd'
import { getDataAction } from '../../modules/common/CommonActions'

const columns = [{
    title: 'OrderId',
    dataIndex: 'orderId',
    key: 'orderId'
}, {
    title: 'OrderCode',
    dataIndex: 'orderCode',
    key: 'orderCode'
}]

class Index extends React.Component {
    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this)
    }

    componentWillMount() {
        this.props.dispatch(getDataAction({ page: 1, size: 10 }))
    }

    handleSearch() {
        let fields = this.props.form.getFieldsValue()
        if (fields.mobile === undefined) {
            fields.mobile = ''
        }
        fields.page = 1
        fields.size = this.props.order.query.size
        this.props.dispatch(getDataAction(fields))
    }

    render() {
        const { data, total, loading, query } = this.props.order
        const { dispatch } = this.props
        const { getFieldDecorator } = this.props.form
        const tableProps = {
            rowKey: 'orderId',
            loading,
            columns,
            dataSource: data,
            pagination: {
                showSizeChanger: true,
                showTotal: total => `共${total}条`,
                total: total,
                onChange(page, pageSize) {
                    dispatch(getDataAction(Object.assign({}, query, { page: page, size: pageSize })))
                },
                onShowSizeChange(current, size) {
                    dispatch(getDataAction(Object.assign({}, query, { page: current, size: size })))
                }
            }
        }

        return (
            <div>
                <div>
                    {getFieldDecorator('mobile', {})(
                        <Input style={{ width: '100%' }} placeholder="请输入用户手机" />
                    )}
                    <Button type="primary" icon="search" loading={loading} className="margin-right" onClick={this.handleSearch}>查询</Button>
                </div>
                <Table {...tableProps} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        order: state.common
    }
}

export default connect(
    mapStateToProps
)(Form.create()(Index))