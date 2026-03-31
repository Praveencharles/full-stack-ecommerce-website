import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from api.models import Category, Product

def populate():
    # Categories
    categories = [
        {'name': 'Electronics', 'slug': 'electronics', 'description': 'Gadgets and devices'},
        {'name': 'Clothing', 'slug': 'clothing', 'description': 'Apparel and accessories'},
        {'name': 'Home & Kitchen', 'slug': 'home-kitchen', 'description': 'Furniture and kitchenware'},
    ]
    
    cat_objs = {}
    for cat_data in categories:
        cat, created = Category.objects.get_or_create(slug=cat_data['slug'], defaults=cat_data)
        cat_objs[cat.slug] = cat

    adjectives = ['Premium', 'Classic', 'Modern', 'Sleek', 'Minimalist', 'Vintage', 'Luxury', 'Essential', 'Smart', 'Wireless']
    nouns_by_cat = {
        'electronics': ['Smartphone', 'Laptop', 'Headphones', 'Tablet', 'Smartwatch', 'Speaker', 'Monitor', 'Keyboard', 'Camera', 'Drone'],
        'clothing': ['T-Shirt', 'Jeans', 'Jacket', 'Sweater', 'Sneakers', 'Hoodie', 'Socks', 'Cap', 'Sunglasses', 'Backpack'],
        'home-kitchen': ['Coffee Maker', 'Mug', 'Blender', 'Pan', 'Knife Set', 'Toaster', 'Stand Mixer', 'Plate Set', 'Lamp', 'Vase']
    }

    # Delete existing products to replace them with 50 new ones
    Product.objects.all().delete()

    products = []
    
    # Generate 50 distinct products
    for i in range(1, 51):
        cat_slug = random.choice(list(cat_objs.keys()))
        category = cat_objs[cat_slug]
        
        adj = random.choice(adjectives)
        noun = random.choice(nouns_by_cat[cat_slug])
        name = f"{adj} {noun} Model {i}"
        slug = name.lower().replace(' ', '-')
        price = round(random.uniform(20.0, 999.00), 2)
        stock = random.randint(10, 200)
        
        # Using picsum.photos for reliable loading (via seed to keep it consistent per-product)
        image_url = f"https://picsum.photos/seed/{slug}/600/400"

        prod_data = {
            'category': category,
            'name': name,
            'slug': slug,
            'price': price,
            'stock': stock,
            'image_url': image_url,
            'description': f"This is a high quality {name}"
        }
        Product.objects.create(**prod_data)

    print("Database populated with 50 auto-generated placeholder products.")

if __name__ == '__main__':
    populate()
