<template>
    <section class="bg-white py-8">
        <div class="container mx-auto">
            <span class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
                Store
            </span>
            <ProductList />
        </div>
    </section>
</template>

<!--<script lang='ts'>-->
<!--import Vue from 'vue'-->
<!--import { Product } from '~/beans/product'-->
<!--import { Pageable } from '~/beans/pageable'-->
<!--import ProductList from '~/components/ProductList.vue'-->

<!--enum SortDirection {-->
<!--    ASC = 'asc',-->
<!--    DESC = 'desc'-->
<!--}-->

<!--interface SearchInput extends Element{-->
<!--    focus(): void-->
<!--}-->

<!--export default Vue.extend({-->
<!--    components: { ProductList },-->
<!--    data: () => ({-->
<!--        products: [] as Product[],-->
<!--        pageAble: {} as Pageable,-->
<!--        sortDirection: SortDirection.DESC,-->
<!--        searching: false as boolean,-->
<!--        productName: "" as string-->
<!--    }),-->
<!--    async fetch() {-->
<!--        await this.loadProduct();-->
<!--    },-->
<!--    watch: {-->
<!--        async productName(value: string) {-->
<!--            if(value.length >= 3) {-->
<!--                this.pageAble = await this.$axios.$post("search-products?name=" + value)-->
<!--                this.products = this.pageAble.data-->
<!--            } else if(value.length <= 0) {-->
<!--                await this.loadProduct();-->
<!--            }-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        async loadProduct() {-->
<!--            this.pageAble = await this.$axios.$get("products");-->
<!--            this.products = this.pageAble.data-->

<!--            if(this.sortDirection !== SortDirection.DESC) {-->
<!--                this.sortDirection = SortDirection.DESC-->
<!--            }-->
<!--        },-->
<!--        async sortByPrice() {-->
<!--            let direction;-->

<!--            if(this.sortDirection === SortDirection.ASC) {-->
<!--                direction = SortDirection.DESC-->
<!--            } else {-->
<!--                direction = SortDirection.ASC-->
<!--            }-->
<!--            this.pageAble = await this.$axios.$get("sort-products?price=" + direction)-->
<!--            this.products = this.pageAble.data-->
<!--            this.sortDirection = direction;-->
<!--        },-->
<!--        toggleSearch() {-->
<!--            this.searching = ! this.searching;-->

<!--            if( ! this.searching) {-->
<!--                this.productName = '';-->
<!--            } else {-->
<!--                this.$nextTick(() => {-->
<!--                    (this.$refs.searchInput as SearchInput).focus();-->
<!--                });-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--})-->
<!--</script>-->
