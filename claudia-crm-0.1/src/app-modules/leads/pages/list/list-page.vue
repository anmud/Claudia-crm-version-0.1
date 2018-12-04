<template>
<div>
    

    <app-contacts-table></app-contacts-table>
   
        
</div>
</template>

<script>

import contactsTable from '../../components/list/table-component';

export default {
    components:{
        'app-contacts-table': contactsTable,
      
    }
}

</script>
