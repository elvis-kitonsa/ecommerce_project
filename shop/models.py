from django.db import models

# Create your models here.
# Each model representing a product in an online shop
# Each product has a name, description, price, image URL, category, and creation timestamp
# Products are ordered by creation date in descending order (newest first)
# The image_url field includes help text to guide users to provide a professional image link

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(max_length=500, help_text="Link to a professional product image")
    category = models.CharField(max_length=100, default='Electronics')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at'] # The '-' means "Descending" (Newest First)

    def __str__(self):
        return self.name