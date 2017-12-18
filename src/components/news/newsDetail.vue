<template>
    <div class="tmpl nav-top">
        <nav-bar title="项目详情"></nav-bar>
        <div class="news-title">
            <p v-text="newsDetailOne.title"></p>
            <div>
                <!-- <span>{{newsDetail.click}}次点击</span> -->
                <span>分类:{{newsDetailOne.part}}</span>
                <!-- <span>添加时间:{{newsDetail.add_time | convertDate}}</span> -->
            </div>
        </div>
        <div class="news-content">
            <div class="img-div">
                <img class="before" :src="newsDetailOne.before">
                <img class="after" :src="newsDetailOne.after" >
            </div>
            
            <div class="des" v-html="newsDetailOne.des"></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newsDetail:[], 
            newsDetailOne:{},
            id:''
        }
    },created(){
        //1.获取路由参数
        this.id = this.$route.query.id;
        //2:拼接路由参数成为后台请求的URL
        this.$ajax.get('getCase')
        .then(res=>{
            //3:响应回来渲染页面
            this.newsDetail = res.data.cases;

            this.newsDetailOne = this.newsDetail.filter(this.sillyb)[0];
            console.log(this.newsDetailOne)
        })
        .catch(err=>{
            console.log(err);
        })
       
    },
    methods:{
        sillyb(element,index,array){
            return (element.id == this.id)
        }
    }
}

</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
    color: #333;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0 20px 10px;
}


/*主体文章的左右距离*/

.news-content {
    padding: 10px;
    color: #333;
    letter-spacing: 1px;
}
.news-content img{
    width: 150px;
}
.img-div{
    width: 306px;
    margin: 0 auto;
}
.nav-top{
    margin-top: 100px;
}
.des{
    padding: 10px 20px;
    line-height: 24px;
}
</style>
