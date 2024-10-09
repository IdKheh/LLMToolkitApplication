from .MethodCaller import *


class MethodResult:
    def __init__(self, name):
        self.nameMethod = name
        self.value = 0

    def to_dict(self):
        return {
            "nameMethod": self.nameMethod,
            "value": self.value
        }
    def execute(self,text):
        self.value = methodCaller(self.nameMethod, text)
