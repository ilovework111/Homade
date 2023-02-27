<script lang="ts">
  import Cookies from 'js-cookie';
  var val = 0;
  var val2 = 0;
  function print(){
    const cart = Cookies.get('cart');
    if (cart != undefined){
      console.log(JSON.parse(cart));
    }
  }
  function addItem(id: number, quantity: number){
    const cart = JSON.parse(Cookies.get('cart') || '{}');
    const newEntry = {
      ["item"+id.toString()]: quantity
    };
    const newCart = {
      ...cart, 
      ...newEntry
    };
    Cookies.set('cart', JSON.stringify(newCart), {expires: 7})
  }
  function clear(){
    Cookies.set('cart', '{}')
  }
</script>
<head>
  <title>Test prod</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <h1>test</h1>
  <input type="number" bind:value={val}/>
  <input type="number" bind:value={val2}/>
  <button on:click={() => addItem(val2, val)}>в корзину</button>
  <button on:click={print}>print</button>
  <button on:click={clear}>очистить корзину</button>
</body>
<style>
  h1 {
    font-weight: 900;
    font-size: 48;
    padding-left: 20px;
  }
  input {
    width: 30px;
  }
</style>