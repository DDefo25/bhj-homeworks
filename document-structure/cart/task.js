class Cart {
    constructor(container) {
        this.container = container;
        this.cartProductsEl = container.querySelector('.cart__products');
        this.cartEl = container.querySelector('.cart');
        this.cart = [];
        this.cartStorage = window.localStorage;

        this.renderCart();
        this.registerEvent();
    }

    registerEvent() {
        this.container.querySelectorAll('.product__quantity-control').forEach( el => {
            el.addEventListener('click', () => this.changeProductQuantity( el ));
        });

        this.container.querySelectorAll('.product__add').forEach( el => {
            el.addEventListener('click', () => this.addToCart( this.getProductEl( el ) ));
        })

    }

    changeProductQuantity( el ) {
        let quantityEl = this.getProductQuantity( el );
        if (el.className.split(' ').some(cl => /dec$/.test(cl))) {
            quantityEl.textContent = (--quantityEl.textContent > 0) ? quantityEl.textContent : 0;
        } else if (el.className.split(' ').some(cl => /inc$/.test(cl))) {
            quantityEl.textContent++;
        }
    }

    addToCart( el ) {
        const productInCart = {
            id: el.dataset.id,
            image: el.querySelector('.product__image').src,
            quantity: +this.getProductQuantity( el ).textContent,
        }

        if ( this.isEmptyCart() || !(this.cart.find(product => product.id === productInCart.id)) ) {
            this.cart.push( productInCart );
            this.cartStorage.setItem('cart', JSON.stringify(this.cart));
            this.renderCart();
            this.movingProduct( productInCart );
        } else {
            const isInCart = this.cart.find(product => product.id === productInCart.id);
            isInCart.quantity += productInCart.quantity;
            this.cartStorage.setItem('cart', JSON.stringify(this.cart));
            this.renderCart();
            this.movingProduct( productInCart );
        }
    }

    removeFromCart( id ) {
        this.cart.splice(this.cart.findIndex(product => product.id === id), 1);
        this.cartStorage.setItem('cart', JSON.stringify(this.cart));
    }

    getElById( id, elCollection ) {
        return [...elCollection].find(el => el.dataset.id === id);
    }

    createCartProduct( product ) {
        const cartProduct = document.createElement('div');
        cartProduct.classList = 'cart__product';
        cartProduct.dataset.id = product.id;
        cartProduct.innerHTML = `
            <img class="cart__product-image" src="${product.image}">
            <div class="cart__product-count">${product.quantity}</div>
            <a href="#" class="cart__product-remove">&times;</a>
        `;

        const productRemover = cartProduct.querySelector('.cart__product-remove');
        productRemover.onclick = el => {
            this.removeFromCart( el.target.closest('.cart__product').dataset.id );
            this.renderCart();
        };

        this.cartProductsEl.append(cartProduct);
    }

    renderCart() {
        this.cartProductsEl.innerHTML = '';
        if (this.cartStorage.getItem('cart')) {
            this.cart = JSON.parse(this.cartStorage.getItem('cart'));
        }

        this.cart.forEach( product => {
            this.createCartProduct( product );
        })

        this.cartEl.style.display = ( !this.isEmptyCart() ) ? 'block' : 'none';
    }

    clearCart() {
        this.cart = [];
        this.renderCart();
    } 

    getProductEl( el ) {
        return el.closest('.product');
    }

    getProductQuantity( el ) {
        return this.getProductEl(el).querySelector('.product__quantity-value');
    }

    isEmptyCart() {
        return this.cart.length === 0;
    }

    movingProduct( product ) {
        let steps = 10;
        const productImage = this.getElById( product.id, this.container.querySelectorAll('.product') ).querySelector('.product__image');
        let x = productImage.getBoundingClientRect().x;
        let y = productImage.getBoundingClientRect().y;

        const productCart = this.getElById( product.id, this.cartProductsEl.children );
        
        const stepX = (productCart.getBoundingClientRect().x - x) / steps; 
        const stepY = (productCart.getBoundingClientRect().y - y) / steps; 

        const movingImage = document.createElement('img');
        movingImage.classList = 'product__image moving__image';
        movingImage.src = product.image;
        movingImage.style.top = y + 'px';
        movingImage.style.left = x + 'px';
        
        this.container.append(movingImage);


        const timerId = setInterval(() => {
            movingImage.style.top = `${parseInt(movingImage.style.top, 10) + stepY}px`;
            movingImage.style.left = `${parseInt(movingImage.style.left, 10) + stepX}px`;
            if ( --steps === 0 ) {
                clearInterval(timerId);
                movingImage.remove();
            };
        }, 10)
    }
}

const cart1 = new Cart(document.querySelector('body'));