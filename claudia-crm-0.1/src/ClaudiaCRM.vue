<template>
  <div id="app" class="container">
   
     <app-general-nav></app-general-nav>
    <router-view></router-view>
    <app-store-viewer></app-store-viewer>
  </div>
</template>

<script>
import generalNav from './common/general-nav';
import StoreViewer from '../src/store-viewer';
export default {
 components:{
   'app-general-nav': generalNav,
   'app-store-viewer': StoreViewer,
 }

}

</script>

