<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel Vue Datatables Component Example</div>
  
                    <div class="card-body">
                        <datatable :columns="columns" :data="rows" :per-page="per_page"></datatable>
                        <datatable-pager v-model="page"></datatable-pager>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
  
    // import {VuejsDatatableFactory}  from 'vuejs-datatable';
  
    export default {
        // components: { VuejsDatatableFactory  },
        mounted() {
            console.log('Component mounted.')
        },
        data(){
            return {
                columns: [
                        {label: 'id', field: 'id'}, 
                        {label: 'Title', field: 'title'}
                    ],
                rows: [],
                page: 1,
                per_page: 10,
            }
        },
        methods:{
            getUsers: function() {
                axios.get('/vue/api/posts').then(function(response){
                    this.rows = response.data;
                }.bind(this));
            }
        },
        created: function(){
            this.getUsers()
        }
    }
</script>