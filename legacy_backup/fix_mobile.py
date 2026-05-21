import os, glob, re

for filepath in glob.glob('E:/Shlok Enterprises/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update viewport meta tag for strict mobile constraints
    content = re.sub(
        r'<meta name="viewport" content=".*?">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">',
        content
    )
    
    # Remove inline style="font-size: Xrem" from elements to allow CSS media queries to work
    content = re.sub(r'style="([^"]*)font-size:\s*\d+(?:\.\d+)?rem;?\s*([^"]*)"', r'style="\1\2"', content)
    
    # Remove empty style attributes
    content = content.replace(' style=""', '')
    content = content.replace(' style=" "', '')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Removed inline font sizes and updated viewports.")
