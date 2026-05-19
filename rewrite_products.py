import re

with open('E:/Shlok Enterprises/products.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the grid-4 content with empty div
new_content = re.sub(
    r'(<div class="grid-4" id="productGrid">).*?(</div>\s*</div>\s*</section>)',
    r'\1\n            </div>\n        </div>\n    </section>',
    content,
    flags=re.DOTALL
)

# Insert the script tags before closing body
script_tags = """
    <!-- Product Data -->
    <script src="js/productsData.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const productGrid = document.getElementById('productGrid');
            if (productGrid) {
                renderProducts(productsData);
            }
            
            // Handle filtering
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const category = btn.getAttribute('data-filter');
                    
                    if (category === 'all') {
                        renderProducts(productsData);
                    } else {
                        const filtered = productsData.filter(p => p.category === category);
                        renderProducts(filtered);
                    }
                });
            });

            // Handle search
            const searchInput = document.getElementById('productSearch');
            if(searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const term = e.target.value.toLowerCase();
                    const filtered = productsData.filter(p => p.title.toLowerCase().includes(term));
                    renderProducts(filtered);
                });
            }
        });

        function renderProducts(products) {
            const productGrid = document.getElementById('productGrid');
            if (!productGrid) return;
            
            productGrid.innerHTML = '';
            
            products.forEach(p => {
                const card = document.createElement('div');
                card.className = 'card product-item animate-on-scroll';
                card.setAttribute('data-category', p.category);
                
                card.innerHTML = `
                    <a href="product-detail.html?id=${p.id}" style="text-decoration: none; color: inherit; display: block;">
                        <div class="card-img" style="cursor: pointer;">
                            <img src="${p.image}" alt="${p.title}">
                        </div>
                        <div class="card-body" style="padding-bottom: 0;">
                            <h3 style="cursor: pointer; margin-bottom: 10px;">${p.title}</h3>
                            <span class="price" style="display: block; margin-bottom: 15px;">${p.priceText}</span>
                        </div>
                    </a>
                    <div class="card-body" style="padding-top: 0;">
                        <a href="#" class="btn btn-outline add-to-cart-btn" data-name="${p.title}" data-price="${p.priceValue}" data-img="${p.image}" style="width: 100%; display: block; text-align: center;">Add to Cart</a>
                    </div>
                `;
                productGrid.appendChild(card);
            });
            
            // Re-attach add-to-cart listeners for newly created elements
            if (typeof window.attachAddToCartListeners === 'function') {
                window.attachAddToCartListeners();
            } else if (typeof window.updateCart === 'function') {
                // simple fallback if function doesn't exist
                const addBtns = productGrid.querySelectorAll('.add-to-cart-btn');
                addBtns.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        if (typeof addToCart === 'function') {
                            addToCart({
                                name: this.getAttribute('data-name'),
                                price: parseFloat(this.getAttribute('data-price')),
                                img: this.getAttribute('data-img')
                            });
                        }
                    });
                });
            }
        }
    </script>
"""

# Replace the closing body tag with our scripts + closing body
new_content = new_content.replace('</body>', script_tags + '\n</body>')

with open('E:/Shlok Enterprises/products.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
