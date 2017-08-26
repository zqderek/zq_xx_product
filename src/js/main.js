window.console = window.console || {};
window.console.log = window.console.log || function() {};
window.console.error = window.console.error || function() {};

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSource from 'vue-resource';
import VueCookie from 'vue-cookie';
import AjaxVue from '../plugin/ajax.js';

import State from '../store/global.js';

import VTable from '../component/table/';
import Dialog from '../component/dialog/dialog.js';

Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(VueSource);
Vue.use(Dialog);
Vue.use(VTable);
import MainView from '../pageview/main.vue';
import IndexView from '../pageview/no_login/index.vue';
import LoginView from '../pageview/no_login/login.vue';


Vue.config.devtools = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
Vue.use(AjaxVue);


/**
 * 用户角色： 超管100 管理员10 普通用户0
 * 系统设置、日志源 为[100, 10]
 * 其中用户管理相关[100]
 */
const routes = [{
    path: '/',
    component: MainView,
    children: [{
        path: '/index',
        component: IndexView,
        meta: { auth: false, bodyClass: 'index-page' }
    }, {
        path: '/login',
        component: LoginView,
        meta: { auth: false, bodyClass: 'index-page', type: 'login' }
    }]
}];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    //设置特定的class
    if (to.meta && to.meta.bodyClass) {
        $('body').addClass(to.meta.bodyClass);
    } else {
        $('body').attr('class', '');
    }

    return new Promise((resolve, reject) => {
        // State.state.signed = true;
        // State.state.userInfo = {
        //     "status": 0,
        //     "error_message": "",
        //     "login_name": "foo",
        //     "Chinese_name": "张三",
        //     "employee_id": 123,
        //     "mail": "xxx",
        //     "phone": "15501001002",
        //     "role": 12,
        //     "disabled": 0
        // };
        // resolve(State.state.userInfo);
        // // return;
        // if (State.state.signed) {
        //     resolve(State.state.userInfo);
        //     return true;
        // }
        // let isLogin = Vue.cookie.get('user_id');
        // console.log(isLogin, typeof isLogin);
        // if (isLogin && isLogin != 'undefined') {
        //     Vue.http.get('/api/user/show').then(res => {
        //         let data = res.data;
        //         if (!data.status) {
        //             State.state.signed = true;
        //             State.state.userInfo = data;
        //             resolve(data);
        //         }
        //     });
        // } else {
        //     State.state.signed = false;
        //     if (to.meta && to.meta.auth) resolve('/login');
        //     else resolve();
        // }
        resolve('/login')
    }).then(data => {
        var directors = [{
            when: to.meta && to.meta.auth && !State.state.signed && !to.meta.updatePwd,
            go: '/index'
        }, {
            when: to.path == '/' && !State.state.signed,
            go: '/index'
        }, {
            when: ['/index', '/', '/index/', '/login'].indexOf(to.path) > -1 && State.state.signed,
            go: '/dashboard'
        }];

        for (let i = 0; i < directors.length; i++) {
            let item = directors[i];
            if (item.when) {
                next(item.go);
                return true;
            }
        }
        if (data && to.meta && to.meta.role && to.meta.role.indexOf(data.role) < 0) {
            Vue.Dialog.toast('您没有访问该页面的权限，请联系管理员！');
            next(from.path == '/' ? '/' : false);
        } else {
            next();
        }
    });
})

new Vue({
    router,
    store: State
}).$mount('#wrapper');