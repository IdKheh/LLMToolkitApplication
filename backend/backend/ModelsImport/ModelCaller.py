import requests
import time
from transformers import AutoModelForCausalLM, AutoTokenizer


def requestServer(API_URL, headers, input):
    for attempt in range(15):
        try:
            response = requests.post(API_URL, headers=headers, json=input)
            result = response.json()
            
            if response.status_code == 503 and "estimated_time" in result:
                estimated_time = result.get("estimated_time", 10)
                print(f"Model is loading, retrying in {estimated_time} seconds... (Attempt {attempt+1}/15)")
                time.sleep(estimated_time+1)
            else:
                return result
        except Exception as e:
            raise Exception(f"Request failed: {e}")
            
    raise Exception(f"Max retries reached. Model could not load.")

            
def getToken():
    with open("secret.txt", "r") as file:
        return file.readline().strip()
    
    
    
def modelCaller(modelName: str, thema: str):
    if modelName == "I don't use models":
        return thema
    
    elif modelName =="GPT-2":
        tokenizer = AutoTokenizer.from_pretrained("gpt2")
        model = AutoModelForCausalLM.from_pretrained("gpt2")
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token
            
        inputs = tokenizer(thema, return_tensors="pt", padding=True)
        output = model.generate(
            inputs["input_ids"], 
            attention_mask=inputs["attention_mask"],
            pad_token_id=tokenizer.pad_token_id,
            max_length=250,
            temperature=0.7, 
            top_p=0.9,
            top_k=50,
            repetition_penalty=1.2,
            no_repeat_ngram_size=2,
        )
        output = tokenizer.decode(output[0], skip_special_tokens=True)
        print(output)
        return output
        
    elif modelName =="Llama-3.2-3B-Instruct":
        API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct"
        headers = {"Authorization": f"Bearer {getToken()}"}

        data = {
            "inputs": thema,
            "parameters": {
                "max_new_tokens": 150,
                "temperature": 0.7,
                "top_p": 0.9,
                "top_k": 50,
                "repetition_penalty": 1.2,
            }
        }
        output = requestServer(API_URL,headers,data)
        print(output)
        return output    
           
    elif modelName =="Llama-3.2-1B-Instruct":
        API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct"
        headers = {
            "Authorization": f"Bearer {getToken()}",
            "Content-Type": "application/json",
            }
        

        data = {
            "inputs": thema,
            "parameters": {
                "max_new_tokens": 150,
                "temperature": 0.7,
                "top_p": 0.9,
                "top_k": 50,
                "repetition_penalty": 1.2,
            }
        }
        output = requestServer(API_URL,headers,data)
        print(output)
        return output

    
    elif modelName =="T5":
        API_URL = "https://api-inference.huggingface.co/models/google-t5/t5-base"
        headers = {"Authorization": f"Bearer {getToken()}"}

        data = {
            "inputs": thema,
            "parameters": {
                "max_new_tokens": 150,
                "temperature": 0.7,
                "top_p": 0.9,
                "top_k": 50,
                "repetition_penalty": 1.2,
            }
        }
        output = requestServer(API_URL,headers,data)
        print(output)
        return output
              
    else: 
        raise Exception(f"Unsupported model '{modelName}'")