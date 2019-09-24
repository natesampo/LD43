# LD43
#### You do not need to install this to join servers, only to host
### Installing
1. Install NodeJS (https://nodejs.org/en/download/)
2. Download the contents of this repository
3. Extract to any location

### Hosting LAN
Run 'run.bat'

### Joining LAN
Go to 'localhost:5000' if you are the host, or navigate to the host's IP address on port 5000

### Hosting Online
1. Run 'run.bat'
2. Run 'ngrok.exe'
3. In ngrok, type 'ngrok.exe http 5000' without the quotes, then hit enter
4. Give the randomly generated ngrok URL to anyone wishing to join

### Joining Online
Get the random ngrok URL from the host and navigate there (ex. https://bff09cc5.ngrok.io)

### Navigating to an IP address on a specific port
Type this into your internet browser: YOUR_IP_ADDRESS_HERE:5000 (ex. 10.60.40.10:5000)

You can get your local IP address by entering 'ipconfig' into the Command Prompt

#### Note: This is only tested for Windows, and instructions are written for Windows. You can join an already running server from any other OS but I have not tried hosting on another OS. It might work, it might not.
