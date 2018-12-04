import axios from 'axios'
import {store} from '../../../store/store';


const state = {

   
    newContact: {
    
        name:'',
        email:'',
        phone:'',
        selectedOwner: '',
        
    },
    allCreatedContacts: [],
  
 
};

const mutations = {
    
    updateName: (state, payload) =>{
        state.newContact.name = payload
      },
    updateEmail: (state, payload) =>{
        state.newContact.email = payload
      },
    updatePhone: (state, payload) =>{
        state.newContact.phone = payload
      },
    updateSelectedOwner: (state, payload) =>{
        state.newContact.selectedOwner = payload
      },
   storeContact: (state, newContacts)=>{
       state.allCreatedContacts = newContacts
   }
};

const actions = {
    
    updateName:({commit}, payload) =>{
        commit ('updateName', payload)
    },
    updateEmail:({commit}, payload) =>{
        commit ('updateEmail', payload)
    },
    updatePhone:({commit}, payload) =>{
        commit ('updatePhone', payload)
    },
    updateSelectedOwner:({commit}, payload) =>{
        commit ('updateSelectedOwner', payload)
    },

    
     
    postContact: ({commit}, formData) => {
        axios.post('/createdContact.json'  , {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          selectedOwner: formData.selectedOwner,
       
          
        })
        .then(res => {
           console.log(res)
        })
        .catch(error => console.log(error))
    },
    
    fetchContact:({commit})=>{
    return axios.get('/createdContact.json' )
    .then(res =>  {
    console.log(res) 
    const data = res.data
    let newContacts = []
    for (let key in data){
      let contact = data[key]
       contact.id = key
       newContacts.push(contact)
     }
    
    console.log('new:', newContacts)
    commit('storeContact', newContacts)
    })
  .catch(error=> console.log(error))
  
   },

   deleteContact: (pax, contactId)=>{
    return axios.delete(`/createdContact/${contactId}.json`)
    .then(response => console.log(response))
    .catch(error => console.log(error))
},

   putNewContact: ()=>{
     return axios.put('/newContact.json', {
    name: 'Cassandra',
    email: 'testCassandra@test.com',
    phone: '495 00 00 00'
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
},

   updateContact: ()=>{
    return axios.patch('/newContact.json', {
        name: 'Cassandra',
        email: 'testMelissa@test.com',
        phone: '495 00 00 00'
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
},
   deleteNewContact:()=>{
       return axios.delete('/newContact.json')
       .then(response => console.log(response))
       .catch(error => console.log(error))
   },
   getOneContact:({commit}, contactId)=>{
       console.log(contactId)
       return axios.get(`/createdContact/${contactId}.json`)
       .then(response => {
           console.log(response)
       })
       .catch(error =>{
           console.log (error)
       })
   },
   putNew:()=>{
    return axios.put('/createdContact/newContact.json', {
        name: 'Cassandra',
        email: 'testCassandra@test.com',
        phone: '495 00 00 00'
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
   },
   //=======================================================
   postLeads: ({commit}) => {
    return axios.post('https://xmnb3gshvf.execute-api.us-east-1.amazonaws.com/prod/leads', {
    body: { 
        lead1: {id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org'},
        lead2: {id: 2,
        name: 'Ervin Howell',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593 x09125',
        website: 'anastasia.net' },
        lead3: {id: 3,
        name: 'Clementine Bauch',
        email: 'Nathan@yesenia.net',
        phone: '1-463-123-4447',
        website: 'ramiro.info' },
        lead4: {id: 4,
        name: 'Patricia Lebsack',
        email: 'Julianne.OConner@kory.org',
        phone: '493-170-9623 x156',
        website: 'kale.biz' },
    }, 
    headers:{
        contentType: 'application/json;charset=UTF-8', 
        AccessControlAllowOrigin: "*",
    }
      })
    .then(res => {
       console.log(res)
    })
    .catch(error => console.log(error))
},

};
   
const getters = {
    leads: state => {
        return state.leads;
    },
    newContact: state => {
        return state.newContact
    },
    allCreatedContacts: state=>{
        return state.allCreatedContacts
    },
    
};



export default {
    state,
    mutations,
    actions,
    getters,

};

