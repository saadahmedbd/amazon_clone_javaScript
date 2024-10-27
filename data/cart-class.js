class Cart {
    cartItems;
    #localStorageKey;//private method

    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if(!this.cartItems){
            this.cartItems=[{
    
    
                productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
            
                quentity:1,
                deliveryOptionId:'1'
            },{
                productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quentity:3,
                deliveryOptionId:'2'
            }];
        }
    
    };
    saveToStroage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    };

    
    addToCart(productId){
      
        let metchingItem;
        this.cartItems.forEach((cartItem) =>{
            if(productId===cartItem.productId){
                metchingItem=cartItem;
            }
        });
        if(metchingItem){
            metchingItem.quentity +=1;
        }else{ 
            this.cartItems.push({
                productId:productId,
                quentity:1,
                deliveryOptionId:'2'
            });
        }
        this.saveToStroage();
    };

    removeFromCart(productId){
        const newCart =[];
    
        this.cartItems.forEach((cartItem) =>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem)
            }
        });
        this.cartItems=newCart;
        this.saveToStroage();
    };
    updateDeliveryOption(productId, deliveryOptionId){
        let metchingItem;
        this.cartItems.forEach((cartItem) =>{
            if(productId === cartItem.productId){
                metchingItem=cartItem;
            }
        });
        metchingItem.deliveryOptionId =deliveryOptionId;
        
        this.saveToStroage();
    };

}
    




const cart =new Cart('cart-oop');
const busienssCart =new Cart('cart-busienss');


// cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
// console.log(cart); //call function 
console.log(cart);
console.log(busienssCart)








