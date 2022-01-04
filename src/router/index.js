import Vue from 'vue'
import vue from 'vue'
import router from 'vue-router'
import Login from '../components/Login'
import Main from '../components/Main'



Vue.use(router);
export default new router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component:Login
        },
        {
            path: '/main',
            name: 'Main',
            component: Main,
            props:true
            
          
        }
    ]
})