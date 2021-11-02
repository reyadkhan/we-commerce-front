<template>
    <div class='p-5'>
        <div class="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100 p-10">
            <table class="table-auto">
                <thead>
                <tr>
                    <th class="px-4 py-2 text-emerald-600">#</th>
                    <th class="px-4 py-2 text-emerald-600">Name</th>
                    <th class="px-4 py-2 text-emerald-600">Price</th>
                    <th class="px-4 py-2 text-emerald-600">Quantity</th>
                    <th class="px-4 py-2 text-emerald-600">Details</th>
                    <th class="px-4 py-2 text-emerald-600">Photo</th>
                    <th class="px-4 py-2 text-emerald-600">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for='(product, index) in products' :key='product.id'>
                    <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ index + 1 }}</td>
                    <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ product.name }}</td>
                    <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ product.price }}</td>
                    <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ product.qty }}</td>
                    <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">{{ product.desc }}</td>
                    <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                        <img v-if='product.img' :src='product.img' class='w-40' alt='Product image'>
                    </td>
                    <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                        <div class='flex justify-center'>
                            <NuxtLink :to='"/admin/products/" + product.id + "/edit"'>
                                <em class='fa fa-edit mr-2 rounded bg-indigo-500 text-indigo-100 hover:text-white cursor-pointer p-2' title='Edit'></em>
                            </NuxtLink>
                            <em title='Delete' class='fa fa-trash rounded bg-red-400 text-indigo-100 hover:text-white cursor-pointer p-2' @click="deleteProduct(product.id)"></em>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { PropType } from 'vue'
import { Product } from '~/beans/product'

export default Vue.extend({
    props: {
        products: {
            type: Array as PropType<Product []>,
            required: true
        }
    },
    methods: {
        deleteProduct(id: number) {
            if(confirm("Want to delete this product?")) {
                this.$axios.$delete("products/" + id)
                    .then(() => {
                        this.$notifier.show("Product successfully deleted", 'Success !', 'indigo')
                        this.$nuxt.refresh();
                    }).catch((e) => {
                        if(e.response) {
                            if(e.response.status === 403) {
                                this.$notifier.show("Unauthorized action.");
                            } else if(e.response.status === 404) {
                                this.$notifier.show("Product not found.")
                            } else {
                                this.$notifier.show("Failed to delete the product.")
                            }
                        }
                })
            }
        }
    }
})
</script>
