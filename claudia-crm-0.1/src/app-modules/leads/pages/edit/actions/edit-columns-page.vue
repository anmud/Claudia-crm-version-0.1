<template>
<div>
  
  <app-edit-columns></app-edit-columns>
  
</div>
</template>

<script>
import editColumns from '../../../../leads/components/edit/actions/edit-columns-component'

export default {
    components:{
        'app-edit-columns': editColumns,
        
      
    }
    }
</script>