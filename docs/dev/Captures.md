# Captures

[Back to developer documentaion main page](README.md)

[Captures can now be decryped here](https://vaniseghemthomas.github.io/OpenCortex/File-decryption/webapp/)

Infomation about how Captures on the QCs works.

## How it works (Needs updating)

Captures are encrypted protobufs, with local encryption use the serial number, global does not.

After cracking the encryption to the Neural Captures, and writing some code to decode the captures to JSON format. I was shocked to see that there is very little "Neural" about it. Recently it was discovered that the training process involves some kind of genetic algorithm and until now we haven't found a conrete reference to any neural network training. Looking at one of the captures you can see that the network consists of a 13 parameter network.

## Links

- [Capture Demo](http://research.spa.aalto.fi/publications/papers/smc19-black-box/)
- [Patent](https://patentimages.storage.googleapis.com/0e/b9/35/293f5bf8c3340a/EP3828878A1.pdf)
- [Capture Article](https://www.smc2019.uma.es/articles/S5/S5_02_SMC2019_paper.pdf)
