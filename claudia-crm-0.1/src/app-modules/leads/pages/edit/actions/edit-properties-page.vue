<template>
<div>
  
  <app-edit-properties></app-edit-properties>
  
</div>
</template>

<script>
import editProperties from '../../../../leads/components/edit/actions/edit-properties-component'

export default {
    components:{
        'app-edit-properties': editProperties,
        
      
    }
    }
</script>