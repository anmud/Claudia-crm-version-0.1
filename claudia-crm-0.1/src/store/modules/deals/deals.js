import axios from 'axios'
import {store} from '../../store'


const state = {

   
    newDeal: {
       dealName: '',
       selectedPipeline: '',
       selectedDealStage: '',
       amount: '',
       selectedDealOwner: '',
       selectedCompany: '',
       selectedContact: '',
       selectedContactId: ''
    },
    
    allCreatedDeals: [],
  
 
};

const mutations = {
    
    updateDealName: (state, payload) =>{
        state.newDeal.dealName = payload
      },
    updatePipeline: (state, payload) =>{
        state.newDeal.selectedPipeline = payload
      },
    updateDealStage: (state, payload) =>{
        state.newDeal.selectedDealStage = payload
      },
    updateAmount: (state, payload) =>{
        state.newDeal.amount = payload
      },
      updateSelectedDealOwner: (state, payload) =>{
        state.newDeal.selectedDealOwner = payload
      },
      updateSelectedCompany: (state, payload) =>{
        state.newDeal.selectedCompany = payload
      },
      updateSelectedContact: (state, payload) =>{
        state.newDeal.selectedContact = payload
      },
   storeDeal: (state, newDeals)=>{
       state.allCreatedDeals = newDeals
   }
};

const actions = {
    
    updateDealName:({commit}, payload) =>{
        commit ('updateDealName', payload)
    },
    updatePipeline:({commit}, payload) =>{
        commit ('updatePipeline', payload)
    },
    updateDealStage:({commit}, payload) =>{
        commit ('updateDealStage', payload)
    },
    updateAmount:({commit}, payload) =>{
        commit ('updateAmount', payload)
    },
    updateSelectedDealOwner:({commit}, payload) =>{
        commit ('updateSelectedDealOwner', payload)
    },
    updateSelectedCompany:({commit}, payload) =>{
        commit ('updateSelectedCompany', payload)
    },
    updateSelectedContact:({commit}, payload) =>{
        commit ('updateSelectedContact', payload)
    },
     
    postDeal: ({commit}, formData) => {
        console.log('state',store.state.leads)
       return   axios.post('/createdDeal.json', {
          dealName: formData.dealName,
          selectedPipeline: formData.selectedPipeline,
          selectedDealStage: formData.selectedDealStage,
          amount: formData.amount,
          selectedDealOwner: formData.selectedDealOwner,
          selectedCompany: formData.selectedCompany,
          selectedContact: formData.selectedContact,
          selectedContactId: store.state.leads.allCreatedContacts.filter(element => element.name === formData.selectedContact)[0].id 

          
        })
        .then(res => {
           console.log('response from post request',res)
        })
        .catch(error => console.log(error))
    },
    
    getAllDeals:({commit})=>{
    return axios.get('/createdDeal.json')
    .then(res =>  {
    console.log("response from get all request", res) 
    const data = res.data
    let newDeals = []
    for (let key in data){
      let deal = data[key]
       deal.id = key
       newDeals.push(deal)
     }
    
    console.log('new deals:', newDeals)
    commit('storeDeal', newDeals)
    })
  .catch(error=> console.log(error))
  
   },
   deleteDeal: (pax, dealId)=>{
    return axios.delete(`/createdDeal/${dealId}.json`)
    .then(response => console.log(response))
    .catch(error => console.log(error))
},


};
   
const getters = {
    
    newDeal: state => {
        return state.newDeal
    },
    allCreatedDeals: state=>{
        return state.allCreatedDeals
    },
    
};



export default {
    state,
    mutations,
    actions,
    getters,

};

