<template>
     <div class="container">
         <div class="card" v-for="(post,index) in posts" :key="index">
            <div class="card-body">
                <h4 class="card-title"><a v-bind:href="'/vue/api/post/'+post.slug" target="_blank">{{post.title}}</a></h4>
                <p class="card-text">{{post.description}}</p>
            </div>
        </div>
       <infinite-loading @infinite="infiniteHandler"></infinite-loading>

     </div>

</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
export default {
    components: { InfiniteLoading },
  data() {
    return {
      page: 1,
      posts: [],
    };
  },
  methods: {
     infiniteHandler($state) {
      axios.get('/vue/api/post', {
        params: {
          page: this.page,
        },
      }).then(({ data }) => {
        if (data.data.length) {
          this.page += 1;
          this.posts.push(...data.data);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
};
</script>