<template lang="pug">
    .ui-pagination
        span.total
            | 共
            em {{total}}
            | 条
        span.pages(@click.prevent='go', v-show='pageCount > 1')
            a.ui-page(href='#', :class='{disabled: pn == 0}', :data-page='pn-1') 上一页
            a.ui-page(href='#', :class='{current: pn == 0}', data-page='0') 1
            em.ui-page.ellipsis(v-show='spanRange[0] > 1 && spanRange.length >= pageSpan') ⋯
            a.ui-page(v-for='n in spanRange', href='#', :class='{current: n == pn}', :data-page='n') {{n+1}}
            em.ui-page.ellipsis(v-show='showEndEllipse && spanRange.length >= pageSpan') ⋯
            a.ui-page(href='#', :class='{current: pn == pageCount-1}', :data-page='pageCount - 1') {{pageCount}}
            a.ui-page(href='#', :class='{disabled: pn == pageCount-1}', :data-page='pn+1') 下一页
</template>

<script>
    export default {
        props: {
            total: {
                default: 0                  //总条数
            },
            curPage: {
                default: 0                  //当前页
            },
            ps: {
                default: 20                 //每页显示条数
            },
            pageSpan: {
                default: 10                 //页码的显示个数
            }
        },
        data() {
            return {
                pn: this.curPage
            }
        },
        computed: {
            pageCount () {  //计算总页码
                return Math.ceil(this.total / this.ps) || 0;
            },
            showEndEllipse () {
                return this.spanRange[this.spanRange.length-1] < (this.pageCount-2);
            },
            /**
             * 计算要显示的页码，不包括第一页和最后一页
             * e.g. [4,5,6,7,8,9,10]
             */
            spanRange () {
                let start, end, sr = [];
                if (this.pageCount <= this.pageSpan) {
                    start = 1;
                    end = this.pageCount - 2;
                } else if (this.pn <= this.pageSpan - 3) {
                    start = 1;
                    end = Math.min(this.pageSpan, this.pageCount - 2);
                } else if (this.pn + 3 >= this.pageCount - 1) {
                    start = Math.max(this.pageCount - 1 - this.pageSpan, 1);
                    end = this.pageCount - 2;
                } else {
                    start = this.pn - this.pageSpan + 3;
                    end = this.pn + 3;
                }
                for(let i = start; i <= end; i++){
                    sr.push(i);
                }
                return sr;
            }
        },
        methods: {
            /**
             * 切换页码
             * event 点击事件，用以获取target
             */
            go (event) {
                var target = event.target;
                //若点击的元素带有 disabled、current、ellipsis的class，则返回
                if(/\b(disabled|current|ellipsis)\b/.test(target.className)){
                    return;
                }
                this.pn = parseInt(target.getAttribute('data-page'));
                this.$emit("page-num:change", this.pn);
            }
        },
        watch: {
            /**
            * 监测页码变化，删除一页最后一条数据时 页码往前退一位
            **/
            // curPage: {
            //     handler(data){
            //         if(data>this.pageCount && data!=0){
            //             this.pn = data-1;
            //             this.$emit("page-num:change", this.pn);
            //         }
            //     }
            // }
            curPage() {
                this.pn = this.curPage;
            }
        }
    }
</script>
