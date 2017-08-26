<template lang="pug">
.dialog-box(:style="{display: visible ? 'block' : 'none'}")
    .dialog(:class="{'public-dialog': type!='dialog', 'toast-dialog': type=='toast', 'ok-dialog': (type=='ok' || type=='error' || type=='warn')}")
        .dialog-hd(v-if='title')
            | {{title}}
            //- a.fa.fa-times.close(@click='hide')
        .dialog-bd
            slot
    .dialog-mask
</template>

<script>
    import Vue from 'vue'
    export default {
        props: {
            type: {
                default : 'dialog'
            },
            title: String,
            msg: String,
            visible: {
                default: false
            }
        },
        methods: {
            _removeDialog () {
                this.$el.parentNode.removeChild(this.$el);
                //TODO: remove event handlers
            },
            _centerDialog () {
                var elem = this.$el.querySelector('.dialog');
                var w = elem.offsetWidth;
                var h = elem.offsetHeight;
                elem.style.marginLeft = '-' + w / 2 + 'px';
                elem.style.marginTop = '-' + h / 2 + 'px';
            },
            show () {
                this.visible = true; 
                Vue.nextTick(this._centerDialog);
            },
            hide () {
                this.visible = false;
            }
        },
        destroy() {
            this._removeDialog();
        },
        mounted() {
            this.visible && Vue.nextTick(this._centerDialog);
        },
        watch: {
            visible() {
                this.visible && Vue.nextTick(this._centerDialog);
            }
        }
    }
</script>

