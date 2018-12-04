<template>
<div>
    <h1>What would you like to import?</h1>
    <ul>
        <li>File from computer</li>
        <li>Contacts from Gmail</li>
    </ul>
   <button  class="btn btn-primary btn-info" @click="onCancel">Cancel</button>
    
</div>
</template>

<script>
export default {
   methods:{
       onCancel(){
           this.$router.push('/contacts/import')
       }
   }
    
    }
</script>