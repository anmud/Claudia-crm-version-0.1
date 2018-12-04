<template>
 <div>
     <h2>Add a new flower to the collection</h2>

<form action="#" @submit.prevent="onSubmit">
 
  <div class="form-group">
    <label for="inputName">Flower name</label>
    <input type="text" class="form-control" id="inputName"  v-model="name">
  </div>
  <div class="form-group">
    <label for="inputScientificName">Flower scientific name</label>
    <input type="text" class="form-control" id="inputScientificName"  v-model="scientificName">
  </div>
  <div class="form-group">
    <label for="inputFamily">Flower family</label>
    <input type="text" class="form-control" id="inputFamily"  v-model="family">
  </div>
    <div class="form-group">
    <h5><strong>Interesting facts: </strong></h5>
    <label for="inputFamily"><em>height</em></label>
    <input type="text" class="form-control" id="inputFamily"  v-model="height">
    <label for="inputFamily"><em>name origin</em></label>
    <input type="text" class="form-control" id="inputFamily"  v-model="nameOrigin">
    <label for="inputFamily"><em>species</em></label>
    <input type="text" class="form-control" id="inputFamily" v-model="species">
  </div>
 
  <button type="submit" class="btn btn-primary">Add</button>
   <button  type="button" class="btn btn-primary" @click="onCancel">Cancel</button>
</form>
 </div>
</template>

<script>
import axios from 'axios';
import {mapGetters, mapActions, mapMutations} from 'vuex';
export default{
data(){
    return{
    }
},
 computed:{
     ...mapGetters(['newFlower']),
    name:{
         get(){return this.$store.getters.newFlower.name},
         set(inputFlowerName){ this.$store.dispatch('updateFlowerName', inputFlowerName)}
    },
    scientificName:{
        get(){return this.$store.getters.newFlower.scientificName},
        set(inputScientificName){ this.$store.dispatch('updateScientificName', inputScientificName)}
    },
    family:{
        get(){return this.$store.getters.newFlower.family},
        set(inputFlowerFamily){ this.$store.dispatch('updateFlowerFamily', inputFlowerFamily)}
    },
    height:{
        get(){return this.$store.getters.newFlower.interestingFacts.height},
        set(inputFlowerHeight){ this.$store.dispatch('updateFlowerHeight', inputFlowerHeight)}
    },
    nameOrigin:{
        get(){return this.$store.getters.newFlower.interestingFacts.nameOrigin},
        set(inputFlowerNameOrigin){ this.$store.dispatch('updateFlowerNameOrigin', inputFlowerNameOrigin)}
    },
    species:{
        get(){return this.$store.getters.newFlower.interestingFacts.species},
        set(inputFlowerSpecies){ this.$store.dispatch('updateFlowerSpecies', inputFlowerSpecies)}
    },

},
methods:{
    onSubmit(){
        const inputFormData = {
         name: this.name,
         scientificName: this.scientificName,
         family: this.family,
         height: this.height,
         nameOrigin: this.nameOrigin,
         species: this.species
        }
    console.log(inputFormData)
    this.$store.dispatch('postNewFlower', inputFormData)
    .then (getResult => this.$store.dispatch('getAll'))
    .then(reset =>  {
        this.name = '',
        this.scientificName = '',
        this.family = '',
        this.height = '',
        this.nameOrigin = '',
        this.species = ''
    })
    .then(changeRoute => {
        this.$router.push('/flowers')
    })
    .catch(error => console.log(error))
    },
    onCancel(){
        this.$router.push('/flowers')
    }
}

}
</script>