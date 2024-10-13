from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.MethodsImport import MethodResult
from backend.ModelsImport import ModelResult


# to test communicate with rest:
#  http://localhost:8000/test/?modelsNLP=[gpt,bert]&methods=[x,y,z]&textThema=costam,costam


@api_view(['GET'])
def send_some_data(request):
    models = request.GET.get('modelsNLP', '').strip('[]').split(',')
    methods = request.GET.get('methods', '').strip('[]').split(',')
    textThema = request.GET.get('textThema', '')

    models = [model.strip() for model in models if model.strip()]
    methods = [method.strip() for method in methods if method.strip()]

    if not models:
        return Response({"message": "Error: Empty modelsNLP"})

    modelResultList = []
    for model in models:
        modelResult = ModelResult(name=model, text=textThema)
        modelResult.generateResponse()
        for method in methods:
            modelResult.listOfMethods.append(MethodResult(name=method))
        modelResultList.append(modelResult)

    responseData = []
    for modelResult in modelResultList:
        try:
            modelResult.getResultsOfMethods()
            responseData.append(modelResult.to_dict())
        except Exception as err:
            print(str(err))
            return Response({"message": str(err)}, status=400)

    return Response({"message": responseData})
