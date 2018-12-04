<template>
<div>
    <h1>How to prepare your spreadsheet</h1>
    <h1>Download a sample spreadsheet</h1>
    <h1>Have Questions?</h1>

<button class="btn btn-primary btn-info" @click="goBack">Back to deals</button>
</div>
</template>

<script>
export default {
    methods:{
        goBack(){
            this.$router.push('/deals')
        }
    }
    
    }
</script>