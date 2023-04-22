NeuralDSP QuadCortex file decryptor.

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
