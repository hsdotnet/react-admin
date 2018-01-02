import React from 'react'
import { Layout, Menu, Icon, Spin, Tag, Dropdown, Avatar, message } from 'antd'
import userAvatar from '../../assets/img/user2-160x160.jpg'

class Header extends React.Component{
    render(){
        const menu = (
            <Menu>
              <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
              <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
          )

        return (
            <div className="px-navbar">
                <div className="px-navbar-menu">
                    <Dropdown overlay={menu}>
                        <span className="user"><Avatar size="small" src={userAvatar} className="user-avatar"/>Alexander Pierce</span>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default Header