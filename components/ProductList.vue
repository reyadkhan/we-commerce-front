<template>
    <div>
        <FetchState v-if='$fetchState.pending || $fetchState.error' :fetch-state='$fetchState' class='mt-5' />
        <div v-else>
            <div v-if=' ! tableView'>
                <div class='flex items-center flex-wrap pt-4 pb-12'>
                    <nav id="store" class="w-full z-30 top-0 px-6 py-1">
                        <div class="w-full container flex flex-wrap items-center justify-end mt-0 px-2 py-3 h-16">

                            <div id="store-nav-content" class="flex items-center">
                                <a href="#" title="Sort by price" class="pl-3 inline-block no-underline hover:text-black" @click.prevent="sortByPrice()">
                                    <svg :class="sortDirection === 'asc' ? 'transform rotate-180': ''" class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                                    </svg>
                                </a>

                                <input v-show='searching' ref='searchInput' v-model='productName'
                                       class='shadow appearance-none border rounded py-2 px-3 mx-3 text-grey-darker'
                                       type='search' placeholder='Search by product name'/>
                                <a class="pl-3 inline-block no-underline hover:text-black" href="#" @click.prevent="toggleSearch()">
                                    <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </nav>

                    <ProductCard v-for='product in products' :key='product.id' :product='product'></ProductCard>
                </div>
                <div v-if='pageAble.meta.lastPage > 1' class='flex justify-center px-10'>
                    <Pagination :meta='pageAble.meta' @load-data='setPath($event)' />
                </div>
            </div>
            <div v-else class='p-3'>
                <div class='border-b p-3 flex justify-between'>
                    <h5 class='font-bold text-black'></h5>
                    <NuxtLink to='/admin/products/create' class='border-b px-4 py-2 bg-indigo-500 text-blue-50 rounded hover:text-white'>Create Product</NuxtLink>
                </div>
                <ProductTable :products='products' />
                <div v-if='pageAble.meta.lastPage > 1' class='flex justify-center px-10'>
                    <Pagination :meta='pageAble.meta' @load-data='setPath($event)' />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import type { PropType } from 'vue'
import Vue from 'vue'
import { Product } from '~/beans/product'
import { Pageable } from '~/beans/pageable'

enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

interface SearchInput extends Element{
    focus(): void
}

export default Vue.extend({
    props: {
        tableView: {
            type: Boolean as PropType<Boolean>,
            required: false,
            default: false
        }
    },
    data: () => ({
        products: [] as Product[],
        pageAble: {} as Pageable,
        sortDirection: SortDirection.DESC,
        searching: false as boolean,
        productName: "" as string
    }),
    async fetch() {
        await this.loadProduct();
    },
    computed: {
        productSearch() {
            return this.$store.state.search
        }
    },
    watch: {
        async productName(value: string) {
            await this.searchProductByName(value);
        },
        productSearch(value: string) {
            this.productName = value
        }
    },
    mounted() {
        if(this.productSearch) {
            this.productName = this.productSearch
        }
    },
    methods: {
        async loadProduct() {
            this.pageAble = await this.$axios.$get("products" + this.$queryString(this.$router));
            this.products = this.pageAble.data

            if(this.sortDirection !== SortDirection.DESC) {
                this.sortDirection = SortDirection.DESC
            }
        },
        async searchProductByName(value: string) {
            if(value.length >= 3) {
                this.pageAble = await this.$axios.$post("search-products?name=" + value)
                this.products = this.pageAble.data
            } else if(value.length <= 0) {
                await this.loadProduct();
            }
        },
        async setPath(url: string) {
            await this.$router.replace(url);
            await this.loadProduct();
        },
        async sortByPrice() {
            let direction;

            if(this.sortDirection === SortDirection.ASC) {
                direction = SortDirection.DESC
            } else {
                direction = SortDirection.ASC
            }
            this.pageAble = await this.$axios.$get("sort-products?price=" + direction)
            this.products = this.pageAble.data
            this.sortDirection = direction;
        },
        toggleSearch() {
            this.searching = ! this.searching;

            if( ! this.searching) {
                this.productName = '';
            } else {
                this.$nextTick(() => {
                    (this.$refs.searchInput as SearchInput).focus();
                });
            }
        }
    }
})
</script>
