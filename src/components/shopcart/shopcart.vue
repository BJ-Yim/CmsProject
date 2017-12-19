<template>
    <div class="tmpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list">
                    <mt-switch ></mt-switch>
                    <img >
                    <div class="pay-calc">
                        <p ></p>
                        <div class="calc">
                            <span></span>
                            <span>-</span>
                            <span></span>
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
<style>
    
</style>