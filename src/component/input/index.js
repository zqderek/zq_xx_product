import VInput from './index.vue';
import VInputSearch from './input-search.vue';
export default {
    install(Vue) {
        Vue.component(VInput.name, VInput);
        Vue.component(VInputSearch.name, VInputSearch);
    }
};
