<template>
<div>
   <app-imports-nav></app-imports-nav>
   <app-import-info></app-import-info>
  
</div>
</template>

<script>
import importsNav from '../../../../common/imports-nav'
import importInfo from '../../../leads/components/edit/import-info-component';

export default {
    components:{
        'app-import-info': importInfo,
        'app-imports-nav': importsNav
      
    }
    }
</script>