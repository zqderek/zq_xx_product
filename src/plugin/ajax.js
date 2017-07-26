export default {

    //插件入口
    install(Vue, options) {

        Vue.http.interceptors.push(function(request, next) {

            //阻止get请求缓存
            if (request.method.toUpperCase() == 'GET') {
                request.params._t = Math.random();
            }

            // continue to next interceptor
            next(function(response) {

            });
        });
    }

};
