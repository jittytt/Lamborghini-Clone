   function makepayment(){
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
     var options = {
        "key": "rzp_test_pyOyM0RD5UE7IF",
        "amount": amount*100, // Example: 2000 paise = INR 20
        "name": "LAMBORGHINI",
        "description": "description",
        "image": "../assets/logo.png",// COMPANY LOGO
        "handler": function (response) {
            console.log(response);
            alert("Order successfully placed");
            window.location.href = `addressbook.html` 
            
            // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
        },
        "prefill": {
            "name": "BOBY", // pass customer name
            "email": 'bobybenny888@gmail.com',// customer email
            "contact": '+919123456780' //customer phone no.
        },
        "notes": {
            "address": "address" //customer address 
        },
        "theme": {
            "color": "#15b8f3" // screen color
        }
    };
    console.log(options);
    var propay = new Razorpay(options);
    propay.open();
}