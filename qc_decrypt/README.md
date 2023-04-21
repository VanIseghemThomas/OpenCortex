NeuralDSP QuadCortex file decryptor.

Compile with `make` (requires gcc and openssl-dev installed), then pass the serial number found in `/etc/qc_sn` as command line argument:

```sh
./qc_decrypt QA00XXXXX /path/to/encrypted.json/cns/ldr/... > decrypted.dat
```

## License

This tool was made with ♥  by [Simone Margaritelli](https://www.evilsocket.net/) and it is released under the GPL 3 license.
