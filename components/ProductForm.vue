<template>
    <div class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-lg mx-auto mt-10'>
        <div class='my-5 flex justify-end'>
            <NuxtLink to='/admin/products' class='bg-yellow-600 border-b text-white rounded px-4 py-2'>Back to list</NuxtLink>
        </div>
        <ValidationObserver ref='form' v-slot='{ handleSubmit }'>
            <form @submit.prevent='handleSubmit(submit)'>
                <p v-show='error' class='text-red-400 text-md'>{{ error }}</p>
                <div class='mb-4'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='name'>
                        Product Name
                    </label>
                    <ValidationProvider v-slot='{ errors }' vid='name' rules='required|min:2|max:50' name='name'>
                        <input id='name' v-model='productName'
                               class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' type='text'
                               placeholder='Product name' />
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='mb-4'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='price'>
                        Price
                    </label>
                    <ValidationProvider v-slot='{ errors }' vid='price' rules='required' name='price'>
                        <input id='price' v-model='productPrice'
                               class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' type='number'/>
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='mb-4'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='qty'>
                        Quantity
                    </label>
                    <ValidationProvider v-slot='{ errors }' vid='qty' rules='required' name='quantity'>
                        <input id='qty' v-model='productQty'
                               class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' type='number'/>
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='mb-4'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='img'>
                        Image
                    </label>
                    <img v-show='imgUrl' :src='imgUrl' height='200' width='250' alt='Product image'>
                    <ValidationProvider v-slot='{ errors }' vid='img' name='image'>
                        <input id='img' ref='uploadedImg' class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' type='file' accept='image/*' @change='imgUpload'/>
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='mb-4'>
                    <label class='block text-grey-darker text-sm font-bold mb-2' for='details'>
                        Description
                    </label>
                    <ValidationProvider v-slot='{ errors }' vid='description' rules='max:1000' name='description'>
                        <textarea id='details' v-model='productDesc'
                                  class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'></textarea>
                        <p class='text-red-400 text-xs italic'>{{ errors[0] }}</p>
                    </ValidationProvider>
                </div>

                <div class='flex items-center justify-end'>
                    <button :disabled='submitting' class='bg-blue-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { PropType } from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { Product } from '~/beans/product'

interface Form extends Element {
    setErrors(errors: object): void
}

interface ImgRes {
    url: string
}

interface Field extends HTMLElement {
    files: File[],
    dataTransfer: {
        files: File[]
    }
}

export default Vue.extend({
    components: {
        ValidationObserver,
        ValidationProvider
    },
    props: {
        product: {
            type: Object as PropType<Product>,
            required: false,
            default: () => ({} as Product)
        }
    },
    data: () => ({
        error: '' as string,
        submitting: false as boolean,
        uploadedImage: {} as File | null,
        productName: '' as string,
        productQty: null as number|null,
        productPrice: null as number|null,
        productDesc: '' as string,
        uploadedUrl: '' as string
    }),
    computed: {
        imgUrl(): string|null {
            return this.uploadedUrl
        }
    },
    mounted() {
        if(this.product) {
            this.productName = this.product.name;
            this.productQty = this.product.qty;
            this.productPrice = this.product.price;
            this.productDesc = this.product.desc;
            this.uploadedUrl = this.product.img;
        }
    },
    methods: {
        imgUpload () {
            const input = this.$refs.uploadedImg as Field;
            const files = input.files || input.dataTransfer.files;

            if ( ! files.length) {
                return
            }
            if(files[0].size > 500000) {
                (this.$refs.form as Form).setErrors({img: ['Maximum image size should be under 5KB']})
                return
            }
            this.uploadedImage = files[0]
            const formData = new FormData();
            formData.append("folder",'we-commerce');
            formData.append("file", this.uploadedImage);
            formData.append("upload_preset", 'we_com');

            this.submitting = true;
            this.$axios.$post('https://api.cloudinary.com/v1_1/reyad-khan/upload', formData)
                .then((res: ImgRes) => {
                    this.uploadedUrl =  res.url;
                    this.submitting = false
                })
                .catch((err) => {
                    if(err) {
                        (this.$refs.form as Form).setErrors({img: ['Image upload failed.']})
                        this.uploadedImage = null;
                    }
                    this.submitting = false
                })
        },
        submit() {
            this.submitting = true;
            let res;

            const data = {
                name: this.productName,
                price: this.productPrice,
                qty: this.productQty,
                desc: this.productDesc,
                img: this.uploadedUrl
            }

            if(this.product.id) {
                res = this.$axios.$put("products/" + this.product.id, data)
            } else {
                res = this.$axios.$post("products", data)
            }
            res.then(() => {
                this.$router.push('/admin/products')
            })
            res.catch((err) => {
                if(err.response && err.response.status === 422) {
                    (this.$refs.form as Form).setErrors(err.response.data.errors);
                } else {
                    this.error = "Failed to process the product";
                }
            })
        }
    }
})
</script>
