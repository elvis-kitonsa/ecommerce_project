from django.shortcuts import render
from .models import Product
from django.db.models import Q # This allows searching multiple fields

# Create your views here.
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