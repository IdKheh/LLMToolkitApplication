import requests
import time


def requestServer(API_URL,headers,input):
    max_retries = 15
    retry_delay = 10  # seconds
    for attempt in range(max_retries):
        response = requests.post(API_URL, headers=headers, json={"inputs": input})
        result = response.json()
        if response.status_code == 503 and "estimated_time" in result:
            print(f"Model is loading, retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)
        else:
            return result
            
            
def modelCaller(modelName: str, thema: str):
    headers = {"Authorization": f"Bearer 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"}
    if modelName == "I don't use models":
        return thema
    
    elif modelName =="HuggingFaceTB SmolLM-135M":
        API_URL = "https://api-inference.huggingface.co/models/HuggingFaceTB/SmolLM-135M"
        print(requestServer(API_URL,headers,thema))
        
    elif modelName =="MaziyarPanahi BioMistral-7B-GGUF":
        API_URL = "https://api-inference.huggingface.co/models/MaziyarPanahi/BioMistral-7B-GGUF"
        print(requestServer(API_URL,headers,thema))
        
    elif modelName =="Meta-llama Llama-Guard-3-1B": # potrzebuje więcej czasu
        API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-Guard-3-1B"
        print(requestServer(API_URL,headers,thema))
        
    elif modelName =="TinyLlama TinyLlama-1.1B-Chat-v1.0":
        API_URL = "https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0"
        print(requestServer(API_URL,headers,thema))
        
    elif modelName =="stanford-crfm music-large-800k": # potrzebuje więcej czasu
        API_URL = "https://api-inference.huggingface.co/models/stanford-crfm/music-large-800k"
        print(requestServer(API_URL,headers,thema))
        
    elif modelName =="xai-org grok-1":
        API_URL = "https://api-inference.huggingface.co/models/xai-org/grok-1"
        print(requestServer(API_URL,headers,thema))

        
    elif modelName =="AIDC-AI Ovis1.6-Gemma2-9B-GPTQ-Int4": # potrzebuje więcej czasu
        API_URL = "https://api-inference.huggingface.co/models/AIDC-AI/Ovis1.6-Gemma2-9B-GPTQ-Int4"
        print(requestServer(API_URL,headers,thema))
        
    elif modelName =="h2oai h2ovl-mississippi-2b":
        API_URL = "https://api-inference.huggingface.co/models/h2oai/h2ovl-mississippi-2b"
        print(requestServer(API_URL,headers,thema))        
    else: 
        raise Exception(f"Unsupported model '{modelName}'")
        
    
    return '''"Childhood is a magical time filled with wonder, curiosity, and endless imagination. It’s the stage of "
            "life where every day feels like a new adventure, and the simplest things—like chasing butterflies or "
            "building forts—can bring immense joy. Friendships formed during childhood are often pure and carefree, "
            "bound by shared laughter and playful moments. It's a time of learning, not just through books, "
            "but through experiences like climbing trees, riding bikes, or asking countless questions about the "
            "world. Childhood is also when we start to form our first dreams, with imaginations running wild, "
            "envisioning all that we might one day become. The innocence of childhood allows us to see the world "
            "through a lens of possibility, before the weight of responsibilities and challenges of adulthood set "
            "in. These early years shape who we are, laying the foundation for the adults we’ll eventually grow "
            "into."'''
