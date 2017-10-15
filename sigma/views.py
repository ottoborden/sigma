# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.contrib.auth.models import User
from django.views.generic.base import TemplateView
import json
from django.core.serializers import serialize

class IndexView(TemplateView):

    template_name = "app/index.html"

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        is_authed = self.request.user.is_authenticated()
        payload = {
        	'isAuthenticated': is_authed,
        }
        if is_authed:
        	payload['user'] = User.objects.get(id=self.request.user.id)

        context['data'] = payload
        return context
