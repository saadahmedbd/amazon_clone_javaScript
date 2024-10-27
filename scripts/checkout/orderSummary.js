import { cart,removeFromCart,updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { deliveryOptions ,getDeliveryOption} from "../../data/delivaryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";



export function renderOrderSummary(){
let cartSummaryHTML='';

cart.forEach((cartItem) =>{
    const productId=cartItem.productId;

    const metchingProduct=getProduct(productId);
    
    

    const deliveryOptionId =cartItem.deliveryOptionId;
    
    const deliveryOption =getDeliveryOption(deliveryOptionId);
    
    const today=dayjs();
    const deliveryDate =today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString=deliveryDate.format('dddd, MMMM D');


   cartSummaryHTML+= `<div class="cart-item-container
                    js-cart-item-container-${metchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${metchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${metchingProduct.name}
                </div>
                <div class="product-price">
                  ${metchingProduct.getPriceCentsUrl()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quentity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                  js-delete-quantity-link"
                  data-product-id="${metchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(metchingProduct,cartItem)}
              
               
              </div>
            </div>
          </div>`
});

document.querySelector('.js-cart-item-container')
    .innerHTML=cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) =>{
        link.addEventListener('click', () =>{
            const productId=link.dataset.productId;
            removeFromCart(productId);
            renderPaymentSummary();
            
    
        const container=document.querySelector
        (`.js-cart-item-container-${productId}`);
        container.remove();
        });
    }); 

function deliveryOptionsHTML(metchingProduct,cartItem){
  let html='';
  deliveryOptions.forEach((deliveryOption) =>{
    const today=dayjs();
    const deliveryDate =today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString=deliveryDate.format('dddd, MMMM D');
    
    const priceString =deliveryOption.priceCents 
    ===0
    ? 'FREE'
    :`$${(deliveryOption.priceCents /100).toFixed(2)} -`

    const isChecked =deliveryOption.id === cartItem.deliveryOptionId;

    html +=`  
    <div class="delivery-option js-delivery-option
    data-product-id=${metchingProduct.id}"
    data-delivery-option-id=${deliveryOption.id}>
          <input type="radio" 
          ${isChecked ?'checked' :''}
              class="delivery-option-input"
              name="delivery-option-${metchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
    </div>`
  });
  
  return html;


}
document.querySelectorAll('.js-delivery-option')
  .forEach((element) =>{
    element.addEventListener('click',() =>{
      // const productId =element.dataset.productId;
      // const deliveryOptionId=element.dataset.deliveryOptionId
      const{productId, deliveryOptionId}=element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();// it's not working error say deliveryOptionId undefined
      renderPaymentSummary(); //it's not working error say deliveryOptionId undefined
    });
  });
}
renderOrderSummary();