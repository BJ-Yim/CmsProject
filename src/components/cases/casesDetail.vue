<template>
    <div class="tmpl nav-top">
        <nav-bar title="项目详情"></nav-bar>
        <div class="photo-title">
            <p v-text="casesDetail.title"></p>
            <span>发布日期：{{time | convertDate}}</span>
            <span>分类：{{part}}</span>
        </div>
        <div class="img-div">
            <img v-for="(img,index) in imgs"  :key="index" class="preview-img" :src="img.src" width="185" @click="$preview.open(index, imgs)">
            <!-- <img v-for="(img,index) in imgs" :key="index" class="preview-img" :src="img.src" v-preview="img.src"> -->
        </div>
        <div class="photo-desc">
            <p v-html="casesDetail.des"></p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            casesDetail:{},
            part:'',
            time:{},
            imgs:[{},{}]
            // imgs: [{
            //   src: '',
            //   w: 268,
            //   h: 359.5
            // }, {
            //   src: '',
            //   w: 268,
            //   h: 359.5
            // }]
        }
    },created(){
        //1.获取路由参数
        let id = this.$route.query.id;
        console.log(id)
        //2:拼接路由参数成为后台请求的URL
        this.$ajax.get('cases?id='+id)
        .then(res=>{
            console.log(res);
            //3:响应回来渲染页面
            this.part = res.data.parts[0];
            this.casesDetail = res.data.cases[0];
            this.time = this.casesDetail.meta.createdAt;
            this.imgs[0].src = this.casesDetail.before;
            this.imgs[1].src = this.casesDetail.after;
            //forEach
            this.imgs.forEach((ele)=>{
                ele.w=268;
                ele.h=359.5; //缩率图显示的高
            })
            console.log(this.imgs);

        })
        .catch(err=>{
            console.log(err);
        })
       
    },
    methods:{

    }
}

</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
    padding-left: 10px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

}

.photo-desc {
    padding-bottom: 5px;
    margin-bottom: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
    color: #333;
    line-height: 24px;
    padding: 10px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}
.img-div{
    padding-left: 2px;
}
.img-div img{
    width: 185px;
}
</style>
