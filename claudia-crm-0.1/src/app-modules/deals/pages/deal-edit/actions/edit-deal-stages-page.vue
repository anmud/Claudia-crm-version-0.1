<template>
<div>
  
  <app-edit-deal-stages></app-edit-deal-stages>
  
</div>
</template>

<script>
import editDealStages from '../../../../../app-modules/deals/components/deal-edit/actions/edit-deal-stages-component';
export default {
    components:{
        'app-edit-deal-stages': editDealStages,
        
      
    }
    }
</script>