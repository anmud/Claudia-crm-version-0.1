<template>
<div>


<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
    <div class="container-fluid">
    <a class="navbar-brand">Contacts</a>
    
    <div clas="row">
    <div class="collapse navbar-collapse navbar-left">
    <form class="navbar-form navbar-right" action="#">
    <input class="form-control" type="search" placeholder="Search for a contact" aria-label="Search" v-model="searchedContact">
    </form>
      </div>
       <div class="btn-group">
                    <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions<span class="caret"></span></button>
                    <ul class="dropdown-menu">
                      <router-link :to="'/contacts/edit/editColumns'" active-class="active" tag="li"><a>Edit columns</a></router-link>
                      <router-link :to="'/contacts/edit/editProperties'" active-class="active" tag="li"><a>Edit properties</a></router-link>
                      <router-link :to="'/contacts/edit/restoreContacts'" active-class="active" tag="li"><a>Restore contacts </a></router-link>
                    </ul>
                  </div>
   <router-link tag="button" role="button" :to="'/contacts/import'" type="button" class="btn btn-info btn-primary">Import</router-link>
   <router-link tag="button" role="button" :to="'/contacts/create'" class="btn btn-info btn-primary">Create contact</router-link>  
            
    </div>
    </div>
   </nav>
</div>

  <table class="table table-striped table-hover">
  <thead>
    <tr>
    <tr>
         <th scope="col"> <label class="form-checkbox">
              <input type="checkbox"  v-model="selectAll" >
          </label></th>
 
      <th scope="col">Name</th>
      <th scope="col"></th>
      <th scope="col">Email</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Contact Owner</th>
   
    </tr>
  </thead>
  
  <thead>
 <tr v-if="selectedContact.length > 0">
      <th scope="col"> <label class="form-checkbox">
              <input type="checkbox"  v-model="selectAll" >
          </label></th>
      <th scope="col"> <span> {{selectedNumber}} selected </span></th>
      <th scope="col"><router-link :to="'#'" active-class="active" @click.native="openAssignModal()"><span class="glyphicon glyphicon-arrow-right"></span><a> Assign </a></router-link></th>
      <th scope="col"> <router-link :to="'#'" active-class="active"><span class="glyphicon glyphicon-pencil"></span><a> Edit </a></router-link></th>
      <th scope="col"> <router-link to="#" @click.native="openModal()"><span class="glyphicon glyphicon-trash"></span> Delete </router-link></th>
      <th scope="col"></th>
  



 </tr>
  </thead>

  <tbody v-if="allCreatedContacts.length > 0 ">
  
    <tr v-for="contact in filteredContacts" :key="contact.id" >
      <td>
      <label class="form-checkbox">
          <input  type="checkbox" v-model="selectedContact" :value="contact.id">
      </label>
      </td>
     
      <td ><router-link :to="`/contact/${contact.id}`"><span class="glyphicon glyphicon-user"></span><a> {{contact.name}}</a></router-link></td>
     
      <td>
        <button type="button" >Preview</button>
      </td>
     
      <td>{{contact.email}}</td>
      <td>{{contact.phone}}</td>
      <td>{{contact.selectedOwner}}</td>
    </tr>
  </tbody>
  <tbody v-else>
    <tr>
      <td>You haven't created any contact yet. Please, create one.</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>



<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" >
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete {{contactToDelete}} contact(s)?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>You are about to delete {{contactToDelete}} contact(s). Are you sure? </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" @click="deleteContact(selectedContact)">Delete</button>
      </div>
    </div>
  </div>
</div>

<!-- Assign Modal -->
<div class="modal fade" id="assignModal" tabindex="-1" role="dialog" >
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Assign contacts</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
    <label for="ContactOwner">Assign selected items to this owner:</label>
  <select class="form-control" id="contactOwnerSelect" >
    <option >Awesome you</option>
    <option >Not you</option>
    
  </select>
  </div>
      </div>
      <div class="modal-footer">
         <button type="button" class="btn btn-primary" >Assign</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
       
      </div>
    </div>
  </div>
</div>


</div>
</template>

<script>
import axios from 'axios'

import { mapGetters } from 'vuex'; 
import { mapActions} from 'vuex'; 

export default {
 data(){
   return{
    searchedContact: '',
    selectedContact: []
   }
 },
   computed: {
     ...mapGetters([
       'leads',
       'allCreatedContacts',
       ]),
       filteredContacts: function(){
         const value = this.searchedContact.toLowerCase() ;
         return this.allCreatedContacts.filter((contact) => {
         return contact.name.toLowerCase().includes(value) ||
                contact.email.toLowerCase().includes(value) ||
                contact.phone.toString().includes(value)
      })
       }, 
       selectedNumber: function(){
         return this.selectedContact.length
       },
       contactToDelete: function(){
         return this.selectedContact.length
       },
        selectAll: {
            get: function () {
                return this.allCreatedContacts ? this.selectedContact.length == this.allCreatedContacts.length : false;
            },
            set: function (value) {
                var selectedContact = [];

                if (value) {
                    this.allCreatedContacts.forEach(function (contact) {
                        selectedContact.push(contact.id);
                    });
                }

                this.selectedContact = selectedContact;
            }
        }
   },
   
  created () {
      this.$store.dispatch('fetchContact')
    },
methods:{
   openModal(contact){
         $('#deleteModal').appendTo("body").modal('show'); 
       },
openAssignModal(){
    $('#assignModal').appendTo("body").modal('show'); 
},
   deleteContact(selectedContact){
     console.log('selected contact:',selectedContact)
     for(let i=0; i<this.selectedContact.length; i++){
      let contactId = this.selectedContact[i]
       console.log('contact id:', contactId)
       this.$store.dispatch('deleteContact',contactId)
        .then (response => {
         let index = this.allCreatedContacts.map(contact => contact.id).indexOf(contactId)
         this.allCreatedContacts.splice(index, 1)
        }) 
        .then(close =>  $('#deleteModal').appendTo("body").modal('hide') )
     }
   },
  
   
}

 
 
}
      




</script>


