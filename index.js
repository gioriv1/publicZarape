 const btnLogin = document.getElementById("btnLogin");
 const username = document.getElementById("username");
 const password = document.getElementById("password");

 const user = "admin";
 const user_password = "admin";

 btnLogin.addEventListener('click',(event)=>{
    event.preventDefault();
    if(username.value === user && password.value === user_password){
        window.location = "./modulos/menu.html";
    };
 });