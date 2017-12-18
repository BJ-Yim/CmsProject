let prodTools = {};

let store = window.localStorage;

let prods = JSON.parse(store.getItem('prods') || '{}');

// 增加或者追加
prodTools.addOrUpdate = function(p){
	//判断是否存在
	if(prods[p.id]){
		prods[p.id] += p.num;
	}else{
		prods[p.id] = p.num;
	}
	//保存
	this.saveProds(prods);
}
//删除
prodTools.delete = function(id){
	delete prods[id];
	//保存
	this.saveProds(prods);
}
//获取总数
prodTools.getTotalCount = function(){
	let sum = 0;
	for(let id in prods){
		sum += prods[id];
	}
	return sum;
}
//储存
prodTools.saveProds = function(prods){
	store.setItem('prods',JSON.stringify(prods));
}
//获取到storage
prodTools.getProds = function(){
    return JSON.parse(store.getItem('prods')||'{}');
}
//获取单个商品数量
prodTools.getSingleConut=function(id){
	return prods[id];
}

export default prodTools;