import Vue from 'vue';          
import Vuex from 'vuex';




import leads from '../store/modules/leads/leads'
import testList from '../store/modules/testList'
import deals from '../store/modules/deals/deals'


Vue.use(Vuex);  


export const store = new Vuex.Store({
    modules:{
        leads,
        deals,
        testList,
        
        
    }
})



