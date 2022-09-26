import { createApp } from 'vue';
import App from './App.vue';
// import naive from 'naive-ui';
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue';

createApp(App)
// .use(naive)
.use(router)
.use(
    createAuth0({
        domain: "dev-pmw60n9g.us.auth0.com",
        client_id: "BsLqbqnObqfBHW23JSNM0BkoB8Sc5rQm",
        redirect_uri: window.location.origin,
        audience: "https://logy.codehard.xyz/api",
        scope: "read:log",
    })
)
.mount('#app');
