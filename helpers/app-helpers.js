import configs from '~/nuxt.config'

export class Csrf {
    static async fetch(axios) {
        const url = configs.auth.strategies.laravelSanctum.url

        if(url) {
            await axios.$get("sanctum/csrf-cookie", {
                baseURL: url,
                withCredentials: true
            })
        }
    }
}

export class Cart {
    static #cartStorageKey = "cartItems";

    static add(product) {
        const items = this.get();
        items.push({
            product,
            quantity: 1
        });
        this.#store(items);
    }

    static exists(productId) {
        const items = this.get();
        let found = false;

        items.some(item => {
            if(item.product.id === productId) {
                found = true;
            }
            return found;
        });
        return found;
    }

    static addQuantity(productId, quantity) {
        const items = this.get();

        items.some(item => {
            if(item.product.id === productId) {
                item.quantity += quantity;
                this.#store(items);
                return true;
            }
            return false;
        });
    }

    static removeItem(productId) {
        const items = this.get();

        items.some((item, index) => {
            if(item.product.id === productId) {
                items.splice(index, 1);
                this.#store(items);
                return true;
            }
            return false;
        })
    }

    static destroy() {
        this.#store([]);
    }

    static get() {
        return JSON.parse(localStorage.getItem(this.#cartStorageKey)) || [];
    }

    static count() {
        return this.get().length;
    }

    static #store(items) {
        localStorage.setItem(this.#cartStorageKey, JSON.stringify(items));
    }
}


