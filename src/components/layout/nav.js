import React from 'react'
import { Link } from 'react-router'
import {Menu, Icon} from 'antd'
import pathToRegexp from 'path-to-regexp'
const SubMenu = Menu.SubMenu

const menus =[
    { id: 1, pid: 0, icon: 'laptop', name: '仪表盘', router: '/home' },
    { id: 101, pid: 0, name: '系统管理', icon: 'line-chart', router: '/sys', children: [
        { id: 102, pid: 101, name: '用户管理', icon: 'mail', router: '/sys/user' },
        { id: 103, pid: 101, name: '角色管理', icon: 'usergroup-add', router: '/sys/role' },
        { id: 104, pid: 101, name: '测试菜单', icon: 'area-chart', children: [
            { id: 1041, pid: 104, name: '测试菜单', icon: 'api', router: '/test/test' },
            { id: 1042, pid: 104, name: '测试菜单', icon: 'bar-chart', router: '/test/test' },
            { id: 1043, pid: 104, name: '测试菜单', icon: 'dot-chart', router: '/test/test' }
        ]}
    ]},
    { id: 201, pid: 0, name: '测试菜单', icon: 'video-camera', children: [
        { id: 203, pid: 201, name: '测试菜单', icon: 'solution', router: '/test/test' },
        { id: 204, pid: 201, name: '测试菜单', icon: 'video-camera', router: '/test/test' }
    ]}
]

const getMenuItems = (_menuTree) => {
    return _menuTree.map((item) => {
      if (item.children) {
        return (<SubMenu key={item.id} title={<span>{item.icon && <Icon type={item.icon} />}<span>{item.name}</span></span>}>
          {getMenuItems(item.children)}
        </SubMenu>)
      }
      return (<Menu.Item key={item.id}>
        <Link to={item.router}>
          {item.icon && <Icon type={item.icon} />}
          {item.name}
        </Link>
      </Menu.Item>)
    })
}

const getPathArray = (array, current, pid, id) => {
    let defaultSelectedKeys = [String(current[id])]
    const currentMenuArray = [current]
    const getPath = (item) => {
      if (item && item[pid]) {
        defaultSelectedKeys.unshift(String(item[pid])) // 数组前端插入
        let parentItem = queryArray(array, item[pid], id)
        currentMenuArray.unshift(parentItem)
        getPath(parentItem)
      }
    }
    getPath(current)
    return { defaultSelectedKeys, currentMenuArray }
  }

function getCurrentMenuItem (location, arrayMenu) {
    let currentMenu = arrayMenu.find(item => item.router && pathToRegexp(item.router).exec(location))
    return currentMenu ? getPathArray(arrayMenu, currentMenu, 'pid', 'id') : {}
}

const getRootKeys = (_menuTree)=>{
    return _menuTree.map((item) => {
        return item.pid === 0 && item.id
    })
}


const Nav = () => {
    const menuContents = getMenuItems(menus)

    const rootSubmenuKeys = getRootKeys(menus)

    // 寻找选中路由
    const { defaultSelectedKeys, currentMenuArray } = getCurrentMenuItem(location.pathname, menus)
  
    // 寻找选中路由
    const menuProps = {
      theme: 'blue',
      inlineIndent: 16,
      mode: 'inline',
      defaultSelectedKeys,
      defaultOpenKeys: false && defaultSelectedKeys ? defaultSelectedKeys : []
    }
  
    // 递归查找父级
    const breads = currentMenuArray ? currentMenuArray.map((item, key) => {
        const content = (
        <span>{item.icon
            ? <Icon type={item.icon} style={{ marginRight: 4 }} />
            : ''}{item.name}</span>
        )
        return (
        <Breadcrumb.Item key={item.id}>
            {((currentMenuArray.length - 1) !== key && item.router)
            ? <Link to={item.router}>
                {content}
            </Link>
            : content}
        </Breadcrumb.Item>
        )
    }) : ''

    return (
        <Menu {...menuProps}>{menuContents}</Menu>
    )
}

export default Nav;