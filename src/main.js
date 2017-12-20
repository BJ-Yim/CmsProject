'use strict';

//引入第三方包开始
import Vue from 'vue';

//引入路由对象
import VueRouter from 'vue-router';
//安装插件
Vue.use(VueRouter);

// //Mint:引入mint-ui
// import Mint from 'mint-ui';
// //安装插件
// Vue.use(Mint);

// mint-ui 按需引入 开始
import Header from 'mint-ui/lib/header';
import Switch from 'mint-ui/lib/switch';
import Swipe from 'mint-ui/lib/swipe';
import SwipeItem from 'mint-ui/lib/swipe-item';
import Lazyload from 'mint-ui/lib/lazyload';
import Loadmore from 'mint-ui/lib/loadmore';
import Indicator from 'mint-ui/lib/indicator';
import Button from 'mint-ui/lib/button';
Vue.component(Header.name, Header);
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
// mint-ui 按需引入 结束

//Mint:引入css
import 'mint-ui/lib/style.css';

//引入mui样式
import './static/vendor/mui/dist/css/mui.css';
//全局样式
import './static/css/global.css';

//引入axios
import Axios from 'axios';
//挂载原型
Vue.prototype.$ajax = Axios;
//默认配置
Axios.defaults.baseURL = 'http://azz.legle.cc/';
//解决跨域cookie
Axios.defaults.withCredentials = true;

//Moment:引入moment
import Moment from 'moment';

//VuePreview:引入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

//引入第三方包结束

//引入全局组件需要的组件对象 开始
import NavBar from './components/common/navBar.vue';
import MySwipe from './components/common/mySwipe.vue';
//引入全局组件需要的组件对象 结束

//定义全局过滤器
Vue.filter('convertDate',function(value){
    return Moment(value).format('YYYY-MM-DD');
})

//定义成全局组件
Vue.component('navBar',NavBar); //使用最好以nav-bar
Vue.component('mySwipe',MySwipe);  //使用要以my-Swipe

//Axios:拦截器操作loadding
Axios.interceptors.request.use(function(config){
	//显示loading
	Indicator.open({
		text:'加载中...',
		spinnerType:'fading-circle'
	})
	return config
})
Axios.interceptors.response.use(function(config){
    //隐藏图标
    Indicator.close();
    //获取到config中的data，进行加工
    return config;
});




//引入自己的vue文件开始
import App from './app.vue';
//路由懒加载,按需加载
const Home =r=>require(['./components/home/home.vue'],r);
const Member =r=>require(['./components/member/member.vue'],r);
const Shopcart =r=>require(['./components/shopcart/shopcart.vue'],r);
const Search =r=>require(['./components/search/search.vue'],r);
const NewsList =r=>require(['./components/news/newsList.vue'],r);
const NewsDetail =r=>require(['./components/news/newsDetail.vue'],r);
const CasesList =r=>require(['./components/cases/casesList.vue'],r);
const CasesDetail =r=>require(['./components/cases/casesDetail.vue'],r);
const DiscountList =r=>require(['./components/discount/discountList.vue'],r);
const DiscountDetail =r=>require(['./components/discount/discountDetail.vue'],r);

// import Home from './components/home/home.vue';
// import Member from './components/member/member.vue';
// import Shopcart from './components/shopcart/shopcart.vue';
// import Search from './components/search/search.vue';
// import NewsList from './components/news/newsList.vue';
// import NewsDetail from './components/news/newsDetail.vue';
// import CasesList from './components/cases/casesList.vue';
// import CasesDetail from './components/cases/casesDetail.vue';
// import DiscountList from './components/discount/discountList.vue';
// import DiscountDetail from './components/discount/discountDetail.vue';
//引入自己的vue文件结束

//创建路由对象并配置路由规则
let router = new VueRouter({
    linkActiveClass:'mui-active',
	routes:[
        { path: '/', redirect: { name: 'home' } }, //重定向
        { name: 'home', path: '/home', component: Home },//首页
        { name:'member',path:'/member',component: Member}, //会员
        { name: 'shopcart',path:'/shopcart',component:Shopcart}, //购物车
        { name: 'search',path:'/search',component:Search}, //查找
        { name:'news.list',path:'/news/list',component:NewsList}, //新闻列表
        { name:'news.detail',path:'/news/detail',component:NewsDetail}, //案例详情
        { name:'cases.list',path:'/cases/list',component:CasesList}, //案例
        { name:'cases.detail',path:'/cases/detail',component:CasesDetail}, //案例
        { name:'discount.list',path:'/discount/list',component:DiscountList}, //限时优惠
        { name:'discount.detail',path:'/discount/detail',component:DiscountDetail} //显示优惠
	]
});

console.log('起名字vendors')
//创建vue实例
new Vue({
	el:'#app',
	router,
	render:c=>c(App)
})