import {store} from '../store/store'

import Home from '../app-modules/home/Home.vue';
import contactsList from '../app-modules/leads/pages/list/list-page.vue';
import contactCreate from '../app-modules/leads/pages/create/create-form-page.vue';
import contacts from '../app-modules/leads/pages/contacts-page.vue';
import importLeads from '../app-modules/leads/pages/edit/import-leads-page.vue';
import importInfo from '../app-modules/leads/pages/edit/import-info-page.vue';
import importActions from '../app-modules/leads/pages/edit/import-actions-page.vue';
import editProperties from '../app-modules/leads/pages/edit/actions/edit-properties-page.vue';
import editColumns from '../app-modules/leads/pages/edit/actions/edit-columns-page.vue';
import restoreContacts from '../app-modules/leads/pages/edit/actions/restore-contacts-page.vue';
import contactsActions from '../app-modules/leads/pages/edit/actions/contacts-actions-page.vue';
import dealsPage from '../app-modules/deals/pages/deals-page.vue';
import dealsList from '../app-modules/deals/pages/deals-list/deals-list-page.vue';

import importDeal from '../app-modules/deals/pages/deal-edit/import/import-deal-page.vue';
import importDealInfo from '../app-modules/deals/pages/deal-edit/import/import-info-page.vue';
import importDealActions from '../app-modules/deals/pages/deal-edit/import/import-actions-page.vue';
import dealsActions from '../app-modules/deals/pages/deal-edit/actions/deals-actions-page.vue';
import editDealStages from '../app-modules/deals/pages/deal-edit/actions/edit-deal-stages-page.vue';
import sortDeals from '../app-modules/deals/pages/deal-edit/actions/sort-deals-page.vue';
import restoreDeals from '../app-modules/deals/pages/deal-edit/actions/restore-deals-page.vue';
import dealForm from '../app-modules/deals/components/deal-create/create-deal-component.vue';
import contactElement from '../app-modules/leads/pages/contacts-element/contact-element-page.vue';
import contactDetails from '../app-modules/leads/pages/contacts-element/contact-details-page.vue';
import testListPage from '../app-modules/leads/pages/list/test-list-page.vue';
import testList from '../app-modules/leads/components/list/test-list.vue';
import flowerForm from '../app-modules/leads/components/list/flower-form.vue'



export const routes = [

 {path: '/',  component: Home},
 
 {path: '/contacts', component: contacts, children:[
        {path: '', component: contactsList},
        {path: 'create', component: contactCreate},
        {path: 'import', component: importLeads, children:[
            {path: '', component: importInfo},
            {path: 'newImport', component: importActions},
        ]},
        {path: 'edit', component: contactsActions, children: [
            {path: 'editProperties', component: editProperties},
            {path: 'editColumns', component: editColumns},
            {path: 'restoreContacts', component: restoreContacts}
        ]},
        {path: '/contact/:id',  component: contactElement, children:[
             {path: '',  component: contactDetails}
        ]}
 ]},
{path: '/deals', component: dealsPage, children: [
    {path: '', component: dealsList},
    {path: "/createDeal", component: dealForm},
    {path: 'import', component: importDeal, children:[
        {path: '', component: importDealInfo},
        {path: 'newImport', component: importDealActions},
    ]},
   {path: 'edit', component: dealsActions, children: [
            {path: 'editDealStages', component: editDealStages},
            {path: 'sortDeals', component: sortDeals},
            {path: 'restoreDeals', component: restoreDeals}
        ]} 

]},

{path: '/flowers', component: testListPage, children: [
    {path: '', component: testList},
    {path: 'flowerForm', component: flowerForm}
]},

]


    