import re
import json

with open('E:/Shlok Enterprises/products.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the productGrid div content
match = re.search(r'<div class="grid-4" id="productGrid">(.*?)</div>\s*</div>\s*</section>', content, re.DOTALL)
if match:
    grid_content = match.group(1)
    
    # Extract product details
    products = []
    card_pattern = re.compile(r'<div class="card product-item[^"]*" data-category="([^"]*)">.*?<img src="([^"]*)" alt="[^"]*">.*?<h3>(.*?)</h3>.*?<p>(.*?)</p>.*?<span class="price">(.*?)</span>.*?data-price="([^"]*)"', re.DOTALL)
    
    for m in card_pattern.finditer(grid_content):
        cat = m.group(1).strip().lower()
        img = m.group(2).strip()
        title = m.group(3).strip()
        desc = m.group(4).strip()
        price_text = m.group(5).strip()
        price_val = m.group(6).strip()
        id_str = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
        
        products.append({
            'id': id_str,
            'category': cat,
            'image': img,
            'title': title,
            'description': desc,
            'priceText': price_text,
            'priceValue': price_val
        })
        
    js_content = 'const productsData = ' + json.dumps(products, indent=4) + ';\n'
    with open('E:/Shlok Enterprises/js/productsData.js', 'w', encoding='utf-8') as out:
        out.write(js_content)
    print('Generated js/productsData.js with', len(products), 'products.')
else:
    print('Could not find productGrid content.')
