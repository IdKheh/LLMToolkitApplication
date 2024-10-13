from backend.MethodsImport import MethodResult
from backend.ModelsImport import modelCaller


class ModelResult:
    def __init__(self, name: str, text: str):
        self.nameModel = name
        self.listOfMethods = []
        self.textThema = text
        self.__response = "In a small, quiet village nestled between rolling hills and wildflower meadows, there lived a grandmother named Agatha, who everyone fondly called \"Granny A.\" Granny A had lived in the village for as long as anyone could remember. Her little cottage, with its ivy-covered walls and flower-filled windowsills, was always the most welcoming spot in the neighborhood. But it wasn’t the smell of her famous cinnamon buns or her colorful garden that made Granny A's home special. It was her six cats."

    def generateResponse(self):
        self.__response = modelCaller(self.nameModel, self.textThema)

    def getResponse(self):
        return self.__response

    def addMethod(self, methodResult: MethodResult):
        self.listOfMethods.append(methodResult)

    def to_dict(self):
        return {
            "nameModel": self.nameModel,
            "methodsResult": [method.to_dict() for method in self.listOfMethods]
        }

    def getResultsOfMethods(self):
        for method in self.listOfMethods:
            method.execute(self.__response)
