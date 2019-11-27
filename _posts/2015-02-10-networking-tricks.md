---
author: Chris Sunny Thaliyath
title: Networking tricks
featimg: networking.jpg
tags: [text]
category: [networking]
---

# Basic Tools

## Address Resolution Protocol


    arp

It should output the following 


    Address                  HWtype  HWaddress           Flags Mask            Iface
    192.168.43.1             ether   BB:DD:99:WW:GG:AA   C                     wlo1

In the above case what i am seeing is the IP address of the host machine to which i am connected .

The host wifi has 

- IP Address : 192.168.43.1
- Mac address: BB:DD:99:WW:GG:AA 

## ifconfig

    ifconfig


When you execute the above command you should see something like this 

    eno1      Link encap:Ethernet  HWaddr AA:BB:CC:DD:EE:FF  
            UP BROADCAST MULTICAST  MTU:1500  Metric:1
            RX packets:0 errors:0 dropped:0 overruns:0 frame:0
            TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:1000 
            RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)

    lo        Link encap:Local Loopback  
            inet addr:127.0.0.1  Mask:255.0.0.0
            inet6 addr: ::1/128 Scope:Host
            UP LOOPBACK RUNNING  MTU:65536  Metric:1
            RX packets:4919 errors:0 dropped:0 overruns:0 frame:0
            TX packets:4919 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:1000 
            RX bytes:9781094 (9.7 MB)  TX bytes:9781094 (9.7 MB)

    wlo1      Link encap:Ethernet  HWaddr AA:BB:CC:11:22:33  
            inet addr:192.168.43.192  Bcast:192.168.43.255  Mask:255.255.255.0
            inet6 addr: 2401:4900:33b0:5b59:39fc:a946:4ddb:3e8c/64 Scope:Global
            inet6 addr: fe80::7fa8:c0ef:6c60:7ffa/64 Scope:Link
            inet6 addr: 2401:4900:33b0:5b59:ccaf:9989:9106:f491/64 Scope:Global
            UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
            RX packets:10955 errors:0 dropped:0 overruns:0 frame:0
            TX packets:8751 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:1000 
            RX bytes:7476638 (7.4 MB)  TX bytes:1438531 (1.4 MB)


Basically the above output gives us 

- Interface number
  - eno1
  - lo
  - wlo1
   
- Ip address 
  - eno1 (Not connected)
  - lo (Loop back)
  - wlo1 (192.168.43.192 , this is the IP address of my system currently)
- mac address
  - AA:BB:CC:DD:EE:FF
  - AA:BB:CC:11:22:33
  


## arp-scan

Arp doesnt list down all the ip address of the devices on the same network if those devices havent pinged with your machine . In such cases , its usefull to use **arp-scan** 

##### Install arp-scan

   
    sudo arp-scan --interface wlo1 -localnet



This should output the following 

    Interface: wlo1, datalink type: EN10MB (Ethernet)
    Starting arp-scan 1.8.1 with 256 hosts (http://www.nta-monitor.com/tools/arp-scan/)
    192.168.43.1	d8:32:e3:f2:dc:9e	(Unknown)

    1 packets received by filter, 0 packets dropped by kernel
    Ending arp-scan 1.8.1: 256 hosts scanned in 1.404 seconds (182.34 hosts/sec). 1 responded



