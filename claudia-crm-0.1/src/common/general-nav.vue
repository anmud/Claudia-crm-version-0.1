<template>
<div>
    <div>
        <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand" href="#">Home</router-link>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link  to="/contacts" active-class="active" tag="li"><a>Contacts</a></router-link>
                    <router-link to="/deals" active-class="active" tag="li"><a>Deals</a></router-link>
                
                      <router-link to="/flowers" active-class="active" tag="li"><a>Test List</a></router-link>
                     
                   
                </ul>
                
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
   
</div>
</div>
</template>

