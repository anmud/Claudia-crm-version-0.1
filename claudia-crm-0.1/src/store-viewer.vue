<template>
<div>
<h1>Hello from store</h1>
<pre>
    {{stateView}}
</pre>
</div>
</template>

<script>
import {store} from '../src/store/store.js'

export default{
 computed:{
     stateView(){
         return JSON.stringify(store.state, null, 4)
     }
 }
}
</script>