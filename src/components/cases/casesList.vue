<template>
    <div class="tmpl cases-top">
        <nav-bar title="微整案例"></nav-bar>       
        <div class="fixed-div">
            <div class="photo-header">
                <ul>
                    <li v-for="(casesPart,index) in casesParts" :key="index" @click="loadPart(casesPart)" :class="{'active': activeName == casesPart}">
                        <a href="javascript:;">{{casesPart}}</a>
                    </li>
                    
                </ul>
            </div>
        </div>
        
        <div class="photo-list">
            <ul>
                <li v-for="casesCase in casesCases" :key="casesCase._id">
                    <router-link :to="{name:'cases.detail',query:{id:casesCase._id}}">
                        <div>
                            <img v-lazy="casesCase.before" alt="" class="before">
                            <img v-lazy="casesCase.after" alt="" class="after">
                        </div>
                        <p>
                            <span v-text="casesCase.title"></span>
                            <br>
                            <span v-text="casesCase.des"></span>
                        </p>
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
            casesParts:[],//分类
            casesList:[], //数据
            casesCases:{}, //数据
            part:'',
            activeName:'',
            casesPart:''
        }
    },
    created(){
        //发起请求获取导航栏数据
        this.$ajax.get('cases')
        .then(res=>{
            console.log(res)
            this.casesParts = res.data.parts;
            this.casesList = res.data.cases;
            //当页面加载默认传递
            this.loadPart('眼部微整');
        })
        .catch(err=>{
            console.log(err);
        });

    },
    methods:{
        loadCases(element){
            return (element.part == this.part)
        },
        loadPart(casesPart){
            this.part =casesPart;
            this.casesCases = this.casesList.filter(this.loadCases);
            //选中样式
            this.activeName = casesPart;
            console.log(this.casesCases)
        },
    }
}



</script>
<style>
.fixed-div{
    width: 100%;
    height: 30px;
    position: fixed;
    top: 44px;
    z-index: 99;
}
.cases-top{
    margin-top: 76px;
}
.photo-header{
    background-color: #f7f7f7;
    padding-bottom: 4px;
    left: 0;
    overflow-x: scroll;
}
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 0;
    padding-right: 10px;
}
.photo-header a{
    color: #333;
}
.photo-header ul::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
}

/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 185px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
    padding: 6px 10px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

/*图片懒加载的样式*/
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.active{
    border-bottom: 2px solid #007aff;
}
</style>
