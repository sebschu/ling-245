from gtts import gTTS
import os.path
import json
import sys


singular = {
   "noun": ["banana", "bowl", "box", "car", "chair", "cherry", "couch", "cow", "dart", "duck", "handbag", "hat", "horse", "key", "lamp", "leaf", "pear", "pig", "pillow", "pineapple", "pitcher", "ribbon", "scarf", "shirt", "shoe", "shovel", "spatula", "suitcase", "tray", "vase"],
   "adj": ["blue", "green", "orange", "purple", "dirty", "wooden", "furry", "spotted", "stone", "striped"], 
   "num": ["one"],
   "det": ["this", "that"]
}

plural = {
   "noun": ['bananas', 'bowls', 'boxes', 'cars', 'chairs', 'cherries', 'couches', 'cows', 'darts', 'ducks', 'handbags', 'hats', 'horses', 'keys', 'lamps', 'leaves', 'pears', 'pigs', 'pillows', 'pineapples', 'pitchers', 'ribbons', 'scarfs', 'shirts', 'shoes', 'shovels', 'spatulas', 'suitcases', 'trays', 'vases'],
   "adj": ["blue", "green", "orange", "purple", "dirty", "wooden", "furry", "spotted", "stone", "striped"], 
   "num": ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
   "det": ["these", "those"]
}



excluded_combinations = set(["banana blue", "banana orange", "banana purple", "banana furry", "banana striped", "bowl furry", "car furry", "cherry blue", "cherry orange", "cherry purple", "cherry furry", "cherry striped", "couch stone", "cow blue", "cow green", "cow orange", "cow purple", "duck blue", "duck purple", "duck furry", "handbag wooden", "handbag stone", "hat stone", "horse blue", "horse green", "horse orange", "horse purple", "key furry", "key spotted", "key stone", "lamp furry", "leaf blue", "leaf furry", "pear blue", "pear orange", "pear purple", "pear furry", "pear striped", "pig blue", "pig green", "pig orange", "pig purple", "pillow wooden", "pillow stone", "pineapple blue", "pineapple green", "pineapple orange", "pineapple purple", "pineapple furry", "pineapple striped", "pitcher furry", "scarf wooden", "scarf stone", "shirt wooden", "shovel furry", "spatula furry", "suitcase furry", "tray furry", "vase furry", "bananas blue", "bananas orange", "bananas purple", "bananas furry", "bananas striped", "bowls furry", "cars furry", "cherries blue", "cherries orange", "cherries purple", "cherries furry", "cherries striped", "couches stone", "cows blue", "cows green", "cows orange", "cows purple", "ducks blue", "ducks purple", "ducks furry", "handbags wooden", "handbags stone", "hats stone", "horses blue", "horses green", "horses orange", "horses purple", "keys furry", "keys spotted", "keys stone", "lamps furry", "leaves blue", "leaves furry", "pears blue", "pears orange", "pears purple", "pears furry", "pears striped", "pigs blue", "pigs green", "pigs orange", "pigs purple", "pillows wooden", "pillows stone", "pineapples blue", "pineapples green", "pineapples orange", "pineapples purple", "pineapples furry", "pineapples striped", "pitchers furry", "scarfs wooden", "scarfs stone", "shirts wooden", "shovels furry", "spatulas furry", "suitcases furry", "trays furry", "vases furry"])

nouns = [ {"singular": singular["noun"][i], "plural": plural["noun"][i]} for i in range(len(singular["noun"]))]



for l in [singular]:
    for i, noun in enumerate(l["noun"]):
        for adj in l["adj"]:
            if (noun + " " + adj) not in excluded_combinations:
                noun_obj = nouns[i]
                if "adj" not in noun_obj:
                    noun_obj["adj"] = []
                noun_obj["adj"].append(adj)
                text = noun + " " + adj
                filename = noun + "_" + adj + ".mp3"
                if not os.path.isfile(filename):
                    tts = gTTS(text=text, lang='en-us', slow=False)
                    tts.save(filename)


for l in [singular, plural]:
    for noun in l["noun"]:
        for num in l["num"]:
            text = noun + " " + num
            filename = noun + "_" + num + ".mp3"
            if not os.path.isfile(filename):
                tts = gTTS(text=text, lang='en-us', slow=False)
                tts.save(filename)
            


for l in [singular, plural]:
    for noun in l["noun"]:
        for det in l["det"]:
            text = noun + " " + det
            filename = noun + "_" + det + ".mp3"
            if not os.path.isfile(filename):
                tts = gTTS(text=text, lang='en-us', slow=False)
                tts.save(filename)

nums = []
for n in singular["num"]:
    nums.append({"num": n, "singular": True})
     
for n in plural["num"]:
    nums.append({"num": n, "singular": False})

dets = []
for d in singular["det"]:
    dets.append({"det": d, "singular": True})
     
for d in plural["det"]:
    dets.append({"det": d, "singular": False})



            
json.dump(nouns, sys.stdout, indent=4)
print ""
            
json.dump(nums, sys.stdout, indent=4)
print ""

            
json.dump(dets, sys.stdout, indent=4)
print ""
