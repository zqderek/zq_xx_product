import Vue from 'vue'
import Dialog from './_dialog.vue'

Vue.component('dialogBox', Dialog);

const dialogBoxId = '__DIALOG_BOX__';
var template = `<div id="${dialogBoxId}">
    <dialog-box :type="type" visible="true" :title="title">
        <div class="msg-wrap">
            <i class="icon icon-warn" v-if="type == 'warn'"></i>
            <i class="icon icon-confirm" v-if="type == 'confirm'"></i>
            <i class="icon icon-ok" v-if="type == 'ok'"></i>
            <i class="icon icon-error" v-if="type == 'error'"></i>
            <span v-if="options.safe">{{msg}}</span>
            <span v-else>{{msg}}</span>
        </div>
        <div class="btn-wrap" v-if="type != 'toast'">
            <a href="javascript:void(0)" class="btn btn-gray btn-s dialog-cancel" v-on:click="onclicked(false)" v-if="type == 'confirm' || type=='warn' || type=='ok' || type=='error' ">{{ options.cancelText || '取消' }}</a>
            <a href="javascript:void(0)" class="btn btn-max btn-s dialog-confirm" v-on:click="onclicked(true)" id="dialogBtnDefault">{{ options.sureText || '确定' }}</a>
        </div>
    </dialog-box>
</div>
`;

var openDialog = function(type, msg, options) {
    options = options || {};
    var container = document.createElement('div');
    document.body.appendChild(container);
    return new Promise((resolve, reject) => {
        let vm = new Vue({
            el: container,
            template: template,
            data: {
                msg: msg,
                type: type,
                title: options.title,
                options: {
                    safe:  options.safe || false,
                    timeout: options.timeout || 2000,
                    sureText: options.sureText,
                    cancelText: options.cancelText
                }
            },
            methods: {
                onclicked(result) {
                    this.closeDialog(result);
                },

                closeDialog(result) {
                    document.body.removeChild(document.querySelector('#' + dialogBoxId));
                    vm.$destroy();
                    resolve(result);
                }
            },
            mounted(){
                let me = this;
                if (this.type == 'toast') {
                    return setTimeout(() => {
                        me.closeDialog();
                    }, me.options.timeout);
                }
                var btn = this.$el.querySelector('#dialogBtnDefault');
                btn.focus();
            }
        });
    });
}

Dialog.confirm = function(msg, options) {
    return openDialog('confirm', msg, options);
}

Dialog.warn = function(msg, options) {
    return openDialog('warn', msg, options);
}

Dialog.alert = function(msg, options) {
    return openDialog('alert', msg, options);
}

Dialog.ok = function(msg, options) {
    return openDialog('ok', msg, options);
}

Dialog.error = function(msg, options) {
    return openDialog('error', msg, options);
}

Dialog.toast = function(msg, timeout) {
    timeout = timeout || 2000;
    let options = {
        timeout: timeout
    };
    if (typeof timeout == 'object')  options = timeout;
    return openDialog('toast', msg, options);
}

Dialog.new = function() {
    return require('./_dialog.vue');
}

Dialog.install = function install(Vue) {
    Vue.Dialog = Dialog;
    Vue.prototype.$dialog = Dialog;
    Vue.component('dialog-box', Dialog)
}

export default Dialog;
