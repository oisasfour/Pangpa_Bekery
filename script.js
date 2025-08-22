// โหลดตะกร้าจาก localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// เพิ่มสินค้า
function addToCart(btn) {
  let product = btn.parentElement;
  let id = product.getAttribute("data-id");
  let name = product.getAttribute("data-name");
  let price = parseInt(product.getAttribute("data-price"));

  let item = cart.find(i => i.id === id);
  if(item){
    item.qty++;
  } else {
    cart.push({id, name, price, qty:1});
  }

  saveCart();
  updateCart(); // ✅ เพิ่มบรรทัดนี้
  alert(name + " ถูกเพิ่มลงตะกร้าแล้ว");
}

// บันทึกตะกร้า
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

// แสดงตะกร้า
function updateCart(){
  let cartItems = document.getElementById("cart-items");
  if(!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <p>${item.name} x ${item.qty} = ${item.price*item.qty} บาท
      <button onclick="removeItem('${item.id}')">ลบ</button></p>
    `;
  });

  document.getElementById("cart-total").innerText = "รวม: " + total + " บาท";
}

// ลบสินค้า
function removeItem(id){
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCart();
}

// สั่งซื้อ
function checkout(){
  if(cart.length === 0){
    alert("ยังไม่ได้เลือกสินค้า");
    return;
  }
  // ไปหน้า checkout.html
  window.location.href = "checkout.html";
}


// เรียกแสดงตะกร้าเมื่อเปิดหน้า
updateCart();
