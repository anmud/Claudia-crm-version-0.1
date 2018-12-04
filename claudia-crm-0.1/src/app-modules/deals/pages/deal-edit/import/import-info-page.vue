<template>
<div>
   <app-imports-nav></app-imports-nav>
   <app-import-info></app-import-info>
  
</div>
</template>

<script>
import importInfo from '../../../../../app-modules/deals/components/deal-edit/import/import-info-component';
import importsNav from '../../../../../common/imports-nav'

export default {
    components:{
        'app-import-info': importInfo,
        'app-imports-nav': importsNav
      
    }
    }
</script>