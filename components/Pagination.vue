<template>
  <div class="flex items-center space-x-1">
    <a ref='prev' href="#" :class='prev ? activeClass : disabledClass' class="px-4 py-2 text-gray-500 bg-gray-300 rounded-md" @click.prevent='prev ? loadPrev() : ""'>
      Previous
    </a>
    <a ref='next' href='#' :class='next ? activeClass : disabledClass' class="px-4 py-2 text-gray-500 bg-gray-300 rounded-md" @click.prevent='next ? loadNext() : ""'>
      Next
    </a>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { PropType } from 'vue'
import { PageMetaInfo } from '~/beans/pageMetaInfo'

export default Vue.extend({
    props: {
        meta: {
            type: Object as PropType<PageMetaInfo>,
            required: true
        }
    },
    data: () => ({
        disabledClass: "cursor-not-allowed" as string,
        activeClass: "font-bold hover:bg-blue-400 hover:text-white" as string,
        paginating: false as boolean
    }),
    computed: {
        prev(): string|null {
            const prevNumber = this.meta.currentPage > 1 ? this.meta.currentPage - 1 : null;
            if(prevNumber) {
                return this.paginateUrl(prevNumber);
            }
            return null;
        },
        next(): string|null {
            const nextNumber = this.meta.lastPage > this.meta.currentPage
                ? this.meta.currentPage + 1 : null;
            if(nextNumber) {
                return this.paginateUrl(nextNumber);
            }
            return null;
        }
    },
    methods: {
        paginateUrl(pageNumber: number): string {
            const router = this.$router.currentRoute;
            let queryString = '';
            let attached = false;

            Object.entries(router.query).forEach(([key, value]) => {
                if(queryString) {
                    queryString += '&';
                }
                queryString += key + '=';

                if(key === 'page') {
                    queryString += pageNumber;
                    attached = true;
                } else {
                    queryString += value
                }
            })

            if(queryString && ! attached) {
                queryString += '&'
            }

            if( ! attached) {
                queryString += 'page=' + pageNumber;
            }
            return router.path + '?' + queryString;
        },
        loadNext() {
            if( ! this.paginating) {
                this.$emit('load-data', this.next)
                this.paginating = true
            }

        },
        loadPrev() {
            if( ! this.paginating) {
                this.$emit('load-data', this.prev);
                this.paginating = true
            }
        }
    }
})
</script>
