function login(){
    console.log(" 1 logging in ....");
     setTimeout(() => {
        console.log(" 2 login success");
    
     }, 5000)
}
function getuser(){
    console.log(" 3 getting user ....");
    setTimeout(() => {
        console.log("4 user fetched");
        
    }, 2000)
}
function getorder(){
    console.log(" 5 getting order ....");
    setTimeout(() => {
        console.log(" 6 order fetched");
        
    }, 1000)
}
function getorderdetails(){
    console.log(" 7 getting order details ....");
    setTimeout(() => {
        console.log(" 8 order details fetched");
    }, 3000)
}

login();
getuser();
getorder();
getorderdetails();