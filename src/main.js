import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.dataset.title
    }
})

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'
const opts = {}

export default new Vuetify(opts)

//左右滑动插件
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
VueTouch.config.swipe = {
    threshold: 100 //设置左右滑动的距离
}

//注册事件总线
Vue.prototype.$bus = new Vue()

// 注册数组方法
// 1.去除重复的
Array.prototype.push_unique = function() {
    for (var i = 0; i < arguments.length; i++) {
        var ele = arguments[i];
        if (this.indexOf(ele) == -1) {
            this.push(ele);
        }
    }
};
// 2.删除对应的
Array.prototype.removeByValue = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}


Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify: new Vuetify(),
    render: h => h(App)
}).$mount('#app')