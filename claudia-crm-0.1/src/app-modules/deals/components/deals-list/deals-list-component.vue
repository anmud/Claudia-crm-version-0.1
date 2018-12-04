<template>
<div>

<!--Navbar-->
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
    <div class="container-fluid">
    <a class="navbar-brand">Deals</a>
    
    <div clas="row">
    <div class="collapse navbar-collapse navbar-left">
    <form class="navbar-form navbar-right" action="#">
    <input class="form-control" type="search" placeholder="Search for a deal" aria-label="Search" v-model="searchedDeal">
    </form>
      </div>
       <div class="btn-group">
                    <button type="button" class="btn btn-primary btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions<span class="caret"></span></button>
                    <ul class="dropdown-menu">
                      <router-link :to="'/deals/edit/editDealStages'" active-class="active" tag="li"><a>Edit deal stages</a></router-link>
                      <router-link :to="'/deals/edit/sortDeals'" active-class="active" tag="li"><a>Sort deals</a></router-link>
                      <router-link :to="'/deals/edit/restoreDeals'" active-class="active" tag="li"><a>Restore deals </a></router-link>
                    </ul>
                  </div>
   <router-link tag="button" :to="'/deals/import'" class="btn btn-info btn-primary">Import</router-link>
  <router-link tag="button" :to="'/createDeal'" class="btn btn-info btn-primary">Create deal</router-link>  
            
    </div>
    </div>
   </nav>
</div>

<!--Table-->
  <table class="table table-striped table-hover">
  <thead>
    <tr>
     <tr>
         <th scope="col"> <label class="form-checkbox">
              <input type="checkbox"  v-model="selectAll" >
          </label></th>
 
      <th scope="col">DEAL NAME</th>
      <th scope="col">DEAL STAGE</th>
      <th scope="col">CLOSE DATE</th>
      <th scope="col">DEAL OWNER</th>
      <th scope="col">AMOUNT</th>
       <th scope="col">ASSOCIATED WITH</th>
     
      
    </tr>
  </thead>

 <thead>
 <tr v-if="selectedDeal.length > 0">
      <th scope="col"> <label class="form-checkbox">
              <input type="checkbox"  v-model="selectAll" >
          </label></th>
      <th scope="col"> <span> {{selectedDealNumber}} selected </span></th>
      <th scope="col"><router-link :to="'#'" active-class="active" @click.native="openAssignModal()"><span class="glyphicon glyphicon-arrow-right"></span><a> Assign </a></router-link></th>
      <th scope="col"> <router-link :to="'#'" active-class="active"><span class="glyphicon glyphicon-pencil"></span><a> Edit </a></router-link></th>
      <th scope="col"> <router-link to="#" @click.native="openModal()"><span class="glyphicon glyphicon-trash"></span> Permanently delete </router-link></th>
      <th scope="col"> <router-link to="#" ><span class="glyphicon glyphicon-plus"></span> Create tasks </router-link></th>
      <th scope="col"></th>
  



 </tr>
  </thead>


  <tbody v-if="allCreatedDeals.length > 0 ">
    <tr v-for="deal in filteredDeals" :key="deal.id">
        <td>
      <label class="form-checkbox">
          <input  type="checkbox" v-model="selectedDeal" :value="deal.id">
      </label>
      </td>
     
      <td>{{deal.dealName}}</td>
      <td>{{deal.selectedDealStage}} </td>
      <td></td>
      <td>{{deal.selectedDealOwner}} </td>
      <td>{{deal.amount}} </td>
     <td></td>
      
 
   
    </tr>
  </tbody>
   <tbody v-else>
    <tr>
      <td>You haven't created any deal yet. Please, create one.</td>
      <td></td>
      <td></td>
      <td></td>
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
        <h5 class="modal-title" id="exampleModalLongTitle">Delete {{dealToDelete}} deal(s)?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>You are about to delete {{dealToDelete}} deal(s). Are you sure? </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" @click="deleteDeal(selectedDeal)">Delete</button>
      </div>
    </div>
  </div>
</div>

<!-- Assign Modal -->
<div class="modal fade" id="assignModal" tabindex="-1" role="dialog" >
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Assign deals</h5>
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
import { mapMutations } from 'vuex'; 
import { mapGetters } from 'vuex'; 
import { mapActions} from 'vuex';

export default {
   data(){
     return {
       searchedDeal: '',
        selectedDeal: []
     }
   },
   created () {
      this.$store.dispatch('getAllDeals')
    },
   computed: {
     ...mapGetters([
       'allCreatedDeals',
       'allCreatedContacts'
       ]),
       filteredDeals: function(){
         const value = this.searchedDeal.toLowerCase() ;
         return this.allCreatedDeals.filter((deal) => {
         return deal.dealName.toLowerCase().includes(value) ||
                deal.selectedDealStage.toLowerCase().includes(value) ||
                deal.selectedDealOwner.toLowerCase().includes(value) ||
                deal.amount.toString().includes(value) 

      })
       },
       selectedDealNumber: function(){
         return this.selectedDeal.length
       },
       dealToDelete: function(){
         return this.selectedDeal.length
       },
        selectAll: {
            get: function () {
                return this.allCreatedDeals ? this.selectedDeal.length == this.allCreatedDeals.length : false;
            },
            set: function (value) {
                var selectedDeal = [];

                if (value) {
                    this.allCreatedDeals.forEach(function (deal) {
                        selectedDeal.push(deal.id);
                    });
                }

                this.selectedDeal = selectedDeal;
            }
        }
},
methods:{
   openModal(contact){
         $('#deleteModal').appendTo("body").modal('show'); 
       },
openAssignModal(){
    $('#assignModal').appendTo("body").modal('show'); 
},
   deleteDeal(selectedDeal){
     
     for(let i=0; i<this.selectedDeal.length; i++){
      let dealId = this.selectedDeal[i]
       
       this.$store.dispatch('deleteDeal',dealId)
        .then (response => {
         let index = this.allCreatedDeals.map(deal => deal.id).indexOf(dealId)
         this.allCreatedDeals.splice(index, 1)
        }) 
        .then(close =>  $('#deleteModal').appendTo("body").modal('hide') )
     }
   },
  
   
}

 

 }
   
   

    
</script>

