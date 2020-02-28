<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel vue pagination</div>
 
                    <div class="card-body">
                        <ul>
                            <li v-for="post in laravelData.data" :key="post.id">{{ post.title }}</li>
                        </ul>
                        <pagination :data="laravelData" @pagination-change-page="getResults"></pagination>
 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import Pagination from 'laravel-vue-pagination';
    export default {
        components: { Pagination },
        mounted() {
            console.log('Component mounted.')
        },
        data() {
            return {
                laravelData: {},
            }
        },
        created() {
            this.getResults();
        },
        methods: {
            getResults(page) {
                if (typeof page === 'undefined') {
                    page = 1;
                }
      
                this.$http.get('/vue/api/post?page=' + page)
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        this.laravelData = data;
                    });
            }
        }
    }
</script>