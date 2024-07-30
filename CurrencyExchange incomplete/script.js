const promise =fetch( `https://v6.exchangerate-api.com/v6/6e4ba8b16098725093b3306e/latest/USD`);
promise.then(response=>response.json())
.then((data)=>{
    console.log(data)
})
 
