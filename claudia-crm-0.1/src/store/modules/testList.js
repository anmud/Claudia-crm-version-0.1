import axios from "axios";


const state = {
    flowers: [],
    newFlower: {
        name: '',
        scientificName: '',
        family: '',
        interestingFacts: {
            height: '',
            nameOrigin: '',
            species: ''
        }
    },
 
};

const mutations = {
    
    updateFlowers: (state, databaseFlowers) =>{
        state.flowers = databaseFlowers
      },
    UPDATE_FLOWER_NAME: (state, inputFlowerName) => {
        state.newFlower.name = inputFlowerName
    },
    UPDATE_SCIENTIFIC_NAME: (state, inputScientificName) => {
        state.newFlower.scientificName = inputScientificName
    },
    UPDATE_FLOWER_FAMILY: (state, inputFlowerFamily) => {
        state.newFlower.family = inputFlowerFamily
    },
    UPDATE_FLOWER_HEIGHT: (state, inputFlowerHeight) => {
        state.newFlower.interestingFacts.height = inputFlowerHeight
    },
    UPDATE_FLOWER_NAME_ORIGIN: (state, inputFlowerNameOrigin) => {
        state.newFlower.interestingFacts.nameOrigin = inputFlowerNameOrigin
    },
    UPDATE_FLOWER_SPECIES: (state, inputFlowerSpecies) => {
        state.newFlower.interestingFacts.species = inputFlowerSpecies
    }
    
};

const actions = {
    updateFlowerName: ({commit}, inputFlowerName) => {
        commit('UPDATE_FLOWER_NAME', inputFlowerName)
    },
    updateScientificName: ({commit}, inputScientificName) => {
        commit('UPDATE_SCIENTIFIC_NAME', inputScientificName)
    },
    updateFlowerFamily: ({commit}, inputFlowerFamily) => {
        commit('UPDATE_FLOWER_FAMILY', inputFlowerFamily)
    },
    updateFlowerHeight: ({commit}, inputFlowerHeight) => {
        commit('UPDATE_FLOWER_HEIGHT', inputFlowerHeight)
    },
    updateFlowerNameOrigin: ({commit}, inputFlowerNameOrigin) => {
        commit('UPDATE_FLOWER_NAME_ORIGIN', inputFlowerNameOrigin)
    },
    updateFlowerSpecies: ({commit}, inputFlowerSpecies) => {
        commit('UPDATE_FLOWER_SPECIES', inputFlowerSpecies)
    },
  
    
    getAll: ({commit}, payload) => {
       return  axios.get('/flowersList.json')
         .then(response => {
            console.log(response)
            let data = response.data
           let databaseFlowers = []
            for(let key in data){
                let flower = data[key]
                flower.id = key
            databaseFlowers.push(flower)
            }
           commit('updateFlowers', databaseFlowers)
         })
         .catch(error => console.log(error))
    },
    postNewFlower: ({commit}, inputFormData) => {
       return axios.post('https://claudiacrm-3c1a9.firebaseio.com/flowersList.json', {
            name: inputFormData.name,
            scientificName: inputFormData.scientificName,
            family: inputFormData.family,
            interestingFacts: {
                height: inputFormData.height,
                nameOrigin: inputFormData.nameOrigin,
                species: inputFormData.species
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
   
    deleteFlower:({commit}, flowerId) =>{
       return axios.delete(`/flowersList/${flowerId}.json`)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    },
    updateFlower:({commit}, inputFormData) => {
        console.log(inputFormData.id)
        axios.patch(`/flowersList/${inputFormData.id}.json`, {
           name: inputFormData.name,
           scientificName: inputFormData.scientificName,
           family: inputFormData.family,
           interestingFacts: {
            height: inputFormData.height,
             nameOrigin: inputFormData.nameOrigin,
             species: inputFormData.species
           }
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
};
   
const getters = {
    flowers: state => {
        return state.flowers;
    },
    flowerId: state => {
        return state.flowers.filter(flower => flower.id)
    },
    flowerName: state => {
        return state.flowers.filter(flower => flower.name)
    },
    flowerScientificName: state => {
        return state.flowers.filter(flower => flower.scientificName)
    },
    flowerfamily: state => {
        return state.flowers.filter(flower => flower.family)
    },
    newFlower: state => {
        return state.newFlower
    },
    
};

export default {
    state,
    mutations,
    actions,
    getters
};

