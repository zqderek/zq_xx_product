<template lang="pug">
div
    link(rel="stylesheet" type="text/css" href="/static/js/lib/slick/slick.css")
    .banner#banner: .banner-wrapper
        .intro
            img(src="/static/img/title.png" alt="")
            h2 海致日志采集及处理平台
            p 结合人工智能和大数据技术，从日志等机器数据中进行快速故障定位、可视化分析、智能告警和知识挖掘。
        img#banner-img-1.vertical-to-up(src="/static/img/banner_anima_1.png")
        img#banner-img-2.vertical-to-down(src="/static/img/banner_anima_2.png")
        img#banner-img-3.vertical-to-up(src="/static/img/banner_anima_3.png")
        .carousel
            div: img(src="/static/img/carousel_1.png")
            div: img(src="/static/img/carousel_2.png") 
            div: img(src="/static/img/carousel_3.png")
    .overview#overview      
        h2 业界领先的企业级产品
        p 支持完善的SPL，支持海致独有的日志智能聚合算法（正在申请专利，由获得过计算机奥赛一等奖、现役数独<br>国家队成员的算法专家花费半年以上时间主持研发），应用场景<br>涵盖故障定位、性能分析、安全审计。
        ul.detail
            li
                i.collect
                h3 日志统一采集
                p 将分散到各处的应用日志、系统日志、网络设备日志等统一采集，集中管理，除满足安全和审计需求外，还可以对日志进行统一分析和处理。
            li
                i.itellengent
                h3 日志智能分析
                p 采用先进的检索技术，索引大量常见日志格式，并可以自定义日志解析规则，支持管道、<em>SPL</em>（搜索处理语言）等，引入日志聚合、模式比较等机器学习的算法，帮助运维人员进行故障和疑点信息的快速定位。
            li
                i.visiblize
                h3 结果可视化
                p 运用可视化技术，将原有的机器数据形式的日志事件通过图形化展现，并提供简单易用的交互操作，充分提高运维人员的工作效率。
    .function-describe
        ul.detail-info
            li
                .icon-function-desc.vertical-to-up
                    img(src="/static/img/word_f_product.png").fg.word
                    img(src="/static/img/word_b.png").bg.horizontal
                .fun-info.vertical-to-up
                    i.word
                    h3 智能化字段解析
                    p 系统内置多种日志格式，包括操作系统日志、网络设备日志、数据库日志等
                    p 用户可以进行日志格式自定义解析规则的设置
                    p 如果没有事先指定日志格式，在查询时可以进行动态解析
            li
                .fun-info.vertical-to-up
                    i.alarm
                    h3 告警与报表
                    .detail-desc
                        h5 日志聚合&nbsp;·
                        p 数十万日志通过智能算法被聚类成数十种日志模式。
                    .detail-desc
                        h5 模式比较&nbsp;·
                        p 平移一定时间窗口，输出不同聚合结果间模式类别的变化。
                    .detail-desc
                        h5 详情钻取&nbsp;·
                        p 通过异常信息钻取原始日志，快速排查具体问题。
                .icon-function-desc.vertical-to-up
                    img(src="/static/img/alarm_f_product.png").fg.alarm
                    img(src="/static/img/alarm_b.png").bg.horizontal
            li
                .icon-function-desc.vertical-to-up
                    img(src="/static/img/mal_f_product.png").mal.fg
                    img(src="/static/img/mal_b.png").bg.horizontal
                .fun-info.vertical-to-up
                    i.mal 
                    h3 快速故障定位
                    p 通过优化后的搜索引擎，支持基于关键字的快速检索
                    p 结合可视化技术和自定义仪表盘，当故障发生时，快速找到问题根源
            li
                .fun-info.vertical-to-up
                    i.spl
                    h3 SPL处理语言
                    p SPL作为运维人员的专用SQL，可以极大的降低日常运维工作量
                    p 海致SPL 提供 stats、top、eval、where、lookup、transaction 等20多项管道指令
                    p 支持max、min、avg、sum、等多项统计函数
                .icon-function-desc.vertical-to-up
                    img(src="/static/img/spl_f_product.png").fg.spl
                    img(src="/static/img/spl_b.png").bg.horizontal
        .outline
            h2 让数据真正服务于工作
            p 青岛银行通过日志分析平台将应用日志、安全日志等海量非结构化日志抽象为时序数据并建立高效索引，<br>在此基础上深度挖掘日志应用价值，为企业内部运维及业务决策提供强有力支撑。<br>并获得2016银行业信息科技风险管理课题二类成果奖！
    .sign-in
        h2 您的产品的未来可能就存在于您的数据中
        p 如需更深入了解产品，请填写以下信息，我们会尽快安排专业人员与您沟通，帮助您快速建立企业数据解决方案。
        form
            .container
                label(for="name") 您的称呼&nbsp;
                    span.must *
                    input(type="text" name="name" value="")
                label(for="position") 您的职位&nbsp;
                    span.must *
                    input(type="text" name="position" value="")
                label(for="company") 所在公司&nbsp;
                    span.must *
                    input(type="text" name="company" value="")
                label(for="department") 所属部门&nbsp;
                    span.must *
                    input(type="text" name="department" value="")
                label(for="tele") 联系电话&nbsp;
                    span.must *
                    input(type="text" name="tele" value="")
                label(for="email") 电子邮箱&nbsp;
                    span.must *
                    input(type="text" name="email" value="")
                textarea#suggestion(name="suggestion" placeholder="您有什么建议或者需求？") 
                button.button(type="submit") 立即提交
    .footer
        .wrapper
           p 15510130017
           ul
              li sales@rizhi.ai / support@haizhi.com
              li 地址：北京市海淀区学院路甲5号768创意产业园
              li 海致网络技术（北京）有限公司
              li 微信公众号ID：海致大数据头条
        .copyright Copyright&nbsp;©&nbsp;2013-2017&nbsp;Haizhi&nbsp;Ltd.&nbsp;京ICP备14006821号
</template>
<script>
import Vue from 'Vue';

export default {
    data() {
        return {
            n: 0,
            nVerti: 0,
            mun: 0,
            animasHorizontal: null,
            animasVertival: null
        }
    },

    computed: {
    },
    methods: {
        throttle(fun, delay, time) {
            var timeout,
                startTime = new Date();
            return function () {
                var context = this,
                    args = arguments,
                    curTime = new Date();
                clearTimeout(timeout);
                if (curTime - startTime >= time) {
                    fun.apply(context, args);
                    startTime = curTime;
                } else {
                    timeout = setTimeout(fun, delay);
                }
            };
        },
        lazyLoad() {
            var hdHeight = $('#hd').height();
            var overviewTop = $('#banner-img-1').offset().top;

            var seeHeight = document.documentElement.clientHeight;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > (overviewTop - hdHeight)) {
                $('.index-page #hd').addClass('intransparant');
            } else {
                $('.index-page #hd').removeClass('intransparant');
            }

            for (var j = this.nVerti; j < this.numVerti; j++) {
                if (this.animasVertival.eq(j).offset().top < (seeHeight + scrollTop)) {
                    this.animasVertival.eq(j).addClass('trans-up');
                    (this.nVerti)++;
                }
            }

            for (var i = this.n; i < this.num; i++) {
                if (this.animasHorizontal.eq(i).offset().top < (seeHeight + scrollTop)) {
                    if (i % 2) {
                        this.animasHorizontal.eq(i).addClass('trans-to-left');
                    } else {
                        this.animasHorizontal.eq(i).addClass('trans-to-right');
                    }
                    (this.n)++;
                }
            }

        }
    },
    mounted () {
        this.animasHorizontal = $(".horizontal");
        this.animasVertival = $(".vertical-to-up");
        this.num = this.animasHorizontal.length;
        this.numVerti = this.animasVertival.length;
        this.n = this.nVerti = 0;
        var me = this;
        $(document).on('scroll', me.throttle(me.lazyLoad, 300, 1000));
        this.lazyLoad();
        $('#banner-img-2').addClass('trans-up');
        $('.sign-in label input[type=text]').focus(function() {
            $(this).parent().addClass('highlight');
        });
        $('.sign-in label input[type=text]').blur(function() {
            $(this).parent().removeClass('highlight');
        });
        $('.carousel').slick({
            dots: true,
            autoplay: true
        });
    },
    destroyed () {
        $(document).off('scroll');
    }
}
</script>