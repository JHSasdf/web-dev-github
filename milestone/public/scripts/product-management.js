const deleteProductButtonElements = document.querySelectorAll('.product-item button');

async function deleteProduct(event) {
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;
    try {
        const response = await axios({
            url: `/admin/products/${productId}?_csrf=${csrfToken}`,
            method: 'DELETE'
        });
        buttonElement.parentElement.parentElement.parentElement.parentElement.remove();

    } catch(err) {
        console.log(err);
    }
};

for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener('click', deleteProduct);
}