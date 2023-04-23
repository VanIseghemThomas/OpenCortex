# NeuralDSP QuadCortex file decryptor.

This tool can be used to take one of the encrypted `.cns` or `.json` files, and decrypt them to a usable format. The `.cns` files are actually protobufs and can be decoded with the Python decoder.

Build the image:

```sh
docker build . -t qc_decrypt
```

To decrypt user files (pass the serial number found in `/etc/qc_sn` as command line argument):

```sh
docker run -v/path/to/your/files/:/data qc_decrypt QA00XXXXX /data/encrypted.json
```

To decrypt update files instead, provide an empty serial:

```sh
docker run -v/path/to/your/files/:/data qc_decrypt "" /data/encrypted.json
```

## License

This tool was made with ♥  by [Simone Margaritelli](https://www.evilsocket.net/) and it is released under the GPL 3 license.

# Unencrypted Neural Capture file decoder

This tool allows you to decode the files, decrypted using the tool above.

## Dependencies
You need to use the protobuf 3.20 package for this to work. You can get it by running:

```
pip install protobuf==3.20.*
```

## Usage

```
python decode_capture.py <your-file>.cns.dec
```

# File decryptor web app

By hosting the contents of the `webapp` folder you will be able to skip all the CLI tools and just drag and drop a file in there. The decryption is ported to JS by [Simone Margaritelli](https://www.evilsocket.net/).