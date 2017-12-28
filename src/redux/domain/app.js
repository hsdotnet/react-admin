import { push } from 'react-router-redux'
import { Observable } from 'rxjs/Rx'
import { message } from 'antd'
import { keyMirror } from '../../utils/index'

const types = keyMirror({
  CHANGE_THEME: null,
  TOGGLE_SIDER: null,
  LOGOUT: null,
  SHOW_LOADING: null,
  HIDE_LOADING: null,
  SWITCH_LOADING_STATUS: null,
  LOAD_FINISHED: null,
  INIT_LOAD: null
})

const doLogout = () => ({ type: types.LOGOUT })
const querySuccess = ({ payload }) => ({ type: types.LOAD_FINISHED, payload })
const toLogin = () => (dispatch) => {
  return dispatch(push('/login'))
}
export default {
  types,
  state: {
    menus: [],
    menuTree: [],
    siderVisible: localStorage.getItem('app_sider_visible') !== '0',
    siderFold: localStorage.getItem('app_sider_fold') === '1',  // 是否折叠左边栏
    theme: localStorage.getItem('app_theme_name') || 'light', // 'light','dark'
    user: {},
    news: [1, 2, 3, 4, 5, 6].map(i => ({ id: i, content: `这是测试消息_${i}` })), // 新增消息
    loading: false
  },
  subscriptions: {
    setup ({ dispatch, history }, { toggleSider }) {
      const resize = () => {
        const siderFold = document.body.clientWidth < 992
        const siderVisible = document.body.clientWidth > 768
        dispatch(toggleSider({ payload: { siderFold, siderVisible } }))
      }

      document.body.clientWidth < 769 && resize()

      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(resize(), 300)
      }
    }
  },
  actions: {
    querySuccess,
    changeTheme: () => ({ type: types.CHANGE_THEME }),
    toggleSider: ({ payload }) => ({ type: types.TOGGLE_SIDER, payload }),
    switchLoading: ({ payload }) => {
      if (payload && payload.status != null) {
        return { type: payload.status ? types.SHOW_LOADING : types.HIDE_LOADING }
      }
      return { type: types.SWITCH_LOADING_STATUS }
    },
    toLogin,
    initLoad: () => ({ type: types.INIT_LOAD }),
    logout: () => (dispatch) => {
      localStorage.removeItem('user-info')
      doLogout()
      return dispatch(push('/login'))
    },
    loadMenus: () => ({ type: types.CHANGE_THEME })
  },
  reducers: {
    [types.CHANGE_THEME]: (state) => {
      const theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('app_theme_name', theme)
      return { ...state, theme }
    },
    [types.TOGGLE_SIDER]: (state, { payload }) => {
      let siderFold = !state.siderFold
      let siderVisible = state.siderVisible
      if (payload && payload.siderFold !== undefined) {
        siderFold = payload.siderFold
      }
      if (payload && payload.siderVisible !== undefined) {
        siderVisible = payload.siderVisible
      }
      localStorage.setItem('app_sider_visible', siderVisible ? '1' : '0')
      localStorage.setItem('app_sider_fold', siderFold ? '1' : '0')
      return { ...state, siderFold, siderVisible }
    },
    [types.LOGOUT]: (state) => {
      return { ...state, user: {} }
    },
    [types.SHOW_LOADING]: (state) => {
      return { ...state, loading: true }
    },
    [types.HIDE_LOADING]: (state) => {
      return { ...state, loading: false }
    },
    [types.SWITCH_LOADING_STATUS]: (state) => {
      return { ...state, loading: !state.loading }
    },
    [types.LOAD_FINISHED]: (state, { payload }) => {
      return { ...state, ...payload }
    }
  },
  epics: {
    appInitLoad: (action$, store, { ajax }) => action$.ofType(types.INIT_LOAD)
        /*.switchMap(() => Observable.of(services.fetchUser()))
        .switchMap((user) => {
          if (!user) return Observable.of(toLogin())
          return services.fetchMenus(user)
              .map(rsp => ({ payload: { user, menus: rsp.response } }))
              .map(querySuccess)
              .catch((error) => {
                message.error(`load menus thorw exception : ${error.message}`)
                return Observable.of(
                  querySuccess({ payload: { user, menus: arrayMenu } })
                )
              })
        }
    )*/
  }
}
