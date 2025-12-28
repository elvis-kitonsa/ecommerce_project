from django.shortcuts import render
from .models import Product
from django.db.models import Q # This allows searching multiple fields

# Create your views here.
# This file is the controller in the MVC pattern.
# It fetches data (like your list of Tech Products) from the database and sends it to the HTML templates.
# It defines functions like product_list(request) and cart(request) which return the render() function to display your pages.

# View for listing products with search functionality.
# Users can search products by name or description using a query parameter 'q'.
# If no search query is provided, all products are displayed.
def product_list(request):
    query = request.GET.get('q') # Get what the user typed in the search box
    
    if query:
        # Filter products by name OR description
        products = Product.objects.filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        )
    else:
        products = Product.objects.all()
        
    return render(request, 'shop/product_list.html', {'products': products, 'query': query})

# View for the shopping cart.
# Displays the dynamic shopping cart populated by LocalStorage.
def cart_view(request):
    return render(request, 'shop/cart.html')