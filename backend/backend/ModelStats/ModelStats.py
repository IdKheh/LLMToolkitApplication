import pandas as pd
import requests
import json
import seaborn as sns
import plotly.express as px
import matplotlib.pyplot as plt
import langcodes
import re
import humanize


class ModelStats:
    def __init__(self, modelName):
        self.modelName = modelName
        self.modelData = pd.json_normalize(data=self.fetch_data())
        self.preprocessedData = self.preprocess_data()
        self.modelCardData = json.dumps(self.model_card())
        self.top10Data = self.preprocess_top_10_average()
        self.sameFamily = self.preprocess_same_family()
        self.similarPerformance = self.preprocess_smilar_performance()
        self.modelRow = self.model_row()
        self.modelsList = self.models_list()
        self.isThereModel = bool

    def fetch_data(self):
        api_token = "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"
        url = f"https://huggingface.co/api/models/{self.modelName}"
        headers = {
            "Authorization": f"Bearer {api_token}"
        }
        response = requests.get(url,headers=headers)

        if response.status_code == 200:
            self.isThereModel = True
            return response.json()
        elif response.status_code == 404:
            self.isThereModel = False
            return response.json()
        else:
            raise Exception(f"Failed to fetch the data for model {self.modelName}")
    
    
    
    def preprocess_data(self):
        df = pd.read_parquet("hf://datasets/open-llm-leaderboard/contents/data/train-00000-of-00001.parquet") 
        wanted_cols = ['fullname','#Params (B)','Type','Average ⬆️','IFEval Raw','IFEval','BBH Raw','BBH','MATH Lvl 5 Raw','MATH Lvl 5','GPQA Raw','GPQA','MUSR Raw','MUSR','MMLU-PRO Raw','MMLU-PRO','Architecture','Submission Date','Base Model'] #Name + evals to take + model type + average + params
        data = df[wanted_cols]
        try:
            return data
        except:
            raise Exception("Something went wrong with the leaderboard files")
    
    def models_list(self):
        data = self.preprocessedData['fullname']
        return data.to_json(orient='records')
        
    def model_card(self):
        if self.isThereModel:
            model_row = self.preprocessedData[self.preprocessedData['fullname'] == self.modelName]
            
            usage = self.modelData.get('pipeline_tag', pd.Series(["N/A"])).iloc[0]
            usage_formatted = usage.replace('-', ' ').title() if usage != "N/A" else "N/A"
            
            params = self.modelData.get('safetensors.total', pd.Series(["N/A"])).iloc[0]
            params_formatted = humanize.intword(params) if params != "N/A" else "N/A"
            
            model_card_data = {
                "Name": self.modelData.get('id', pd.Series(["N/A"])).iloc[0].split('/')[1] if 'id' in self.modelData else "N/A",
                "Author": self.modelData.get('author', pd.Series(["N/A"])).iloc[0],
                "Parameters": params_formatted,
                "Usage": usage_formatted,
                "Technology used": self.modelData.get('tags', pd.Series([["N/A"]])).iloc[0][0].title() if len(self.modelData.get('tags', pd.Series([["N/A"]])).iloc[0]) > 0 else "N/A",
                "Language": self.model_language_extract(self.modelData.get('tags', pd.Series([["N/A"]]))),
                "Leaderboard average": model_row['Average ⬆️'].iloc[0].round(2) if not model_row.empty else "N/A"
            }
            return model_card_data
        else:
            return "NoModel"
    def model_row(self):
        modelRow = self.preprocessedData[self.preprocessedData['fullname']==self.modelName]
        benchmark_columns = ['fullname','Average ⬆️', 'IFEval', 'BBH', 'MATH Lvl 5', 'GPQA', 'MUSR', 'MMLU-PRO']
        modelRow = modelRow[benchmark_columns]
        return modelRow.to_json(orient='records')
    
    def model_language_extract(self,tags):
        for tag in tags:
             for i in range(len(tag)): 
                 if re.match(r'^[a-z]{2}$', str(tag[i])):  
                    if langcodes.Language.get(str(tag[i])).display_name() != f"Unknown language [{str(tag[i])}]":
                        return langcodes.Language.get(str(tag[i])).display_name()
        return "N/A"

    def preprocess_top_10_average(self): #based on average
        top_10_models = self.preprocessedData.sort_values(by='Average ⬆️',ascending=False).head(7)
        #if chosen model not in the top 10
        if self.modelName not in top_10_models['fullname'].values:
            chosen_model_data = self.preprocessedData[self.preprocessedData['fullname'] == self.modelName]
            chosen_model_data = chosen_model_data.iloc[0:1]
            top_10_models = pd.concat([top_10_models,chosen_model_data])
        benchmark_columns = ['fullname','Average ⬆️', 'IFEval', 'BBH', 'MATH Lvl 5', 'GPQA', 'MUSR', 'MMLU-PRO']
        top_10_models = top_10_models[benchmark_columns]
        if len(top_10_models) > 8:
            top_10_models = top_10_models.iloc[-8:]
        return top_10_models.to_json(orient='records') 
        
    
    def preprocess_best_in_class(self,benchmark="Average"): #based benchmark performance
        best_in_class =  self.preprocessedData.sort_values(by=benchmark,ascending=False).head(8)
        #if chosen model not in the top 10
        if self.modelName not in best_in_class['fullname'].values:
            chosen_model_data = self.preprocessedData[self.preprocessedData['fullname'] == self.modelName].iloc[0]
            best_in_class = pd.concat([best_in_class,chosen_model_data])
        benchmark_columns = ['fullname', 'Average ⬆️','IFEval', 'BBH', 'MATH Lvl 5', 'GPQA', 'MUSR', 'MMLU-PRO']
        best_in_class = best_in_class[benchmark_columns]
        if len(best_in_class) > 8:
            best_in_class = best_in_class.iloc[-8:]
        return best_in_class.to_json(orient='records')  

    def preprocess_same_family(self):
        modefl_family = self.modelName.split('/')[0]
        chosen_model_df = self.preprocessedData[self.preprocessedData['fullname'] == self.modelName]
        modefl_family_df = self.preprocessedData[self.preprocessedData['fullname'].apply(lambda x: x.split('/')[0]) == modefl_family]
        modefl_family_df =  modefl_family_df.sort_values(by='Average ⬆️',ascending=False).head(8)
        benchmark_columns = ['fullname','Average ⬆️','IFEval', 'BBH', 'MATH Lvl 5', 'GPQA', 'MUSR', 'MMLU-PRO']
        if len(modefl_family_df) > 8:
            modefl_family_df = modefl_family_df.iloc[-8:]
        if modefl_family_df[modefl_family_df['fullname'] == self.modelName].shape[0] > 1:
            modefl_family_df = modefl_family_df.drop(modefl_family_df[modefl_family_df['fullname'] == self.modelName].index[1:])
        if self.modelName not in modefl_family_df['fullname'].values:
            modefl_family_df = modefl_family_df.iloc[-7:]
            modefl_family_df = pd.concat([modefl_family_df,chosen_model_df])
        modefl_family_df = modefl_family_df[benchmark_columns]
        return modefl_family_df.to_json(orient='records') 




    def preprocess_smilar_performance(self,threshold=0.5): #based on average, threshold +-5 
        chosen_model_df = self.preprocessedData[self.preprocessedData['fullname'] == self.modelName]
        if chosen_model_df.empty:
            raise ValueError(f"Chosen model: {self.modelName} not found in the dataset")
        chosen_model_avg = chosen_model_df['Average ⬆️'].iloc[0]
        lower = chosen_model_avg - threshold
        upper = chosen_model_avg + threshold
        similar_perform = self.preprocessedData[(self.preprocessedData['Average ⬆️']>=lower) & (self.preprocessedData['Average ⬆️']<=upper)]
        benchmark_columns = ['fullname','Average ⬆️', 'IFEval', 'BBH', 'MATH Lvl 5', 'GPQA', 'MUSR', 'MMLU-PRO']
        similar_perform = similar_perform.sort_values(by='Average ⬆️',ascending=False).head(8)
        if self.modelName not in similar_perform['fullname'].values:
            chosen_model_df = chosen_model_df.iloc[0:1] 
            similar_perform = pd.concat([similar_perform,chosen_model_df])
        if len(similar_perform) > 8:
            similar_perform = similar_perform.iloc[-8:]
        similar_perform = similar_perform[benchmark_columns]
        return similar_perform.to_json(orient='records')
    







