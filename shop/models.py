from django.db import models

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