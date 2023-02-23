<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  var email = '';
  var password = '';
  var loginError = writable('pass');

  onMount(() => {
    loginError.subscribe((value) => {
      const emailStyle = document.getElementById('email');
      const passStyle = document.getElementById('password');
      if (passStyle && emailStyle && (value != 'pass')){
        if (value === 'nonexist'){
          emailStyle.style.border = '3px solid crimson';
        }
        if (value === 'noaccess'){
          passStyle.style.border = '3px solid crimson';
        }
      }
    });
  });

  async function handleSubmit() {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }); 
    switch (response.status){
      case 200:
        console.log('succesful login');
        window.location.href = "/";
        break;
      case 403:
        loginError.set('noaccess');
        break;
      case 404:
        loginError.set('nonexist');
        break;
    }
  }
</script>

<head> 
    <title>Log In</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form on:submit|preventDefault={handleSubmit}>
        <h3>Log In</h3>
        <label for="email">Email</label>
        <input type="email" bind:value={email} placeholder="Email" id="email" required>

        <label for="password">Password</label>
        <input type="password" bind:value={password} placeholder="Password" id="password" required>

        <button>Log In</button>
    </form>
</body>

<style>
  *,
  *:before,
  *:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    background-color: #080710;
  }
  .background{
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
  }
  .background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  .shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
  }
  .shape:last-child{
    background: linear-gradient(
      to right,
      #ff512f,
      #f09819
    );
    right: -80px;
    bottom: -80px;
  }
  form{
    height: 470px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
  }
  form *{
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 5px;
    padding: 0 17px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
  }
  ::placeholder{
    color: #e5e5e5;
  }
  button{
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    .background{
      width: 40px;
      height: 520px;
    }
      .background .shape{
      height: 200px;
      width: 200px;
      position: absolute;
      border-radius: 50%;
    }
    .shape:first-child{
      background: linear-gradient(
          #1845ad,
          #23a2f6
      );
      left: -80px;
      top: -80px;
    }
    .shape:last-child{
      background: linear-gradient(
        to right,
        #ff512f,
        #f09819
      );
      right: -80px;
      bottom: -80px;
    }
    form{
      height: 470px;
      width: 95%;
    } 
  }
</style>