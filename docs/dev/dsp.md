# DSP

[Back to developer documentaion main page](README.md)

Infomation about how the dsp on the QCs works, and how we can develop code for it.

## How it works

### LDR Files & DSP Loading

A LDR is basically a sequence of 4 unsigned longs blocks where each is:

```c
printf("block code: 0x%08x\n", bh[block_code_idx]);
printf("target address: 0x%08x\n", bh[target_address_idx]);
printf("byte count: 0x%08x\n", bh[byte_count_idx]);
printf("argument: 0x%08x\n", bh[argument_idx]);
```

It's not an executable format, but it tells the DSP to literally "load this code at this address"
The original code should be recoverable from these files

the dsp loading process works via /dev/mem

[Sharc Runtime Loader](https://github.com/analogdevicesinc/runtime-sharc-loaderGitHubGitHub)
[U-Boot LDR Files](https://www.analog.com/media/en/technical-documentation/application-notes/EE407v01.pdf)

### Architecture

A single binary is splitted into different chunks and each is executed by a specific core
core0 gets the actual arm code and the models are handled (maybe passed from the code in core0 to core1) by core1 and core2

#### MEMORY LAYOUT

```c
0x001609a8 DATA | <0 bytes>
0x001609a8 CODE | 0xab9c8000
0x001609a8 CODE | 0xab9c8000
0x00161320 CODE | 0xab9c8000
```

all the opcodes are the same (addeq sb, r0, fp, lsr #25)
they just increment the pointer to the data, meaning, the actual logic is in the data section
All the data sections are sized as a multiple of 4, this would suggest these are arm instructions as well

## Links

- [SDK Examples](https://github.com/analogdevicesinc/runtime-sharc-loader/blob/master/SharcLoader/loader.c#L228GitHubruntime-sharc-loader/loader.c)
