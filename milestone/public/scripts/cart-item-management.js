const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');
const cartBadges = document.querySelectorAll('.nav-items .badge');
const cartItemTotalPriceElement = document.querySelector('.cart-item-price'); 
const cartTotalPriceElement = document.getElementById('cart-total-price');

async function updateCartItem(event) {
    event.preventDefault();
    
    const form = event.target;

    const aaa = form.querySelector('button');
    console.log(aaa);
    
    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value;
    let response
    try {
        response = await fetch('/cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
                productId: productId,
                quantity: +quantity,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch(err) {
        alert('Something went Wrong!');
        return;
    }

    if(!response.ok) {
        alert('Something went Wrong!');
        return;
    }

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.updatedCartData.updatedItemPrice <= 0) {
        form.parentElement.parentElement.remove();
    } else {
        this.parentElement.children[0].children[1].children[0].textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
    }
    
    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);
    for (const cartBadge of cartBadges) {
        cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
    }

}

for(const formElement of cartItemUpdateFormElements) {
    formElement.addEventListener('submit', updateCartItem);
}