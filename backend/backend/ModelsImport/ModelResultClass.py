from backend.MethodsImport import MethodResult


class ModelResult:
    def __init__(self, name: str):
        self.nameModel = name
        self.listOfMethods = []

    def addMethod(self, methodResult: MethodResult):
        self.listOfMethods.append(methodResult)

    def to_dict(self):
        return {
            "nameModel": self.nameModel,
            "methodsResult": [method.to_dict() for method in self.listOfMethods]
        }

    def getResultsOfMethods(self, text: str):
        for method in self.listOfMethods:
            method.execute(text)
