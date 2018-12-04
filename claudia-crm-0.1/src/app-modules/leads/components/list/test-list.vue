<template>
<div>
   
<div class="add-button">
    <router-link tag="button" :to="'/flowers/flowerForm'" class="btn btn-info">Add a flower</router-link> 
</div>

<div class="flower-table">

<div class="find-input">
  <input type="text" class="form-control" placeholder="Find a flower by name" v-model="searchedInputName">
</div>

<div class="wrapper">
<div class="table" v-for="(flower, index) in foundFlowers" :key="flower.id" >

     <div class="definition" ><span class="text">{{flower.name}}</span></div>
    <div class="btn-1" ><button class="btn btn-success" @click.prevent="openModal(flower)">Know more</button></div>
    <div class="btn-2"><button class="btn btn-info" @click.prevent="onEdit(flower)">Edit</button></div>
    <div class="btn-3" ><button class="btn btn-danger" @click="deleteFlower(flower.id, index)">Delete</button></div>
</div>
</div>
</div>

  
<!--Modal -->
    <div class="modal fade" id="knowMoreModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><strong>{{displayedFlower.name}}</strong></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
         <p><strong>Scientific name: </strong> {{displayedFlower.scientificName}}</p>
         <p><strong>Family: </strong> {{displayedFlower.family}}</p>
         <div><strong>Interesting facts:</strong>
         <div v-for="(value, key, index) in displayedFlower.interestingFacts" :key="index">
             <li><em>{{key}} </em> : {{value}}</li>  
             </div>
         </div>
         
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div> <!--Modal ends-->

   
<!--Modal -->
    <div class="modal fade" id="EditModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Edit the data</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Name: </label>
            <input type="text" class="form-control" id="EditedFlower.Name" v-model="editedFlower.name">
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Scientific name: </label>
            <input type="text" class="form-control" id="EditedFlower.scientificName" v-model="editedFlower.scientificName">
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Family: </label>
            <input type="text" class="form-control" id="EditedFlower.family" v-model="editedFlower.family">
          </div>
          <div class="form-group">
            <h5><strong>Interesting facts:</strong></h5>
            <label for="message-text" class="col-form-label"><em>height:</em></label>
            <input type="text" class="form-control" id="EditedFlower.interestingFacts.height" v-model="editedFlower.interestingFacts.height">
            <label for="message-text" class="col-form-label"><em>name origin:</em></label>
            <input type="text" class="form-control" id="EditedFlower.interestingFacts.nameOrigin" v-model="editedFlower.interestingFacts.nameOrigin">
            <label for="message-text" class="col-form-label"><em>species:</em></label>
            <input type="text" class="form-control" id="EditedFlower.interestingFacts.species" v-model="editedFlower.interestingFacts.species">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="updateFlower(editedFlower.id)">Save changes</button>
      </div>
    </div>
  </div>
</div> <!--Modal ends-->

</div>
</template>


<script>

import {mapGetters, mapActions} from 'vuex'
export default{
   data(){
       return{
      searchedInputName: '',
      displayedFlower: {},
      editedFlower: {
           id: this.flowerId,
           name: '',
           scientificName: '',
           family: '',
           interestingFacts: {
             nameOrigin: '',
             height: '',
             species: '',
           }
         }
         
       }
   },
    computed: {
     ...mapGetters([
       'flowers',
       ]),
    foundFlowers: function (){
      return this.flowers.filter((flower) => {
        return flower.name.toLowerCase().includes(this.searchedInputName.toLowerCase())
      })
    }
   },
   created () {
     this.$store.dispatch('getAll')
   },
   methods:{
       openModal(flower){
         this.displayedFlower = flower
         $('#knowMoreModal').appendTo("body").modal('show'); 
       },
       openForm(){
         this.$router.push('/flowerForm')
       },
       deleteFlower(flowerId, index){
         this.$store.dispatch('deleteFlower', flowerId)
       .then (response => {
         this.flowers.splice(index, 1)
        }) 
       },
       onEdit(flower){
          this.editedFlower = flower
          $('#EditModal').appendTo("body").modal('show');
       },
       updateFlower(editedFlowerId){
       //console.log(editedFlowerId)
         const inputFormData = {
         id: editedFlowerId,
         name: this.editedFlower.name,
         scientificName: this.editedFlower.scientificName,
         family: this.editedFlower.family,
         interestingFacts: {
         height: this.editedFlower.interestingFacts.height,
         nameOrigin: this.editedFlower.interestingFacts.nameOrigin,
         species: this.editedFlower.interestingFacts.species
         }
        }
         return this.$store.dispatch('updateFlower', inputFormData, editedFlowerId )
        .then(result => {
            $("#EditModal").modal('hide')
          
         })
         .catch(err => console.log(err))
       }
   }
}
</script>

<style scoped>

.table{
  display: grid;
  grid-template-columns: 4fr 107px 48px 80px;
  grid-template-rows: 10px;
  grid-column-gap: 2px;
  grid-gap: 2px;
  margin-bottom: 1%;
}

.definition{
  grid-row: 1/3 ;
  grid-column: 1/2;
  background-color: rgb(247, 243, 243);
  padding: 1.1% 0;
  font-weight: bold;
  text-align: left;
  border: 1px solid rgb(226, 220, 220);
}

.btn-1{
  grid-row: 1/3;
  grid-column:2/3 ;
  text-align: left;
  vertical-align: middle;
  text-align: center;
 /* padding: 20%;*/
    

}

.btn-2{
  grid-row: 1/3;
  grid-column:3/4;
    text-align: center;
   /* padding: 39%;*/
      
}

.btn-3{
  grid-row: 1/3;
  grid-column:4/5;
    text-align: center;
   /*  padding: 23%;*/
      
}
.wrapper{
  margin-top: 2%;
}

.text{
 padding: 3%;
}
.add-button{
  float: right;
}
.add-button{
  margin-bottom: 2%;
}


</style>

