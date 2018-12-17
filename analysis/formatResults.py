import csv
import os
import time as tm
import re

from HTMLParser import HTMLParser

class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()


def makeResFile(filename):
        """
        Takes a csv file of my ELICIT IBEX results and formats it for R
        
        """
        #materials to make variables with
        fin = open(filename,'rb')
        finr = csv.reader(fin)

        fout = open(filename[:-4]+'-formatted.csv','wb')
        foutw = csv.writer(fout)

        lsSet = False
        lastWorker = ""
        rList = []
        #confs = []
        
        #Demographics (variable must match html value)
        Language = ""
        Age = ""
        Gender = ""        
        Education = ""
        Occupation = ""
        Color = ""

        order = "NA"
        orderTemp = 0

        mental = ""
        physical = ""
        temp = ""
        success = ""
        perf = ""
        stress = ""
        preference = ""

        trust1=trust2=trust3=trust4=trust5=trust6=trust7=trust8=trust9=trust10=trust11=trust12 = ""
        
        cond1 = ""
        cond = ""
        scen = ""
        qType = ""
        
        who = ""
        what = ""
        where = ""
        month = ""
        day = ""
        time = ""
        ampm = ""
        #polarity = ""
        _REACTION_TIME_ = ""
        comments = ""
        #SUS = ""
        #response = ""
        whoCorrect=whatCorrect=whereCorrect=timeCorrect=dayCorrect=monthCorrect=ampmCorrect = ""
        #headers
        foutw.writerow(["worker","language","age","gender","education","occupation","colors", "order", "qType", "cond", "scenario",   "who","whoCorrect", "what","whatCorrect", "where","whereCorrect", "month","monthCorrect", "day","dayCorrect", "time","timeCorrect", "ampm","ampmCorrect", "responseTime", "comments", "mental", "physical", "temp", "success", "perf", "stress", "preference", "trust1", "trust2", "trust3", "trust4", "trust5", "trust6", "trust7", "trust8", "trust9", "trust10", "trust11", "trust12"])#add correct/incorrect for each?
        #mental, physical, temp, success, perf, stress, preference
        for r in finr:
                writeRow=False
                #if it doesn't start with #
                if len(r)>1 and r[0][0] != "#":
                        worker=r[1]+"--"+r[0]

                        if r[7] in ["Language", "Age", "Gender", "Education", "Occupation", "Color"]:#Demographics
                            exec('{VAR} = {VALUE}'.format(VAR = r[7], VALUE = repr(r[8])))
                        elif r[7] in ["mental", "physical", "temp", "success", "perf", "stress", "preference"]: #comes at the end, though
                            exec('{VAR} = {VALUE}'.format(VAR = r[7], VALUE = repr(r[8])))
                        elif r[7] in ["1","2","3","4","5","6","7","8","9","10","11","12"]:#trust survey
                            exec('{VAR} = {VALUE}'.format(VAR = "trust"+r[7], VALUE = repr(r[8])))
                            if r[6] != "NULL":
                                cond = r[6].upper()
                        #Response data
                        elif r[7] in ["who", "what", "where", "month", "day", "time", "ampm", "_REACTION_TIME_", "comments"]: 
                            exec('{VAR} = {VALUE}'.format(VAR = r[7], VALUE = repr(r[8])))
                            if  r[7] == "_REACTION_TIME_": #"comments" or r[7] == "preference"
                               writeRow=True
                               print r[5], "RT"

                                                    
                        itemLabel = r[5].split(".")
                        if len(itemLabel)==1: # inst, afterScen, trust-pre, introTest, testing, afterScen, betweenTest, trust-post, comments
                            qType = itemLabel[0]
                            
                            if qType=="testing":
                                if len(r)>9:
                                    print qType, r[7], itemLabel
                                    scen=r[12][4:5]#"NA"
                                    cond = r[6].upper()
                                if r[7]=="_REACTION_TIME_":
                                    order = orderTemp%2 + 1
                                    orderTemp += 1
                                #elif r[5]!="training":
                                #    #blank out others...
                                #    who=what=where=month=day=time=ampm = ""
                        elif len(itemLabel)>1: # training.P/M, introTraining.P/M, end.a/b
                            order="NA"
                            cond=itemLabel[1]
                            cond1=itemLabel[1]
                            qType=itemLabel[0] #"questionnaire"
                            whoCorrect=whatCorrect=whereCorrect=timeCorrect=dayCorrect=monthCorrect=ampmCorrect = ""
                            comments=""
                        else:
                            #mental=physical=temp=success=perf=stress=preference = ""
                            order = itemLabel[0]
                            cond = itemLabel[1]
                            scen = itemLabel[2]
                            #Comments
                            if scen == "comments":
                                qType = "comments"
                                if r[7]=="_REACTION_TIME_":
                                    reactionTime = r[8]
                        if qType=="training" or qType=="testing":
                            whoCorrect = (who[-1:] == "*")
                            whatCorrect = (what[-1:] == "*")
                            whereCorrect = (where[-1:] == "*")
                            monthCorrect = (month[-1:] == "*")
                            dayCorrect = (day[-1:] == "*")
                            timeCorrect = (time[-1:] == "*")
                            ampmCorrect = (ampm[-1:] == "*")
##                                
##                            #training and test
##                            else:
##                                extComments=origComments = "NA"
##                                comments=SUS=polarity=response = ""
##                                _REACTION_TIME_ = r[12]
##                                if scen == "train":
##                                    qType = "training"
##                                else:
##                                    qType = "test"
##                                    whoCorrect = (who[-1:] == "*")
##                                    whatCorrect = (what[-1:] == "*")
##                                    whereCorrect = (where[-1:] == "*")
##                                    monthCorrect = (month[-1:] == "*")
##                                    dayCorrect = (day[-1:] == "*")
##                                    timeCorrect = (time[-1:] == "*")
##                                    ampmCorrect = (ampm[-1:] == "*")
                                    
##                                        if scen == "Scenario1":
##                                            whoCorrect = (who=="Violet")
##                                            whatCorrect = (what=="financial-institution")
##                                            whereCorrect = (where=="Psiland")
##                                            monthCorrect = (month=="April")
##                                            dayCorrect = (day=="5")
##                                            timeCorrect = (time=="11:00")
##                                            ampmCorrect = (ampm=="AM")
##                                        elif scen == "Scenario4":
##                                            whoCorrect = (who=="Silver")
##                                            whatCorrect = (what=="secular-school")
##                                            whereCorrect = (where=="Omicronland")
##                                            monthCorrect = (month=="January")
##                                            dayCorrect = (day=="1")
##                                            timeCorrect = (time=="9:00")
##                                            ampmCorrect = (ampm=="AM")
##                                        elif scen == "Scenario7":
##                                            whoCorrect = (who=="Triangle")
##                                            whatCorrect = (what=="cruise-terminal")
##                                            whereCorrect = (where=="Tickland")
##                                            monthCorrect = (month=="September")
##                                            dayCorrect = (day=="1")
##                                            timeCorrect = (time=="10:00")
##                                            ampmCorrect = (ampm=="PM")
##                                        elif scen == "Scenario8":
##                                            whoCorrect = (who=="Charger")
##                                            whatCorrect = (what=="indoor-mall")
##                                            whereCorrect = (where=="Salmonland")
##                                            monthCorrect = (month=="December")
##                                            dayCorrect = (day=="15")
##                                            timeCorrect = (time=="10:00")
##                                            ampmCorrect = (ampm=="AM")
                                        #Correct answers....
                                        #Scenario1 - Violet, financial institution, Psiland, April 5 11:00 AM
                                        #Scenario4 - Silver, secular school, Omicronland, January 1 9:00 AM
                                        #Scenario7 - Triangle, northern cruise terminal, Tickland, September 1 10:00 PM
                                        #Scenario8 - Charger, indoor mall, Salmonland, December 15 10:00 AM
                        row = [worker, Language, Age, Gender, Education, Occupation, Color, order, qType, cond, scen,   who,whoCorrect, what,whatCorrect, where,whereCorrect, month,monthCorrect, day,dayCorrect, time,timeCorrect, ampm,ampmCorrect, _REACTION_TIME_, comments,  mental, physical, temp, success, perf, stress, preference, trust1, trust2, trust3, trust4, trust5, trust6, trust7, trust8, trust9, trust10, trust11, trust12 ]#add comment somewhere
                        
                        
                        #SUS
                        #if r[2]=="AcceptabilityJudgment":#if?
                            #if len(r)>8 and r[8] != "":#do length?
                            
                            
                          #  else:
                          #      writeRow = False

                #print "writeRow: ",writeRow
                if writeRow:
                   foutw.writerow(row)
                   who=what=where=month=day=time=ampm=SUS=response = ""#"NA"
                   whoCorrect=whatCorrect=whereCorrect=timeCorrect=dayCorrect=monthCorrect=ampmCorrect = ""
                   scen=cond= ""
                   order = "NA"
                   mental=physical=temp=success=perf=stress=preference = ""
                   trust1=trust2=trust3=trust4=trust5=trust6=trust7=trust8=trust9=trust10=trust11=trust12 = ""




                       
##                                if writeRow and (worker == lastWorker or lastWorker == ""):#this comes too often
##                                        ##print "Same...",lastWorker##
##                                        rList.append(row)
##                                        lastWorker = worker #store this too look at later
##                                elif writeRow:
##                                        print "Different"##
##                                        confs.reverse()
##                                        for rl in rList:
##                                                rl[5]= endComment
##                                                if rl[8]=="test":
##                                                        rl[21]=confs.pop()#but from other end?
##                                                        ##print "popping for different", rl[17]
##                                                foutw.writerow(rl)
##                                                #and conf needs to line up rl[17] when r[8]=="test"
##                                        rList=[row] #start a new list with the current row for the next worker
##                                        lastWorker = "" #wipe this clear since we're starting a new worker
##                                        #lsSet=False
##                                        
                                        #print "New rList",rList


        #to get the last one in the file
        #confs.reverse()
       # for rl in rList:
       #         rl[5]= endComment
                #if rl[8]=="test":
                #        rl[21]=confs.pop()
                        ##print "popping for same", rl[17]
        #        foutw.writerow(rl)
        fin.close()
        fout.close()
        print "\nGenerated",fout.name,"\n in current directory ",os.getcwd()
        tm.sleep(5)



filename = raw_input('Enter a file name (or hit enter for "results.csv"): ') or "results.csv"
makeResFile(filename)

os.startfile(filename[:-4]+'-formatted.csv')




