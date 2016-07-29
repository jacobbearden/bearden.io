---
title: 'Wii Modding: Part 1, The Basics'
---

A tutorial/follow along of the steps I took to modify my Nintendo Wii.

### Prerequisites
1. SD (or SDHC) card formatted as either `FAT16` or `FAT32`
2. [Sytem Menu 4.3](//wiibrew.org/wiki/System_Menu_4.3) (lower version will not work with this)
3. Your Wii's MAC Address
	- Can be found in your Wii's system settings (we'll cover this in a bit).
	- This is needed because the Wii will only accept messages addressed to the MAC address
4. Ability to copy files from your computer to the SD card (card reader)

### The LetterBomb exploit

The LetterBomb exploit is a safe way to install the "Homebrew Channel" onto your Nintendo Wii without any hardware modifications. Homebrew is essentialy a loader for third party software. The exploit works through the use of the Wii Message Board, loading a special letter (hence LetterBomb), that when opened executes an installer for Homebrew.

#### Downloading
1. Navigate to [please.hackmii.com](//please.hackmii.com).
2. Select your region (Mine is "U", so I'll select "4.3U")
	- U = United States
	- E = Europe
	- J = Japan
	- K = Korea
3. Enter your MAC Address
	- `Wii Options > Wii Settings > Page 2 > Interent > Console Information`
4. Make sure "Bundle the HackMii installer for me!" is checked
5. Enter the captcha
6. Click either of the buttons, they both download the needed files

#### Running
1. Copy `private/` and `boot.elf` onto your SD card
2. Insert the SD card into the Wii
3. Go to Wii Message Board
4. You should see a red envelope that looks like the one on [please.hackmii.com](//please.hackmii.com). Open it and :boom:

#### Installing Homebrew
Your screen should look something like this:

![boom](/static/image/2016-06-16_2.jpg)

If you have a newer Wii you will only be able to install [BootMii](//www.wiibrew.org/wiki/BootMii) as `IOS`.

1. Select "Continue"
2. Go to `Homebrew Channel > Install the Homebrew Channel`
3. You will be asked if you want to install the channel, select yes
	- When it is finished installing you should get a message "finished" and be returned to the initial menu
4. If possible, install BootMii as `boot2`, if not install it as an `IOS`

What is BootMii?

BootMii is a low-level system you can install onto your Wii, that will load before anything else on the Wii does. What it effecctively does, is allow a "Recovery mode", preventing you from bricking your Wii.

#### Installing Homebrew applications
Homebrew applications are loaded from the `apps/` directory on your SD card. Copy all downloaded application to `apps/`

**Note:** you can now delete the `private/` folder if you wish, it is no longer needed.

#### And you're set
Homebrew is installed, your Wii is esentially unbrickable, and you can now install any of the wide variety of [Homebrew applications](//wiibrew.org/wiki/Homebrew_applications)!

Later parts of this series will be installing applications/software I personally want (but aren't necassary by any means), and some tips and tricks regarding them.
