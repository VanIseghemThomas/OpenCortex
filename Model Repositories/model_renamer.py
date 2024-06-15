# This script will take the ModelRepo.xml file and rename the models based on the trademark
# This is not supposed to be used on the QC, it's the script used to create the ModelRepo.xml file's in this repository

import argparse
import json
import xml.etree.ElementTree as ET

parser = argparse.ArgumentParser(description='Rename the models in an XML file')
parser.add_argument('--original', metavar='xml_file', type=str, help='The XML file to be parsed', required=True)
parser.add_argument('--out', metavar='output_file', type=str, default='ModelRepo_generated.xml', help='The output file', const='ModelRepo_generated.xml', nargs='?')
args = parser.parse_args()

tree = ET.parse(args.original)
root = tree.getroot()

def load_override_json(path):
    with open(path) as f:
        data = json.load(f)
    return data

def get_actual_model(model):
    name = model.get('name')
    trademark = model.get('tm')
    model_id = model.get('id')

    # Check if the model has a manual override
    if model_id in override.keys():
        print('Overriding model: ' + name + ' with ' + override[model_id])
        return override[model_id]

    # Remove "Based on " from the name
    new_name = trademark.replace('Based on ', '')
    # remove "®" from the name
    new_name = new_name.replace('®', '')
    # Change out the word "loaded" for "|"
    new_name = new_name.replace('loaded with', '|')
    # remove the word "with" from "loaded with"
    new_name = new_name.replace('with', '|')
    # remove the word "tubes" from the name
    new_name = new_name.replace('tubes', '')
    new_name = new_name.replace('Tubes', '')

    # Check if the name contains a Mono or Stereo suffix
    if name.endswith('(M)'):
        new_name += ' (M)'
    elif name.endswith('(S)'):
        new_name += ' (S)'

    return new_name


print('Renaming models in file: ' + args.original)
override = load_override_json('manual_override.json')["ids"]
print(override)

# Itterate over the categories inside the XML file
for category in root.findall('Category'):
    # Itterate over the models inside the category
    for model in category.findall('Model'):
        # First check if the model has a trademark
        trademark = model.get('tm')
        if trademark != "" and trademark != None:
            new_name = get_actual_model(model)
            model.set('name', new_name)

print('Saving file to: ' + args.out)
# Save the XML file
tree.write(args.out, encoding='UTF-8', xml_declaration=True)



