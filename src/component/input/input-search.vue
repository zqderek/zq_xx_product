<template lang="pug">
.group-input.search(:class="{'size-m': size=='m', 'size-s': size=='s', 'size-l': size=='l'}")
    .group-icon
        i.icon.icon-search
    .input
        i.icon.icon-clear(@click="keywords='';keyup()" v-show="keywords")
        input(type="text" v-model="keywords" :placeholder="placeholder" @keyup.enter="keyup")
</template>
<script>
export default {
    name: 'input-search',
    props: {
        size: {
            default: 'm'
        },
        placeholder: {
            default: '请输入关键字'
        }
    },
    data() {
        return {
            keywords: '',
            timer: null
        }
    },

    methods: {
        keyup() {
            let me = this;
            if (me.timer) clearTimeout(me.timer);
            me.timer = setTimeout(() => {
                me.$emit('input', me.keywords);
                clearTimeout(me.timer);
                me.timer = null;
            }, 0);
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .size-m.group-input {
        width: 315px;
    }
</style>

