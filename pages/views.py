from django.shortcuts import render

# Create your views here.

def view_index(request):
    context = {}
    return render(request, 'views/index.html', context)
