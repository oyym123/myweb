from django.shortcuts import render

# coding:utf-8
from django.http import HttpResponse


def index(request):
    print('12321');
    return HttpResponse(u"asddadsasd !")
