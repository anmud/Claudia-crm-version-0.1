<template>
<div>
    <div  v-for="contact in allCreatedContacts" :key="contact.id">
<p v-if="id == contact.id"><strong>About {{contact.name}}:</strong></p>
    </div>
<div v-for="contact in allCreatedContacts" :key="contact.id">
    <ul v-if="id == contact.id">
    <li>email: {{contact.email}}</li>
    <li>phone: {{contact.phone}}</li>
    <li>contact owner: {{contact.selectedOwner}}</li>
    </ul>

</div>

<div class="contactDeals">
<p><strong>Deals list: </strong> </p>

<div v-for="deal in allCreatedDeals" :key="deal.id">
<template v-if="deal.selectedContactId === id">
    <ul>
        <ol><li>{{deal.dealName}}</li></ol>
        <li>stage: {{deal.selectedDealStage}}</li>
        <li>deal owner: {{deal.selectedDealOwner}}</li>
    </ul>
    
</template>
<div v-else>
 <p >Deals for (contact.name) will live here</p>
 </div>
</div>
</div>
 
</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'; 
export default{
    data(){
        return{
        id: this.$route.params.id
        }
    },
      computed: {
     ...mapGetters([
       'allCreatedContacts',
       'allCreatedDeals',
       ]),
      noMatchedDeals(){
          return 
      }
   
   },
   created(){
       this.$store.dispatch('getAllDeals')
   }

   
   
}
</script>