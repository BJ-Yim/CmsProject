<template>
    <div class="tmpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li v-for="(goods,index) in goodsList" :key="goods.id" class="p-list">
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <img :src="goods.img">
                    <div class="pay-calc">
                        <p v-text="goods.title"></p>
                        <div class="calc">
                            <span>￥{{goods.price}}</span>
                            <span>-</span>
                            <span>{{goods.num}}</span>
                            <span>+</span>
                            <a href="javascript:;">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品件，总价元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
//引入商品操作工具对象
import prodTools from '../common/prodTools.js';
export default {
    data(){
        return {
        	prodsAll:[],
        	id:'',
        	goodsList:[]
        }
    },
    created(){
    	//获取prods数据
    	let prods = prodTools.getProds();
    	let prodsKeyArr = Object.keys(prods);
    	console.log(prodsKeyArr)

        this.$ajax.get('getTimeprice')
        .then(res=>{
        	console.log(res)
        	this.prodsAll = res.data.timeprices;
        	prodsKeyArr.forEach((ele,index)=>{
        		this.id = ele;
        		console.log(this.id)
        		this.goodsList.push(this.prodsAll.filter(this.sillyb)[0]);
        	});
        	//挂载属性
        	this.goodsList.forEach((ele,index)=>{
        		if(prods[ele.id]){
        			ele.num = prods[ele.id];
        			ele.isPicked = true;
        		}
        	})
        	console.log(this.goodsList)
        })
        .catch(err=>{
        	console.log(err)
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
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
.mint-switch{
	float: right;
}
</style>