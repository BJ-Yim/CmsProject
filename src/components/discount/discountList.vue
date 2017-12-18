<template>
    <div class="tmpl" style="height:577px;">
        <nav-bar title="商品列表" ></nav-bar>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
        <!-- 上啦完毕调用该元素的onBottomLoaded函数， -->
            <ul class="mui-table-view mui-grid-view">
                <li v-for="prod in prods" :key="prod.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link :to="{name:'discount.detail',query:{title:prod.title} }">
                        <img class="mui-media-object" :src="prod.img">
                        <div class="mui-media-body">{{prod.title}}</div>
                        <div class="desc">
                            <div class="sell">
                                <span>￥{{prod.price}}</span>
                                <s>￥{{prod.priceH}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">
                                    {{prod.des}}
                                </div>
                                
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pageIndex:0,//页码
            prods:[],//商品列表数据
            prodsAll:[],//所有商品列表数据
            allLoaded:false, //是否禁止触发上拉函数
            isAutoFill:false,//是否自动触发上拉函数
        }
    },
    created(){
       this.loadMore();//1
    },
    methods:{
        loadBottom(){
            console.log('上啦触发了');
            this.loadmoreConcat();
        },
        loadMore(){
             //发起请求获取数据填充到页面
            this.$ajax.get('getTimeprice')
            .then(res=>{
                console.log(res)
                this.prodsAll = res.data.timeprices.concat(res.data.timeprices).concat(res.data.timeprices).concat(res.data.timeprices);
                this.prods = this.prodsAll.slice(10*this.pageIndex,10*(this.pageIndex+1))
                console.log(this.prodsAll)
            })
            .catch(err=>{
                console.log(err);
            });
        }, //追加数据
        loadmoreConcat(){
            this.pageIndex++;
            this.prods = this.prods.concat(this.prodsAll.slice(10*this.pageIndex,10*(this.pageIndex+1)));
            //判断是否还有数据
            if(this.prodsAll.slice(10*this.pageIndex,10*(this.pageIndex+1)).length < 10){
                //数据不到10条，就是剩余的所有了
                this.allLoaded = true;//禁止调用上拉函数了
            }
            // 通知上啦操作已经完结
            this.$refs.loadmore.onBottomLoaded();
        }
    }
}

</script>
<style scoped>
.tmpl{
    overflow: auto;
}
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
    padding-left: 10px;
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    margin: 4px 0;
}
s{
    font-size: 14px;
}
/*调整滚动条样式*/
.tmpl::-webkit-scrollbar-track-piece {  
    background-color: rgba(0, 0, 0, 0);  
    border-left: 1px solid rgba(0, 0, 0, 0);  
}  
.tmpl::-webkit-scrollbar {  
    width: 5px;  
    height: 13px;  
    -webkit-border-radius: 5px;  
    -moz-border-radius: 5px;  
    border-radius: 5px;  
}  
.tmpl::-webkit-scrollbar-thumb {  
    background-color: rgba(0, 0, 0, 0.2);  
    background-clip: padding-box;  
    -webkit-border-radius: 5px;  
    -moz-border-radius: 5px;  
    border-radius: 5px;  
    min-height: 28px;  
}  
.tmpl::-webkit-scrollbar-thumb:hover {  
    background-color: rgba(0, 0, 0, 0.5);  
    -webkit-border-radius: 5px;  
    -moz-border-radius: 5px;  
    border-radius: 5px;  
}  
</style>
