from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.MethodsImport import MethodResult
from backend.ModelsImport import ModelResult
from backend.ModelStats import ModelStats


# to test communicate with rest:
#  http://localhost:8000/test/?modelsNLP=[gpt,bert]&methods=[x,y,z]&textThema=costam,costam


@api_view(['GET'])
def send_some_data(request):
    models = request.GET.get('modelsNLP', '').strip('[]').split(',')
    methods = request.GET.get('methods', '').strip('[]').split(',')
    textThema = request.GET.get('textThema', '')
    textTranslation = request.GET.get('textTranslation', '')
    print(textTranslation)

    translation_models = ['BLEU','ROGUE','METEOR']

    models = [model.strip() for model in models if model.strip()]
    methods = [method.strip() for method in methods if method.strip()]

    if not models:
        return Response({"error": "Error: You don't choose any LLM."}, status=400)
    
    if not methods:
        return Response({"error": "Error: You don't choose any method."}, status=400)
    
    if len(textThema)<10:
        return Response({"error": "Error: The thema of request is to shorter than 10 chars. Please add some information."}, status=400)

    modelResultList = []
    for model in models:
        
        if model in translation_models:
            return Response({"message": "Error: Empty textTranslation"}, status=400)
        
        try:
            modelResult = ModelResult(name=model, text=textThema, reference=textTranslation)
            modelResult.generateResponse()
            for method in methods:
                modelResult.listOfMethods.append(MethodResult(name=method))
            modelResultList.append(modelResult)
        except Exception as err:
            print(str(err))
            return Response({"error": str(err)}, status=400)

    responseData = []
    for modelResult in modelResultList:
        try:
            modelResult.getResultsOfMethods()
            responseData.append(modelResult.to_dict())
        except Exception as err:
            print(str(err))
            return Response({"error": str(err)}, status=400)

    return Response({"message": responseData})

@api_view(['GET'])
def get_model_data(request):
    model_name = request.GET.get('modelName', '')
    benchmarks = ["IFEval","BBH","MATH Lvl 5","GPQA","MUSR","MMLU-PRO"]
    result = []
    if not model_name:
        return Response({"error": "Model name is required"}, status=400)
    try:
        model_stats = ModelStats(modelName=model_name)
        result = {
            "modelCardData": model_stats.modelCardData,
            "top10Data": model_stats.top10Data,
            "similarPerformance": model_stats.similarPerformance,
            "sameFamily": model_stats.sameFamily,
            "modelRow" : model_stats.modelRow
        }
        return Response({"message": result})
    except Exception as e:
        return Response({"error":str(e)},status=400)
    
@api_view(['GET'])
def get_models_list(request):
    model_name = "openai-community/gpt2"
    result = []
    try: 
        model_stats = ModelStats(modelName=model_name)
        result = {
            "modelsList":model_stats.modelsList
        }
        return Response({"message": result})
    except Exception as e:
        return Response({"error":str(e)},status=400)