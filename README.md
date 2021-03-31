# UTAR Hi-Hive Attendance

### 🌐 [View the website](http://fongyoong.github.io/utar_hihive_attendance)

* ✅ Check attendance
* ❌ Scan QR code (in progress)

***
## How did I find the API? 

### Disassembling Hi-Hive

* [apktool](https://ibotpeaches.github.io/Apktool/) was used to pry open the [apk file](https://github.com/FongYoong/utar_hihive_attendance/blob/master/decompiled_files/hi-hive-community_1.0.6.apk) with the simple command:
`apktool d hi-hive-community_1.0.6.apk`
* After inspecting the project structure, the app was definitely built with [React Native](https://reactnative.dev/). The important files are [index.android.bundle](https://github.com/FongYoong/utar_hihive_attendance/blob/master/decompiled_files/index.android.bundle) and [QRScanning.html](https://github.com/FongYoong/utar_hihive_attendance/blob/master/decompiled_files/QRScanning.html).
* From  [QRScanning.html](https://github.com/FongYoong/utar_hihive_attendance/blob/master/decompiled_files/QRScanning.html), I gleaned a couple of different URLs which all point to the same server: https://www.silverlakemobility.com/plugins/WebPlugIn
* What's baffling is that the data-fetching in that document are all GET requests, including updates to the server's database. While I was surprised at finding such a rookie security flaw, it was essential to progressing further. 🤦‍♂️ (P.S: The code is really, really terrible. It uses a lot of arbitrary numerical indexes to represent the app's states without any clear semantic meaning for other programmers to understand the code at a glance. Flexible Javascript typing be like whutt. This has got to be a one-man developer who's not thinking far ahead.)

### QR Scanning (Incomplete)
* Lines 547 and 549 of [QRScanning.html](https://github.com/FongYoong/utar_hihive_attendance/blob/master/decompiled_files/QRScanning.html) implies that the QR attendance submission process is initiated when the phrase **QRC** is found at the beginning of the QR code. This is confirmed by the fact that the QR codes of my classes all begin with **QRC**.

* By adding a `?type=1` parameter such that https://www.silverlakemobility.com/plugins/WebPlugIn?type=1, we get the error message:
    `Failed to process QR attendance.<br/><br/>Please inform hi-hive support at hi-hive@silverglobe.com.`

* At the same time, I tried generating fake QR codes beginning with **QRC** such as:

    <img src="https://i.imgur.com/HadUvWI.png" alt="drawing" width="200"/>

    and got the result below with my phone's Hi-Hive app:

    <img src="https://i.imgur.com/9ix5bIS.png" alt="drawing" width="200"/>

* Hence, `?type=1` could be the place we're looking for.

### Web Scraping
* I also discovered that the [Hi-Hive API](https://www.silverlakemobility.com/plugins/WebPlugIn) recognises GET parameters such as `type`, `email` and `data`.
* Rather than going through the possible combinations one by one, I automated it with [Selenium](https://selenium-python.readthedocs.io/installation.html#introduction).
* The relevant files are in the [web scraping folder](https://github.com/FongYoong/utar_hihive_attendance/tree/master/web_scraping).
* `pip install selenium` if it's not installed and make sure a compatible [chromedriver.exe](https://chromedriver.chromium.org/) is in the same directory.
* Running `python scrape.py` will enumerate `type` from 0 to 999, screenshot any non-empty results and store them in a **scrape_results** folder.
* Unfortunately, I could not submit any QR code successfully...
    ...but, I found that
    `https://www.silverlakemobility.com/plugins/WebPlugIn?type=201&email=your-email-here`
    returns a record of past attendance! The [current website](http://fongyoong.github.io/utar_hihive_attendance) is based upon this functionality.


### Hermes (Experimental)

* Despite the mediocre code, at least the developer was wise enough to enable [Hermes](https://reactnative.dev/docs/hermes) to obfuscate the app's code. Hence, examining [index.android.bundle](https://github.com/FongYoong/utar_hihive_attendance/blob/master/decompiled_files/index.android.bundle) is no longer as simple as de-uglifying minified code. Hermes has turned them all into bytecode! More info [here](https://blog.jscrambler.com/securing-react-native-applications#hermes)

* Out of curiosity, I wanted to at least examine the bytecode to look for further clues. Fortunately, there's [hbctool](https://github.com/bongtrop/hbctool) which makes the bytecode more readable although it's still hard to piece things together (1417169 lines of bytecode!). 

* After `pip install hbctool`, we can run:

    `hbctool disasm index.android.bundle output_folder`

    to obtain [instruction.hasm](https://github.com/FongYoong/utar_hihive_attendance/blob/master/decompiled_files/disassembled/instruction.hasm) which contains the "readable" bytecode.