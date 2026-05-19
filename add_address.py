import os, glob, re

# 1. Update all HTML files with the Delivery Address textarea in the cart
html_files = glob.glob('E:/Shlok Enterprises/*.html')
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to insert the textarea right before the .cart-total-row
    search_str = '<div class="cart-total-row">'
    replace_str = '''<div style="margin-bottom: 15px;">
                <textarea id="deliveryAddress" rows="2" placeholder="Enter your full delivery address" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid var(--border-color); font-family: inherit; font-size: 0.9rem; resize: none;"></textarea>
            </div>
            <div class="cart-total-row">'''
            
    if 'id="deliveryAddress"' not in content:
        content = content.replace(search_str, replace_str)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
# 2. Add address field to contact.html form
contact_file = 'E:/Shlok Enterprises/contact.html'
with open(contact_file, 'r', encoding='utf-8') as f:
    contact_content = f.read()

contact_search = '<div class="form-group">\n                            <select id="subject" name="subject">'
contact_replace = '''<div class="form-group">
                            <textarea id="address" name="address" rows="2" placeholder="Your Delivery / Service Address"></textarea>
                        </div>
                        <div class="form-group">
                            <select id="subject" name="subject">'''
                            
if 'id="address"' not in contact_content:
    contact_content = contact_content.replace(contact_search, contact_replace)
    with open(contact_file, 'w', encoding='utf-8') as f:
        f.write(contact_content)

# 3. Update js/script.js checkoutCart function
script_file = 'E:/Shlok Enterprises/js/script.js'
with open(script_file, 'r', encoding='utf-8') as f:
    script_content = f.read()

# We replace the body of checkoutCart
old_checkout = '''window.checkoutCart = function() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
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
    orderText += "Hello, I would like to place this order.";

    const whatsappNumber = "917821098466";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;

    window.open(whatsappURL, '_blank');
};'''

new_checkout = '''window.checkoutCart = function() {
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
};'''

script_content = script_content.replace(old_checkout, new_checkout)
with open(script_file, 'w', encoding='utf-8') as f:
    f.write(script_content)

print("Updated address fields successfully.")
