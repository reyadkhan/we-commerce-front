<template>
    <FetchState v-if='$fetchState.pending || $fetchState.error' :fetch-state='$fetchState' class='mt-5' />
    <div v-else>
        <div class='ml-14 mt-14'>
            <label for='filter-by-status' class='font-bold'>Order Status:</label>
            <select id='filter-by-status' v-model='selectedStatus' class='h-7 ml-3'>
                <option value='' selected>All</option>
                <option v-for='status in orderStatus' :key='status' :value='status'>{{ status }}</option>
            </select>
        </div>
        <OrderTable :orders='orders' @refresh='$fetch()' />
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Order } from '~/beans/order'
import OrderTable from '~/components/OrderTable.vue'
import { OrderStatus } from '~/enums/OrderStatus'

export default Vue.extend({
    components: { OrderTable },
    data: () => ({
        orders: [] as Order[],
        orderStatus: OrderStatus,
        selectedStatus: ''
    }),
    async fetch() {
        const pageable = await this.$axios.$get('orders')
        this.orders = pageable.data; // TODO handle pagination
    },
    computed: {
        orderCodeSearch() {
            return this.$store.state.search;
        }
    },
    watch: {
        orderCodeSearch(value: string) {
            if(value.length > 1) {
                this.setFetchState(true)
                this.$axios.$post('search-orders/' + value)
                .then((res: Order) => {
                    this.orders = [res]
                    this.setFetchState()
                }).catch(e => {
                    if(e.response.status === 404) {
                        this.orders = [];
                        this.setFetchState()
                    } else {
                        this.setFetchState(false, e)
                    }
                })
            } else if(this.orders.length <= 0) {
                this.$fetch()
            }
        },
        selectedStatus(status: string) {
            if(status === '') {
                this.$fetch()
            } else {
                this.setFetchState(true)
                this.$axios.$post('search-orders/status/' + status)
                .then(res => {
                    this.orders = res.data
                    this.setFetchState();
                }).catch(e => {
                    if(e.response.status === 404) {
                        this.orders = [];
                        this.setFetchState()
                    } else {
                        this.setFetchState(false, e);
                    }
                })
            }
        }
    },
    methods: {
        setFetchState(pending = false, error: Error | null = null) {
            this.$fetchState = { pending, error, timestamp: Date.now()}
        }
    }
})
</script>
