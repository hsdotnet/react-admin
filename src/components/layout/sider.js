import React from 'react'
import Nav from './nav'
import userAvatar from '../../assets/img/user2-160x160.jpg'

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navClass: 'px-nav',
            expand: document.body.clientWidth > 992
        }
    }

    toggleCollapsed = () => {
        this.setState({
            navClass: this.state.expand ? 'px-nav px-nav-collapse' : 'px-nav px-nav-expand',
            expand: !this.state.expand
        })
    }

    render() {
        return (
            <div className={this.state.navClass}>
                <button type="button" className="px-nav-toggle" onClick={this.toggleCollapsed} >
                    <span className="px-nav-toggle-arrow"></span>
                    <span className="navbar-toggle-icon"></span>
                    <span className="px-nav-toggle-label">隐藏菜单</span>
                </button>
                <div className="px-nav-panel">
                    <div className="user-panel">
                        <span className="avatar">
                            <img src={userAvatar} alt="" />
                        </span>
                        <div className="info">
                            <p>Alexander Pierce</p>
                            <a href="javascript:void(0);">Online</a>
                        </div>
                    </div>
                    <div className="px-nav-header">导航菜单</div>
                </div>
                <Nav />
            </div>
        )
    }
}

export default Sider