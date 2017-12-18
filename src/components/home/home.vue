<template>
	<div class="tmpl">
		<!-- 头部 -->
		<mt-header fixed title="信息管理系统"></mt-header>
		<!-- 轮播图 -->
		<my-swipe :imgsUrl="imgsUrl"></my-swipe>
		<!-- home九宫格 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <!-- 1：去哪里 -->
                    <router-link :to="{name:'news.list'}">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">微整案例</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                	<router-link :to="{name:'cases.list'}">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">微整案例</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                	<router-link :to="{name:'discount.list'}">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">限时优惠</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">搜索资讯</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div></a></li>
            </ul> 
        </div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				imgsUrl:'http://test.legle.cc/getAdvertisementList',//轮到图列表
			}
		},
		created(){
			//登录
			this.$ajax.post('http://test.legle.cc/clientLogin',
                    'username=jige&password=123321'
                )
			.then(res=>{
				// console.log(res)

			})

			//发起请求
			this.$ajax.get('http://test.legle.cc/getAdvertisementList')
			.then(res=>{
				console.log(res);
				this.imgs = res.data.results;
				// console.log('home里面的数据'+this.imgs);

			})
			
		}
	}
</script>
<style scoped>
	/*轮播图样式*/
	.mint-swipe{
	    height:130px;
	}
	.mint-swipe img {
	    height: 130px;
	}
	/*九宫格样式*/
	.mui-table-view.mui-grid-view.mui-grid-9{
	    background-color: white;
	     border: 0;
	     margin-top: 0px;
	}
	.mui-table-view.mui-grid-view.mui-grid-9 li{
	    border: 0;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		padding-top: 20px;
		padding-bottom: 20px;
	}
	/*九宫格清除字体图标*/
	.mui-icon-home:before,
	.mui-icon-email:before,
	.mui-icon-chatbubble:before,
	.mui-icon-location:before,
	.mui-icon-search:before,
	.mui-icon-phone:before{
	    content: '';
	}
	/*九宫格背景图片*/
	.mui-icon-home{
	    background-image: url('../../static/img/news.png');
	    background-repeat: round;
	}
	.mui-icon-email{
	    background-image: url('../../static/img/picShare.png');
	    background-repeat: round;
	}
	.mui-icon-chatbubble{
	    background-image: url('../../static/img/goodShow.png');
	    background-repeat: round;
	}
	.mui-icon-location{
	    background-image: url('../../static/img/feedback.png');
	    background-repeat: round;
	}
	.mui-icon-search{
	    background-image: url('../../static/img/search.png');
	    background-repeat: round;
	}
	.mui-icon-phone{
	    background-image: url('../../static/img/callme.png');
	    background-repeat: round;
	}
	/*九宫格图标宽高*/
	.mui-icon{
	    height: 50px;
	    width:50px;
	}
</style>