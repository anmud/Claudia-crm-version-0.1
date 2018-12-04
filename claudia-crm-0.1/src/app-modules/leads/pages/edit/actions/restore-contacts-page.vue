<template>
<div>
  
  <app-restore-contacts></app-restore-contacts>
  
</div>
</template>

<script>
import restoreContacts from '../../../../leads/components/edit/actions/restore-contacts-component'

export default {
    components:{
        'app-restore-contacts': restoreContacts,
        
      
    }
    }
</script>