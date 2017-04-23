<template>
  <transition name="fade">
    <div class="modal postModal" >
      <div class="modal-header">
        <button type="button" class="close" @click.stop='close'>
          <span aria-hidden="true">×</span>
        </button>
        <h4 class="modal-title">回复</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="reply" aria-hidden="true"></label>
          <textarea name="post" id="reply"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" >
          {{ '回复' }}
        </button>
      </div>
    </div>
  </transition>
</template>
<script>

export default{
    
methods:{
    close(){
        this.$emit('close','reply',()=>{
            console.log(123)
        })
    }
}
    }
</script>