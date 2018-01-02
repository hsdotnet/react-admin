import React from 'react'
import PropTypes, { func } from 'prop-types'
import NProgress from 'nprogress'

import Sider from './sider'
import Header from './header'
import Footer from './footer'

import './style/layout.css'

let lastHref

const resize = () => {
    console.log('onresize')
}

class Layout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        let tid
        window.onresize = () => {
            clearTimeout(tid)
            tid = setTimeout(resize(), 300)
        }
        //console.log(this.props);
        //this.props.fetchTopics({type: this.state.type})

        this.props.fetchUsers()
    }

    getUsers() {
        this.props.fetchUsers()
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.users.map(user => {
                        return <li key={user.orderCode}>{user.orderCode}</li>
                    })}
                </ul>
                <input type="button" value="测试" onClick={this.getUsers.bind(this)} />
                <Sider {...this.props} />
                <Header />
                <div className="px-content">{this.props.children}</div>
                <Footer />
                <div className="px-nav-dimmer"></div>
            </div>
        )
    }
}
/*
const Layout = ({ children, location, app, ...others }) => {
    // 路由切换显示进度条
    const href = window.location.href
    if (lastHref !== href) {
        //NProgress.start()
        //NProgress.done()
        lastHref = href
    }
}
*/

Layout.propTypes = {
    children: PropTypes.element.isRequired
}

export default Layout