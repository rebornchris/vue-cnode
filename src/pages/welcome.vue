<template>
      <Door :state='doorState' @ready = 'ready'></Door>
</template>

<script>
import Door from '../components/FrontDoor'

export default{

data() {
    return {
        doorState: 'init'
    }
},
components:{
    Door
},

methods:{
    ready(){
        this.doorState = 'start'
        console.log(this.doorState)
        setTimeout(()=>{this.$router.push('/index')},3000)
    }
}
}
</script>