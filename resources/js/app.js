/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
Vue.use(require('vue-resource'));

import { VuejsDatatableFactory } from 'vuejs-datatable';
 
Vue.use( VuejsDatatableFactory );


VuejsDatatableFactory.useDefaultType( false )
    .registerTableType( 'datatable', tableType => tableType.mergeSettings( {
        table: {
            class:   'table table-hover table-striped',
            sorting: {
                sortAsc:  '<i class="fas fa-sort-amount-up" title="Sort ascending"></i>',
                sortDesc: '<i class="fas fa-sort-amount-down" title="Sort descending"></i>',
                sortNone: '<i class="fas fa-sort" title="Sort"></i>',
            },
        },
        pager: {
            classes: {
                pager:    'pagination text-center',
                selected: 'active',
            },
            icons: {
                next:     '<i class="fas fa-chevron-right" title="Next page"></i>',
                previous: '<i class="fas fa-chevron-left" title="Previous page"></i>',
            },
        },
    } ) );

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('paginate-component', require('./components/PaginateComponent.vue').default);
Vue.component('post-component', require('./components/PostListComponent.vue').default);
Vue.component('crop-upload', require('./components/CropUploadComponent.vue').default);
Vue.component('table-component', require('./components/DataTableComponent.vue').default);

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
$(document).ajaxStart(function() { Pace.restart(); });

const app = new Vue({
    el: '#app',
});
