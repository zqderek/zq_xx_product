<template lang="pug">
    .data-table
        pagination(:total="total" :cur-page="curPage" :ps="ps" page-span="5" @page-num:change="getDataByPageNum" style="text-align:left")
        slot(name="filter")
        .__table-content__(v-show="!showLoading"  :class="{err: !showLoading && error_message}")
            slot(name="table" v-if="!error_message")
            chart-msg(v-if="error_message" :msg="error_message")
        v-loading(:show="showLoading" position="relative" h="400px")
</template>

<script>
import Page from '../pagination.vue';
import bus from '../../store/bus.js';
import ChartMsg from '../../pageview/dashboard/chart-msg.vue';
export default {
    name: 'v-table',
    props: {
        url: {
            required: true
        },
        //处理返回数据
        datafilter : {
            type: Function,
            default: null
        },
        //配置是否需要分页
        needpagination: {
            type: Boolean,
            default: true
        },
        frontpage: {
            default: false
        },
        //初始化的时候是否默认执行一次getPageData
        initrequest: {
            default: true,
            type: Boolean
        },
        ps: {
            default: 20
        },
        pn: {
            default: 0
        },
        param: {
            default: () => {}
        },
        type: {
            default: 'get'
        },
        frontPageDel:{ // 前端分页 并且有删除操作后 需要重新请求数据源
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            total: 0,
            list: [],
            curPage: this.pn,
            filterList: [],
            showLoading: true,
            error_message: '',
            xhrStore: null
        }
    },
    mounted() {
        let me = this;
        //加载第一页
        if(this.initrequest) me.getDataByPageNum(0);
        //watch url变化
        this.$watch('url', () => {
            me.getDataByPageNum(0);
        })

        this.$watch('pn', () => {
            me.curPage = me.pn;
            me.getDataByPageNum();
        });

        this.$watch('param', () => {
            if(!this.param.ignore) me.curPage = 0;
            if (me.frontpage) {

                me.filterList = typeof me.datafilter == 'function' ? me.datafilter(me.list) : me.list;
                me.total = me.filterList.length;
                me.getLocalDataByPn();
            } else {
                if(this.param.ignore) return;   //有些参数变化后不需要立刻重新请求，加上ingore参数用来区分
                me.getDataByPageNum();
            }
        }, {deep: true});
        bus.$on('reload-event',function(data){
           me.getDataByPageNum(data);
        })
    },
    destroyed() {
         bus.$off('reload-event');
    },
    methods: {          
        getDataByPageNum(pn) {
            let me = this;
            if(pn != undefined) {
                me.curPage = pn
            }
            if (me.list.length && me.frontpage && !me.frontPageDel) {
                return me.getLocalDataByPn();
            } 
            let paramsObj = {
                'get':{
                    params: $.extend({
                        'page_size': me.ps,
                        'page_number': me.curPage + 1
                    }, me.param),
                    before(request) {
                        if (me.xhrStore) {
                            console.log('canceld re')
                            me.xhrStore.abort();
                        }
                        me.xhrStore = request;
                    }
                },
                'post': $.extend({
                            'page_size': me.ps,
                            'page_number': me.curPage + 1
                        }, me.param)
                    
            };
            this.showLoading = true;
            this.error_message = '';
            me.$http[me.type](me.url, paramsObj[me.type]).then(res => {
                me.showLoading = false;
                let data = res.body;

                if (data && data.status) {
                    this.total = 0;
                    this.error_message = data.error_message || '获取数据失败~';
                    return me.$dialog.toast(data.error_message || '获取数据失败~');
                }
                me.total = data.total_count;

                if (typeof me.datafilter == 'function')
                    data = me.datafilter(data);
                
                me.list = data;
                me.filterList = data;
                if (me.frontpage) {
                    return me.getLocalDataByPn();
                }
                me.$emit('data-change', [me.list, me.curPage]);
            })
        },

        getLocalDataByPn() {
            let me = this;
            me.$emit('data-change', [me.filterList.slice(me.curPage * me.ps, (me.curPage + 1) * me.ps), me.curPage])
        }
    },
    components: {
        'pagination': Page,
        'chart-msg': ChartMsg
    }
}
</script>
