<template lang="pug">
    form.login(autocomplete="off" @submit.prevent="submit();return false;")
        div.logo
        div.input-container(:class="{'isNotIE':!IE,'isIE':IE}")
            div
                input#input-domain(class="input__field input__field--madoka"  :class="{'hasValue': domain}" type="text" v-model="domain")
                label(class="input__label input__label--madoka" for="input-domain")
                    svg(v-if="!IE" class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 230 30" preserveAspectRatio="none")
                        path(d="m0,0l230,0l0,30l-230,0l0,-30z")
                    span(class="input__label-content input__label-content--madoka") 企业域
            div
                input#input-username(class="input__field input__field--madoka"  :class="{'hasValue': username}" type="text" v-model="username")
                label(class="input__label input__label--madoka" for="input-username")
                    svg(v-if="!IE" class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 230 30" preserveAspectRatio="none")
                        path(d="m0,0l230,0l0,30l-230,0l0,-30z")
                    span(class="input__label-content input__label-content--madoka") 用户名
            div
                //- input(type="password" style="width:0;height:0;float:left;visibility:hidden;padding:0;")
                input#input-psd(class="input__field input__field--madoka"  :class="{'hasValue': password}" type="password" v-model="password")
                label(class="input__label input__label--madoka" for="input-psd")
                    svg(v-if="!IE" class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 230 30" preserveAspectRatio="none")
                        path(d="m0,0l230,0l0,30l-230,0l0,-30z")
                    span(class="input__label-content input__label-content--madoka") 密码
        p(v-show="error") {{error}}
        div.login-btn-wrap
            button(class="btn btn-max btn-l" href="javascript:;" v-on:click="submit") 登录
</template>
<script>
import Vue from 'Vue';
  
export default {
    data() {
        return {
            username: '',
            password: '',
            domain: '',
            error: false,
            IE: false,
        }
    },

    computed: {
        a() {
            return 1;
        }
    },
    created() {
    if (document.documentMode == 9) {
        this.IE = true;    
        }
    },
    methods: {
        submit() {
            let me = this;
            me.$http.post('/api/user/login', {
                login_name: me.username,
                password: me.password,
                domain: me.domain
            }, {
                emulateJSON: true
            }).then(res => {
                let data = res.body;
                if(data.status == 1) return this.updatePwd(); 
                if (data && data.status) {
                    this.error = data.error_message || '登录信息有误，请检查并重新填写。';
                    setTimeout(() => {
                        this.error =false;
                    },3000);
                } else {
                    this.error = false;
                    location.href = "/dashboard";
                }
            });
        },
        updatePwd() {
            this.$router.push ({path: `/personal/updatePassword/${this.username}`});
            this.$dialog.toast('密码过期，请重新设置后登录');
        }
    }
}
</script>
