<template>
<div>
  
  <app-restore-deals></app-restore-deals>
  
</div>
</template>

<script>
import restoreDeals from '../../../../../app-modules/deals/components/deal-edit/actions/restore-deals-component';

export default {
    components:{
        'app-restore-deals': restoreDeals,
        
      
    }
    }
</script>