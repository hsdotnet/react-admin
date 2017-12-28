import { TOGGLE_SIDER } from '../constants/actionTypes';

export const toggleSider = (expand) => {
    return { type: TOGGLE_SIDER, expand }
}