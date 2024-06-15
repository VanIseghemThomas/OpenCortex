## Installation

1) Take this folder `Stomps` and put it anywhere you like on the QC

## Usage

`cd` into the `Stomps` directory installed on the QC and run any of the Python scripts.

There are a couple of fun things to play around with. 
1) **read_stomp.py:** Allows you to decode and read stomp device traffic
2) **stomp_control.py:** CLI tool to activate stomps
3) **stomp_scroll.py:** Just a fun visual effect
4) **stomp_server.py:** Spawns a websocket server that allows you to control stomps over IP

## Stomp message byte examples:

**Action: button | Value: pressed**
```
9a e5 01 65 92 bf 0c 00 01 00 11 01 01 00 00 00 9a e5 01 65 92 bf 0c 00 00 00 00 00 00 00 00 00
```

**Action: button | Value: released**
```
9b e5 01 65 4b 74 0b 00 01 00 11 01 00 00 00 00 9b e5 01 65 4b 74 0b 00 00 00 00 00 00 00 00 00
```

**Action: rotary | Value: clock wise**
```
9d e5 01 65 ac 83 04 00 02 00 08 00 01 00 00 00 9d e5 01 65 ac 83 04 00 00 00 00 00 00 00 00 00
```

**Action: rotary | Value: counter clock**
```
9e e5 01 65 40 e8 05 00 02 00 08 00 ff 00 00 00 9e e5 01 65 40 e8 05 00 00 00 00 00 00 00 00 00
```

It seems that a 32 bytes message is divided into 2 parts of 16 bytes.

### Part 1 (first 16 bytes)
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10     | 11     | 12    | 13      | 14      | 15      |
|---|---|---|---|---|---|---|---|---|---|--------|--------|-------|---------|---------|---------|
| time | time | time | time | ? | ? | ? | padding? | action | action (not really used) | action | action | value | padding | padding | padding |

### Part 1 (last 16 bytes)
- 0 -> 6 are duplicates
- 7 -> 15 are padding

From first sight, this part look quite useless. Not sure why it's even there.