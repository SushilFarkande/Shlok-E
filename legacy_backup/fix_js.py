import re
with open('E:/Shlok Enterprises/js/script.js', 'r', encoding='utf-8') as f:
    script_content = f.read()

pattern = re.compile(r'window\.checkoutCart\s*=\s*function\(\)\s*\{.*?\};', re.DOTALL)

new_checkout = """window.checkoutCart = function() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const addressInput = document.getElementById('deliveryAddress');
    const address = addressInput ? addressInput.value.trim() : "";
    
    if (!address) {
        alert("Please enter your delivery address before placing the order.");
        if (addressInput) addressInput.focus();
        return;
    }

    let orderText = "*NEW ORDER*\\n\\n";
    let finalTotal = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        if (item.qty >= 35) {
            itemTotal = itemTotal * 0.90; // Apply 10% discount
        }
        finalTotal += itemTotal;

        orderText += `${item.qty}x ${item.name} - ₹${itemTotal.toFixed(2)}\\n`;
    });

    orderText += `\\n*TOTAL AMOUNT: ₹${finalTotal.toFixed(2)}*\\n\\n`;
    orderText += `*Delivery Address:*\\n${address}\\n\\n`;
    orderText += "Hello, I would like to place this order.";

    const whatsappNumber = "917821098466";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;

    window.open(whatsappURL, '_blank');
};"""

script_content = pattern.sub(new_checkout, script_content)
with open('E:/Shlok Enterprises/js/script.js', 'w', encoding='utf-8') as f:
    f.write(script_content)
print('Regex update done.')
