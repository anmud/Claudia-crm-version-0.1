<template>
<div>
    <h1>Sort deals</h1>
    
   <button  class="btn btn-primary btn-info" @click="onCancel">Cancel</button>
    
</div>
</template>

<script>
export default {
   methods:{
       onCancel(){
           this.$router.push('/deals')
       }
   }
    
    }
</script>