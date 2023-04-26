# Editing the default model names

Companies like NDSP aren't allowed to ship their models under the real name it is based on. Luckly they keep track of it in the actual model list.

The models and their respective categories, names and parameters, are stored inside `/opt/neuraldsp/ModelRepo.xml`. In order to rename these files to the real deal, you need to edit the file.

If you don't want to rename the files manually you can:

- Use the `model_renamer.py` script in this repo to generate the XML file

  - Usage:

  ```console
  python model_renamer.py <original-modelrepo> <output-file-path>
  ```

- Use the pre-generated XML file inside `Model Repositories` (make sure to match it to your CorOS verion)

Now replace the `ModelRepo.xml` file inside `/opt/neuraldsp` with the new file. Make sure this is called `ModelRepo.xml`.
Finally reboot your QC, now you should have all models (except captures) renamed to their real names.

![IMG20221218151130](https://user-images.githubusercontent.com/55881698/208303182-8554e62c-96a9-41f2-be0d-1f1f4f564506.jpg)
