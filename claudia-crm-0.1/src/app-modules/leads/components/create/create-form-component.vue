<template>
<div>
<div>
  <form  action="#" @submit.prevent="onSubmit">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text"  v-model="name" class="form-control">
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email"  v-model="email"   class="form-control" >
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="PhoneNumber">Phone Number</label>
    <input  v-model.number="phone"   type="text"  class="form-control">
  </div>
  <div class="form-group">
    <label for="contactOwner">Contact owner</label>
    <select class="form-control" id="contactOwner" v-model="selectedOwner"  >
      <option>awesome you</option>
      <option>not you</option>
    </select>
  </div>
  <button type="submit" class="btn btn-primary">Create contact</button>
  <button  type="button" class="btn btn-primary" @click="onCancel">Cancel</button>
</form>
</div>

</div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'; 
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'; 


export default {
    
    computed:{
        ...mapGetters([
          'newContact',
          'allCreatedContacts'
        ]),
        name: {
          get(){return this.$store.getters.newContact.name},
          set(value){ this.$store.dispatch('updateName', value)}
        },
        email:{
          get(){
            return this.$store.getters.newContact.email
          },
          set(value){
            this.$store.dispatch('updateEmail', value)
          }
        },
        phone:{
          get(){
            return this.$store.getters.newContact.phone
          },
          set(value){
            this.$store.dispatch('updatePhone', value)
          }
        },
        selectedOwner:{
          get(){
            return this.$store.getters.newContact.selectedOwner
          },
          set(value){
            this.$store.dispatch('updateSelectedOwner', value)
          }
        },

     
    },
    methods:{ 
      onSubmit() {
        const formData = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          selectedOwner: this.selectedOwner
       
        }
         console.log(formData)
        this.$store.dispatch('postContact', formData)
       .then (getResult => this.$store.dispatch('fetchContact'))
       .then (changeRoute => {
          this.$router.push('/contacts')
          this.$store.getters.newContact.name = ''
          this.$store.getters.newContact.email = ''
          this.$store.getters.newContact.phone = ''
          this.$store.getters.newContact.selectedOwner = ''

       }) 
         .catch(error=> console.log(error))
      },
      onCancel() { 
        this.$router.push('/contacts')
      }
    }
}
   

 


</script>