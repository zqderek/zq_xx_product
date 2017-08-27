<template lang="pug">
    dialog-box.edit-metric(type="confirm" :visible="isShow" :title="title")
        .msg-wrap
            div
                label 指标名称
                    input(type="text" v-model="metricName") 
                label 
                    span 指标数据
                    textarea(v-model="metricSPL")                   
        .btn-wrap
            a(href="###" v-on:click.stop.prevent="closeSaveDialog" class="btn btn-max btn-s dialog-cancel") 取消
            a(href="###" v-on:click.stop.prevent="confirmSaveChart($event)" class="btn btn-max btn-s dialog-confirm"  :disabled="!metricName || !metricSPL") 确认
</template>

<script>
    export default {
        props:{
            isShow: Boolean,
            metricObj: {
                type: Object,
                default: {}
            },
            title: {
                type: String,
                default: '添加指标'
            }
        },
        data() {
            return{
                metricName: '',
                metricSPL: '',
                metric_id: ''
            }
        },
        computed: {

        },
        methods: {
            confirmSaveChart(e) {
                if(e.target.getAttribute('disabled')) return false;
                this.$emit('confirm-edit-metirc',{name:this.metricName,spl:this.metricSPL,id:this.metric_id})
            },
            closeSaveDialog() {
                this.$emit('close-dialog');
            }
        },
        created() {

        },
        mounted() {
            
        },
        watch: {
            metricObj: {
                handler(data) {
                    this.metricName = data.name || '';
                    this.metricSPL = data.spl || '';
                    this.metric_id = data.id || null;

                },
                immediate: true,
                deep: true
            }
        },
        components: {

        }
    }
</script>

<style lang="scss">  
   .edit-metric {
        .dialog.public-dialog {
            width:280px;
            text-align: center;
            
            .dialog-bd {
                padding: 15px 0;
            }
            .msg-wrap {
                label {
                    width: 100%;
                    margin-right: 5px;
                    margin-bottom: 10px;
                    float: left;
                    span{
                        vertical-align: top;
                    }
                    input{
                        width: 180px;
                        margin-left:10px;
                    }
                    textarea{
                        width: 180px;
                        min-height: 65px;
                        overflow-y: auto; 
                        margin-right: 0;
                        margin-left:10px;
                    }
                }
            }
            .btn-wrap a.btn-max.dialog-cancel{
                margin-left: 20px;
                margin-right: 10px;
                width: 100px;
            }
            .btn-wrap a.btn-max.dialog-confirm {
                margin-right: 20px;
                margin-left: 0;
                width: 100px;
            }
        }
    } 
</style>