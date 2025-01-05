from backend.MethodsImport import MethodResult
import requests
import time
import os
from transformers import AutoModelForCausalLM, AutoTokenizer


class ModelResult:
    def __init__(self, name: str, text: str, reference: str):
        self.nameModel = name
        self.listOfMethods = []
        self.textThema = text
        self.textTranslation = reference
        self.__response = ""


    def generateResponse(self):
        if self.nameModel == "I don't use models":
            self.__response = self.textThema
    
        elif self.nameModel =="GPT-2":
            tokenizer = AutoTokenizer.from_pretrained("gpt2")
            model = AutoModelForCausalLM.from_pretrained("gpt2")
            if tokenizer.pad_token is None:
                tokenizer.pad_token = tokenizer.eos_token
                
            inputs = tokenizer(self.textThema, return_tensors="pt", padding=True)
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
            self.__response = tokenizer.decode(output[0], skip_special_tokens=True)
            
        elif self.nameModel =="Llama-3.2-3B-Instruct":
            self.__response = self.__requestServer("meta-llama/Llama-3.2-3B-Instruct")
            
        elif self.nameModel =="Llama-3.2-1B-Instruct":
            self.__response = self.__requestServer("meta-llama/Llama-3.2-1B-Instruct")
        
        elif self.nameModel =="T5":
            self.__response = self.__requestServer("google-t5/t5-base")                
        else: 
            raise Exception(f"Unsupported model '{self.nameModel}'")
        

    def getResponse(self):
        return self.__response
    

    def addMethod(self, methodResult: MethodResult):
        self.listOfMethods.append(methodResult)
        

    def to_dict(self):
        return {
            "nameModel": self.nameModel,
            "modelResponse": self.getResponse(),
            "methodsResult": [method.to_dict() for method in self.listOfMethods]
        }
        

    def getResultsOfMethods(self):
        for method in self.listOfMethods:
            method.execute(self.__response, self.textTranslation)

            
            
    def __requestServer(self,modelName):
        API_URL = "https://api-inference.huggingface.co/models/"+modelName
        headers = {
                "Authorization": f"Bearer {self.__getToken()}",
                "Content-Type": "application/json",
                }
        data = {
                "inputs": self.textThema,
                "parameters": {
                    "max_new_tokens": 150,
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "top_k": 50,
                    "repetition_penalty": 1.2,
                }
            }
        for attempt in range(15):
            try:
                response = requests.post(API_URL, headers=headers, json=data)
                result = response.json()
                
                if response.status_code == 503 and "estimated_time" in result:
                    estimated_time = result.get("estimated_time", 10)
                    print(f"Model is loading, retrying in {estimated_time} seconds... (Attempt {attempt+1}/15)")
                    time.sleep(estimated_time+1)
                else:
                    text = result[0]['generated_text']
                    return '\n'.join(text[1:])
            except Exception as e:
                raise Exception(f"Request failed: {e}")
                
        raise Exception(f"Max retries reached. Model could not load.")
    
    
    def __getToken(self):
        if os.path.exists("secret.txt"):
            with open("secret.txt", "r") as file:
                return file.readline().strip()
        else:
            raise Exception("Access token to Hugging Face don't found. Please generate it and paste into secret.txt.")
