from PUT_Engineering_Thesis_Project.LLMToolkit.Proficiency import ARI, colemanLiau, daleChall, fleschKincaid, gradeLevelFleschKincaid, forcast, \
    fryFormula, gunningFog, linearWhite, raygorEstimate, readabilitySMOG, easierSMOG, spracheOriginalFormula, \
    spracheRevisedFormula

def methodCaller(methodName: str, text: str):
    value = 0
    match methodName:
        # Proficiency
        case 'Automated Readability Index':
            value = ARI(text)
        case 'Coleman-Liau':
            value = colemanLiau(text)
        case 'Dale-Chall':
            value = daleChall(text)
        case 'Flesch-Kincaid':
            value = fleschKincaid(text)
        case 'Flesch-Kincaid Grade':
            value = gradeLevelFleschKincaid(text)
        case 'FORCAST':
            value = forcast(text)
        case 'Fry Formula':
            value = fryFormula(text)
        case 'Gunning Fog':
            value = gunningFog(text)
        case 'Linear White':
            value = linearWhite(text)
        case 'Raygor Estimate':
            value = raygorEstimate(text)
        case 'SMOG':
            value = readabilitySMOG(text)
        case 'SMOG Easier':
            value = easierSMOG(text)
        case 'Sprache Formula Original':
            value = spracheOriginalFormula(text)
        case 'Sprache Formula Revised':
            value = spracheRevisedFormula(text)

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
            raise Exception(f"Unknown method '{methodName}'")

    return value
