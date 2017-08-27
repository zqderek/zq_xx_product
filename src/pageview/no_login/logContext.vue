<template lang="pug">
    div.log-context
        div
            span 日志来源
            a(@click="exportLog") 导出前后十条日志
        table(style="width:100%")
            thead
                tr
                    th(width="60") #
                    th 结果
            tbody
                tr(v-for="(item,index) in logData"  :class="{'current': index== Math.floor(logData.length/2)}" )
                    td {{index + 1}}
                    td {{item._raw}}
</template>

<script>
    function lgoContext_getQuery_(string){
        var obj ={};
        string.forEach(i => {
            var key,val,splitPoint;
            splitPoint = i.indexOf('=');
            if(splitPoint !== -1){
            key = i.substring(0,splitPoint);
            val = i.substring(splitPoint+1);
            }
            obj[key] = val;
         });
       return obj;
    }      
    export default {
        data() {
            return {
                logData:[],
                searchId: '',
                log_id: ''
            }
        },
        computed: {

        },
        created() {

        },
        mounted() {

        },
        beforeRouteEnter(to, from, next) {
            const href = window.location.href;
            const paramsObj = lgoContext_getQuery_(href.substr(href.indexOf('?')+1).split('&'));
            if(!paramsObj.searchId) {
                next(me => {
                    me.$router.push({path:`/index`});
                })
            }
            next(me => {
                me.searchId = paramsObj.searchId;
                me.log_id = paramsObj.logId;
                me.$http.get('/api/log/search/context',{
                    params:{
                        tab_id: me.searchId,
                        log_id: me.log_id,
                        size: 20
                    }
                }).then(res => {
                    let data = res.body;
                    if(data.status) return me.$dialog.toast(data.error_message, 3000);
                    me.logData = data.events;
                });
            });
        },
        methods: {
            exportLog() {
                window.open(`/api/log/search/context/export?tab_id=${ this.searchId }&log_id=${ this.log_id }&size=20`);
            }
        }
    }
</script>

<style lang="scss">
    .log-context{
        &>div{
            padding: 15px 45px 5px 65px;
            &>span{
                font-size: 16px;
            }
            &>a{
                float: right;
                color: #96A2BF;
                font-size: 12px;
                padding: 0 5px;
                border: 1px solid #96A2BF;
                border-radius: 2px;
            }
        }
        table{
            width: 100%;
            th,td{
                text-align: left;
                padding: 10px 25px;
                vertical-align: top;
                border: 1px solid #eee;
                color: #888888
            }
            .current{
                background-color: #F6F9FC;
                &>td{
                    color: #6772E5
                }
            }
        }
    }
</style>