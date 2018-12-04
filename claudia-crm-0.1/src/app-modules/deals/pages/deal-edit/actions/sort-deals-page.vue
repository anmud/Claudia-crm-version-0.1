<template>
<div>
  
  <app-sort-deals></app-sort-deals>
  
</div>
</template>

<script>
import sortDeals from '../../../../../app-modules/deals/components/deal-edit/actions/sort-deals-component';
export default {
    components:{
        'app-sort-deals': sortDeals,
        
      
    }
    }
</script>