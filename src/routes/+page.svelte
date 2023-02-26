<script lang="ts">
  import Cookies from 'js-cookie';
  var val = 0;
  interface Cart {
    [productId: number]: number;
  }

  function getCart(): Cart {
    const cartCookie = Cookies.get('cart');
    if (cartCookie) {
      const cart: Cart = {};
      const cartArray = cartCookie.split(',');
      for (let item of cartArray) {
        const [productIdString, quantityString] = item.split(':');
        const productId = parseInt(productIdString);
        const quantity = parseInt(quantityString);
        if (!isNaN(productId) && !isNaN(quantity)) {
          cart[productId] = quantity;
        }
      }
      return cart;
    }
    return {};
  }

  function addToCart(productId: number) {
    const cart: Cart = getCart();
    cart[productId] = (cart[productId] || 0) + 1;
    const cartArray = Object.entries(cart).map(([productId, quantity]) => `${productId}:${quantity}`);
    Cookies.set('cart', cartArray.join(','), { expires: 7 });
  }

  function removeFromCart(productId: number) {
    const cart: Cart = getCart();
    if (cart[productId]) {
      cart[productId] -= 1;
      if (cart[productId] === 0) {
        delete cart[productId];
      }
      const cartArray = Object.entries(cart).map(([productId, quantity]) => `${productId}:${quantity}`);
      Cookies.set('cart', cartArray.join(','), { expires: 7 });
    }
  }

  addToCart(123); 
  function print(){
    console.log(getCart());
  }

</script>
<head>
  <title>Sign Up</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
</head>
<h1>test</h1>
<input type="number" bind:value={val}/>
<button on:click={() => addToCart(val)}>write</button>
<button on:click={print}>print</button>
<style>
  h1 {
    font-weight: 700;
    font-size: 32;
  }
</style>