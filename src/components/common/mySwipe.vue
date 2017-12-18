<template>
    <div>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a :href="img.url"><img :src="img.imgUrl"></a></mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                imgs:[]
            }
        },
        props:['imgsUrl'],
        created(){
            //发起请求
                console.log('轮播地址'+this.imgsUrl);
            this.$ajax.get(this.imgsUrl)
            .then(res=>{
                this.imgs = res.data.results;
                console.log('轮播图片'+this.imgs);
                // console.log('home里面的数据'+this.imgs);

            })
        },
        // mounted(){
        //     console.log('是否有值'+ this.imgs)
        //     this.imgss = this.imgs
        // }
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
</style>