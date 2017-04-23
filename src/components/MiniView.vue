<template>
        <div class="mini">
        <h2>沙发墙</h2>
             <transition-group name='slide-fade'>
                <li class='mini-list' v-for="a in dd" :key="a.id">
                <router-link :to="{ path: '/topic/' + a.id }" :title="a.title" >{{ a.title }}</router-link>
                    <i class='mini-reply clearfix'>{{a.reply_count}}回复</i>
                </li>
             </transition-group>
        </div>
</template>

<script>
export default{

    props: {
        dd:{
            type: Array
        }
    },

}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}


.mini{
    position:fixed;
    top:10rem;
    right:2rem;
    // height:450px;
    width: 250px;
    min-width:200px;
    overflow:hidden;
    list-style-type:none;
    h2{
        text-align:center;
    }


    &-list{
        margin-top:1rem;
        padding:0.3rem;
        border-bottom:1px solid #e7eaf1;
    }

}
</style>
