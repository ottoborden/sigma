"""sigma URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from django.contrib.auth import views as auth_views
from api import views as apiViews
from views import IndexView
from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register(r'users', apiViews.UserViewSet)
router.register(r'groups', apiViews.GroupViewSet)

urlpatterns = [
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^login', auth_views.login, name='login'),
    url(r'^logout', auth_views.logout, name='logout'),
	url(r'^api/v1/', include(router.urls)),

    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
