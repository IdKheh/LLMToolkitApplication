from LLMToolkit.Proficiency import ARI, colemanLiau, daleChall, fleschKincaid, gradeLevelFleschKincaid, forcast, \
    fryFormula, gunningFog, linearWhite, raygorEstimate, readabilitySMOG, easierSMOG, spracheOriginalFormula, \
    spracheRevisedFormula


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
                self.__value = linearWhite(text)
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
            case '':
                print("")
            case '':
                print("")
            case '':
                print("")
            case '':
                print("")
            case '':
                print("")
            case _:
                raise Exception(f"Unknown method '{self.__nameMethod}'")

        return self.__value
