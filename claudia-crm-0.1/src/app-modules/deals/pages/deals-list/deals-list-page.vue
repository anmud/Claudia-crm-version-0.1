<template>
<div>

 
    <app-deals-list></app-deals-list>
        
</div>
</template>

<script>

import dealsList from '../../../../app-modules/deals/components/deals-list/deals-list-component';

export default {
    components:{
        'app-deals-list': dealsList,
       
    }
}

</script>