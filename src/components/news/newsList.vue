<template>
    <div>
        <div class="tmpl nav-top">
            <nav-bar title="新闻列表"></nav-bar>
            <!-- MUI 图文列表 -->
            <ul class="mui-table-view">
                <li v-for="news in newsList" :key="news.id" class="mui-table-view-cell mui-media">
                    <router-link :to="{name:'news.detail',query:{id:news.id}}">
                        <img class="mui-media-object mui-pull-left" :src="news.after">
                        <div class="mui-media-body">
                            <span v-text="news.title"></span>
                            <div class="news-desc">
                                <p>项目描述:{{news.des}}</p>
                                <!-- <p>发表时间:{{news.add_time | convertDate}}</p> -->
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newsList:[],//新闻列表数据
        }
    },
    created(){
        //发起请求
        this.$ajax.get('getCase')
        .then(res=>{
            console.log(res)
            this.newsList = res.data.cases;
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

</script>
<style scoped>
.mui-media-body p {
    color: #0bb0f5;
}

.news-desc p:nth-child(1) {
    float: left;
    white-space:nowrap; 
    overflow:hidden; 
    text-overflow:ellipsis;
    width: 100%;
}

.news-desc p:nth-child(2) {
    float: right;
}
.mui-media-body span{
    display: block;
    height: 20px;
}
/*.mui-table-view{
    margin-top: 40px;
    margin-bottom: 50px;
}*/
</style>
