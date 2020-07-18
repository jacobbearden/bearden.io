---
title: Improving Latency in Online Games
hidden: true
---

This is a short tutorial on how to improve latency in online video games, and anything that uses TCP packets. This tutorial is pulled from the forums of a game I used to play as a means of preserving it.



## Requirements
1. Windows XP or higher (does not work on macOS/Linux, this is accomplished by changing Window's settings)
2. Relatively modern CPU (made within this decade)
3. Internet that isn't dial up speeds (this speeds up the rate at which your computer sends packets)



## Instructions

### Install
1. Open up Run (Windows Key + R) then type "regedit" (without quotes) and hit Enter
1. Navigate to "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\Tcpip\Parameters\Interfaces"
1. Repeat the below steps for each folder within the "Interaces" folder
    - Create two `DWORD` registry keys called `TcpAckFrequency` and `TCPNoDelay`
        - The names are case-sensitive, so make sure they're the exact same as above
    - Double-click on each of the new registry keys and change the value from `0` to `1`
        - Ensure you are using base hexadecimal
1. Confirm that you have created and set these keys for all folders within the "Interfaces" folder
1. Restart your computer

### Uninstall
Delete all `DWORD` registry keys called `TcpAckFrequency` and `TCPNoDelay` in the "Interfaces" folder in the registry.



## Explanation

### `TcpAckFrequency`
#### Before
*Server*: "Ok computer, I just sent a data packet over to you, got it?"

*Computer*: …

*Server*: "Come on, answer me! I don't have all day! Stop wasting time!"

*Computer*: …

*Server*: "Ok, forget it, I've waited long enough, sending another one over! Got it?"

*Computer*: "Yep, got that one, also got the one you sent before, thanks."

*Server*: "Well, why didn't you acknowledge the first one when I sent it? I was waiting ages!"

*Computer*: "Sorry, I'm just trying to make the network more efficient by bundling the acknowledgements together in pairs. This is how I'm setup by default."

#### After
*Server*: "Ok computer, I just sent a data packet over, got it?"

*Computer*: "Yep, send the next!"

*Server*: "Ok, here's another, got that?"

*Computer*: "Yep, send the next!"

### `TCPNoDelay`
#### Before
*Computer*: "I have this packet I want to send to the server, but it's really small and I'm going to have another packet here in a few milliseconds, so I'll wait and just lump them together."

#### After
*Computer*: "I have this packet I want to send to the server, so I'll send it."

In computer science terms, you are disabling [Nagle's algorithm](//en.wikipedia.org/wiki/Nagle's_algorithm).
