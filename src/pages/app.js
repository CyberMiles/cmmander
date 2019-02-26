import Vue from 'vue'
import App from './app.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.prototype.$http = axios

Vue.use(Buefy)

new Vue({
	el: '#app',
	render: h => h(App)
});