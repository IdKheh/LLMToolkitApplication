from LLMToolkit.Proficiency import ARI, colemanLiau, daleChall, fleschKincaid, gradeLevelFleschKincaid, forcast, \
    fryFormula, gunningFog, linsearWrite, raygorEstimate, readabilitySMOG, easierSMOG, spracheOriginalFormula, \
    spracheRevisedFormula
from LLMToolkit.Grammar import getPartOfSpeechTagging, getGER, getGERIKorektor, checkSpelling, getLanguageConfidenceValue
# from LLMToolkit.Translation import  Bleu, Meteor, Rogue

class MethodResult:
    def __init__(self, name):
        self.__nameMethod = name
        self.__value = 0

    def to_dict(self):
        return {
            "nameMethod": self.__nameMethod,
            "value": self.__value
        }

    def execute(self, text):
        match self.__nameMethod:
            # Proficiency
            case 'Automated Readability Index':
                self.__value = ARI(text)
            case 'Coleman-Liau':
                self.__value = colemanLiau(text)
            case 'Dale-Chall':
                self.__value = daleChall(text)
            case 'Flesch-Kincaid':
                self.__value = fleschKincaid(text)
            case 'Flesch-Kincaid Grade':
                self.__value = gradeLevelFleschKincaid(text)
            case 'FORCAST':
                self.__value = forcast(text)
            case 'Fry Formula':
                self.__value = fryFormula(text)
            case 'Gunning Fog':
                self.__value = gunningFog(text)
            case 'Linsear Write':
                self.__value = linsearWrite(text)
            case 'Raygor Estimate':
                self.__value = raygorEstimate(text)
            case 'SMOG':
                self.__value = readabilitySMOG(text)
            case 'SMOG Easier':
                self.__value = easierSMOG(text)
            case 'Sprache Formula Original':
                self.__value = spracheOriginalFormula(text)
            case 'Sprache Formula Revised':
                self.__value = spracheRevisedFormula(text)

            # Grammar
            case 'Part of Speech Tagging':
                self.__value = getPartOfSpeechTagging(text)
            case 'Grammar check using LanguageTool':
                self.__value = getGER(text)

            
            # # Translation
            # case 'BLEU':
            #     self.__value = Bleu(reference, text)
            # case 'ROUGE':
            #     self.__value = Rogue(reference, text)
            # case 'METEOR':
            #     self.__value = Meteor(reference, text)

            case 'Grammar check using IKorektor':
                self.__value = getGERIKorektor(text)
            case 'Spelling Checker':
                self.__value = checkSpelling(text)
            case 'Language Detection':
                self.__value = getLanguageConfidenceValue(text, 3)
            case _:
                raise Exception(f"Unknown method '{self.__nameMethod}'")
        return self.__value
