from django.urls import path
from . import views

urlpatterns = [

    # Home page showing list of products
    path('', views.product_list, name='product_list'),

    # Product detail page
    path('cart/', views.cart_view, name='cart_view'),

    # Thank you page after successful checkout
    path('success/', views.payment_success, name='payment_success'),
]