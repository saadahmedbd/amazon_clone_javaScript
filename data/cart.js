export let cart;
loadFromStorage();
export function loadFromStorage(){
    cart=JSON.parse(localStorage.getItem('cart'));

    if(!cart){
        cart=[{

//we put default product in cart 
            productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        
            quentity:1,
            deliveryOptionId:'1'
        },{
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quentity:3,
            deliveryOptionId:'2'
        }];
    }

}
// cart product save in localStorage if we refrash our tab then do not remove product in cart
function saveToStroage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


//product add in cart function
export function addToCart(productId){
  
    let metchingItem;
    cart.forEach((cartItem) =>{
        if(productId===cartItem.productId){
            metchingItem=cartItem;
        }
    });
    if(metchingItem){
        metchingItem.quentity +=1;
    }else{ 
        cart.push({
            productId:productId,
            quentity:1,
            deliveryOptionId:'2'
        });
    }
    saveToStroage();
  }

  // product delete in cart
  export function removeFromCart(productId){
    const newCart =[];

    cart.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem)
        }
    });
    cart=newCart;
    saveToStroage();
  }

  // delivery date update function
  //but unfortunatly it's not work delivery option undefind 
  export function updateDeliveryOption(productId, deliveryOptionId){
    let metchingItem;
    cart.forEach((cartItem) =>{
        if(productId === cartItem.productId){
            metchingItem=cartItem;
        }
    });
    metchingItem.deliveryOptionId =deliveryOptionId;
    
    saveToStroage();
  }