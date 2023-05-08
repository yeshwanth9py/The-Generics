var removecartitem = document.querySelectorAll(".btn-danger");
var cartrow = document.querySelector(".cart-items");
var carttotalp = document.querySelector(".cart-total-price");
var carttitle = [];


document.querySelector(".cart-items").innerHTML = '';
document.querySelector(".cart-total-price").innerHTML = "0Rs";
var tot = 0;


Array.from(document.querySelectorAll(".shop-item-button")).forEach((v)=>{
    v.addEventListener('click',(e)=>{
        const img = v.parentElement.parentElement.querySelector(".img");
        const title = v.parentElement.parentElement.querySelector("span").innerHTML;
        const price = v.parentElement.parentElement.querySelectorAll("span")[1].innerHTML;
        alert("added to cart");
        addtocart(img.src,title,price);
    });
});

function addtocart(src,title,price){
    if(carttitle.includes(title)){
        alert("Your have already already this item to the cart!");
        return
    }
    carttitle.push(title);
    var cartt = document.createElement("div");
    cartt.classList.add("cart-row");
    cartt.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${src}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartrow.appendChild(cartt);
    removebtn(cartt.querySelector(".btn-danger"));
    updateinput();
    updateprice();
};

function updateinput(){
    Array.from(document.querySelectorAll("input")).forEach(function(v){
        v.addEventListener('change',()=>{
            if (v.value<1){
                v.value = 1;
                return
            }
            updateprice();
        })
    });
}

    

function updateprice(){
    tot = 0;
    Array.from(document.querySelector(".cart-items").children).forEach((e)=>{
        tot += parseInt(e.querySelector(".cart-price").innerHTML.slice(0,-2))*(e.querySelector(".cart-quantity-input").value)//+"Rs");  
        /*or we can replace("rs","") instead of slice*/
    });
    document.querySelector(".cart-total-price").innerHTML = tot+"Rs";
};

function removebtn(e){
    e.addEventListener('click',()=>{
        e.parentElement.parentElement.remove();
        updateprice();
    })
}



document.querySelector(".btn-purchase").addEventListener('click',()=>{
    if(document.querySelector(".cart-items").innerHTML == ''){
        alert("First add some items bruhhh...");
    }else {
        alert(`Thankyou very much for the purchase,now pay me ${tot}Rs`);
        document.querySelector(".cart-items").innerHTML = '';
        document.querySelector(".cart-total-price").innerHTML = "0Rs";
    }
});
