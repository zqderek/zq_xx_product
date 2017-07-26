<template lang="pug">
div(:class="{'login-page':$route.meta.type=='login'}")

    div#hd(v-if="$route.meta.childNav")
        .no-nav
            a.go-back(@click.prevent="goBack"): i.icon.icon-arr-left-fff
            h1 {{$route.meta.name}}
    div#hd(v-if="!$route.meta.childNav && !$route.meta.hideNav && $route.meta.type!='logContext'")
        .hd-wrapper
            span.logo: img(src="../img/logo-product.png" alt="rizhi.ai" class="" width="59px" height="26px")
            nav
                span(v-if="signed && !shareMode")
                    router-link(to="/dashboard" tag="a") 仪表盘
                    router-link(to="/analysis" tag="a") 日志搜索
                    router-link(to="/alarm" tag="a") 告警
                    router-link(to="/source" tag="a" v-if="[100, 10].indexOf(userInfo.role) > -1") 日志源
                    router-link(:to="systemTo[userInfo.role]" tag="a" v-if="[100, 10].indexOf(userInfo.role) > -1") 系统设置
                span(v-if="!signed && !$route.meta.type")
                    router-link(to="/index" tag="a"): span 首页
                    a(href="https://www.bdp.cn/home.html" target="_blank"): span 海致BDP
                    a(href="http://www.haizhi.com/" target="_blank"): span 海致知识图谱
                    router-link(to="/source" tag="a"): span 关于我们
                    router-link(to="/login" tag="a"): span 登录
                span(v-if="$route.meta.type=='login'")
                    router-link(to="/index" tag="a"): span 返回首页
            div.user(v-if="signed && !shareMode")
                div.signed(v-show="signed")
                    p.name
                        span {{userInfo.Chinese_name}}
                    ul.user-menu
                        li
                            router-link(to="/personal") 账户设置
                        li
                            a(@click.prevent="logout()") 退出
                div.unsigned(v-show="!signed")
                    a.name(href='') 登录
                i.alarm(@click="showAlarmMsg" :class="{'has-new-alarm': alarmMsgCount && alarmMsgCount.count}" :data-msgcount="alarmMsgCount && alarmMsgCount.count")

    div#bd(style="height:calc(100% - 40px)")
        transition(name="component-fade")
            router-view

    div#ft(style="height:0px")       
</template>

<script>
    import Vue from 'Vue';
    export default {
        data() {
            return {
                systemTo: {
                    "100": "/system/user_manage",
                    "10": "/system/log_permission",
                },
                shareMode: false
            }
        },
        created() {
            if(this.$route.params.share_id) this.shareMode = true;
        },
        computed: {
            routeRole() {
                try {
                    return this.$route.meta.role || [0];
                } catch(e) {
                    return [0];
                }
            },
            userInfo() {
                return this.$store.state.userInfo || {};
            },
            signed() {
                return this.$store.state.signed || false;
            },
            alarmMsgCount() {
                return {
                    count: this.$store.state.alarmMsgCount <= 0 ? 0 : this.$store.state.alarmMsgCount
                }
            }
        },
        methods: {
            logout () {
                var me = this;
                Dialog.warn('确认退出登录吗？', {title: "操作提示", sureText: "确定", cancleText: "取消"}).then( ret => {
                    if (!ret) return null;
                    return me.$http.post('/api/user/logout')
                }).then( res => {
                    if (!res) return;
                    res = res.body;
                    if( res.status ) {
                        return Dialog.alert(res.error_message);
                    }
                    if(me.$cookie.get('user_id')) {
                        me.$cookie.set('user_id', "");
                    }
                    location.href = '/index';
                })
            },

            showAlarmMsg() {
                this.$router.push({ path: '/alarm/message' });
            },

            goBack() {
                if (this.$route.meta.referr) {
                    this.$router.replace(this.$route.meta.referr);
                } else {
                    this.$router.go(-1);
                }
            },
            login() {
                window.location.replace('/login');
            },
            goHome() {
                window.location.replace('/index');
            },

            fechSocket() {
                let me = this;
                let ws = new WebSocket('ws://180.76.166.214:23450/api/message/push?user_id=' + this.userInfo.user_id);
                ws.onopen = function(e){
                    console.log('ws connected', e);
                };
                ws.onmessage = function(e){
                    let data = e.data || `{'type': 'fixed', 'count': 1}`;
                    console.log('ws Recieved', e.data, typeof e.data);
                    data = JSON.parse(data);
                    me.$store.state.alarmMsgCount += data.count;
                };
                ws.onclose = function(){
                    console.log('ws disconnected');
                };
            }
        },

        watch: {
            signed() {
                if(this.signed) this.fechSocket();
            }
        },
         mounted() {
                if(this.signed) this.fechSocket();
         }
    }
</script>
