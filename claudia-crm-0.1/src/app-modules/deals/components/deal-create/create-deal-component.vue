<template>
<div>
    <form  id="dealForm" role="form" action="#" @submit.prevent="submitForm" >
  <div class="form-group">
    <label for="name">Deal name</label>
    <input type="text" v-model="dealName" class="form-control">
  </div>
  <div class="form-group">
    <label for="pipeline">Pipeline</label>
  <select class="form-control" id="exampleFormControlSelect1" v-model="selectedPipeline">
    <option>Sales Pipeline</option>
    <option>Other pipeline</option>
  </select>
  </div>
  <div class="form-group">
    <label for="dealStage">Deal Stage</label>
  <select
  id="dealStage"
  class="form-control"
  v-model="selectedDealStage">
  <option v-for="(stage,index) in dealStages" :key="index" :selected="stage == 'Appointment Scheduled'">{{stage}}</option>  
    </select>
        </div>
  <div class="form-group">
    <label for="Amount">Amount</label>
    <input  v-model.number="amount"   type="text"  class="form-control">
  </div>
   <div class="form-group">
    <label for="dealOwner">Deal owner</label>
  <select class="form-control" id="dealOwnerSelect" v-model="selectedDealOwner">
    <option >Awesome you</option>
    <option >Not you</option>
    <option >No owner</option>
  </select>
  </div>
   <div class="form-group">
    <label for="company">Company</label>
  <select class="form-control" id="companySelect" v-model="selectedCompany">
    <option >Clever.do</option>
    <option >Other company.</option>
  </select>
  </div>
    <div class="form-group">
    <label for="contact">Contact</label>
   <select class="form-control " id="contactSelect" v-model="selectedContact" >
    <option v-for="contact in allCreatedContacts" :key="contact.id">{{contact.name}}</option>
  </select>
  </div>

    <button type="submit" class="btn btn-primary" id="dealFormSubmit" >Create</button>
    <button type="button" class="btn btn-primary" @click="onCancel">Cancel</button>

</form>
</div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'; 
import { mapGetters } from 'vuex'; 
import { mapActions} from 'vuex';
export default{
      data: function(){
    return {
       dealStages: ['Appointment Scheduled', 'Qualified to Buy', 'Presentation Scheduled', 'Decision Maker Bought-in', 'Contact Sent', 'Closed Won', 'Closed Lost'],
  
    }
  
  },
 computed: {
     ...mapGetters([
       'allCreatedDeals',
       'allCreatedContacts'
       ]),
        dealName: {
          get(){return this.$store.getters.newDeal.dealName},
          set(value){ this.$store.dispatch('updateDealName', value)}
        },
        selectedPipeline:{
          get(){return this.$store.getters.newDeal.selectedPipeline},
          set(value){this.$store.dispatch('updatePipeline', value)}
        },
        selectedDealStage:{
          get(){return this.$store.getters.newDeal.selectedDealStage},
          set(value){this.$store.dispatch('updateDealStage', value)}
        },
        amount: {
          get(){return this.$store.getters.newDeal.amount},
          set(value){ this.$store.dispatch('updateAmount', value)}
        },
        selectedDealOwner:{
          get(){return this.$store.getters.newDeal.selectedDealOwner},
          set(value){this.$store.dispatch('updateSelectedDealOwner', value) }
        },
         selectedCompany:{
          get(){return this.$store.getters.newDeal.selectedCompany},
          set(value){this.$store.dispatch('updateSelectedCompany', value)}
        },
         selectedContact:{
          get(){ return this.$store.getters.newDeal.selectedContact},
          set(value){this.$store.dispatch('updateSelectedContact', value)}
        },
     
       
       
},
created () {
      this.$store.dispatch('fetchContact')
      this.$store.dispatch('getAllDeals')
    },
    
 methods: {
    openModal(){
         $('#CreateDealModal').appendTo("body").modal('show'); 
       },
    submitForm() {
           
          let formData = {
          dealName: this.dealName,
          selectedPipeline: this.selectedPipeline,
          selectedDealStage: this.selectedDealStage,
          amount: this.amount,
          selectedDealOwner: this.selectedDealOwner,
          selectedCompany: this.selectedCompany,
          selectedContact: this.selectedContact
        }
       

        console.log('this is form data', formData)
        
        this.$store.dispatch('postDeal', formData)

       .then (getResult => this.$store.dispatch('getAllDeals'))
      
       .then (reset => {
           this.$router.push('/deals')
          this.$store.getters.newDeal.dealName = ''
          this.$store.getters.newDeal.selectedPipeline = ''
          this.$store.getters.newDeal.selectedDealStage = ''
          this.$store.getters.newDeal.amount = ''
          this.$store.getters.newDeal.selectedDealOwner = ''
          this.$store.getters.newDeal.selectedCompany = ''
          this.$store.getters.newDeal.selectedContact = ''
       }) 
         .catch(error => console.log(error))
        

       }, 
       onCancel(){
           this.$router.push('/deals')
       }
     
 }
     





}
</script>