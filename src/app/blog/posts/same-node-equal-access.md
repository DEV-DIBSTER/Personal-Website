---
title: "Allowing Pterodactyl Servers to Communicate on the Same Node"
date: "2026-01-16"
image: ""
tags: ["system administration", "pterodactyl", "firewalls"]
excerpt: "Understanding Pterodactyl Firewalls."
---

# Pterodactyl:

[Pterodactyl](https://pterodactyl.io), the Game Panel platform that allows you to host many different types of servers in isolated, docker containers in the nice UI management.

It's powerful, it's great. I use it all the time to host my personal projects, as well as many hosting providers like [BlueFoxHost](https://bluefoxhost.com) and [DanBot Hosting](https://danbot.host).

That being said there are many things that are not well documented, including the API. The Network logic, is also there.

# Docker Networking:

Docker normally uses the `172.17.0.1` network internally, which is sometimes seen as `docker0`. This is how docker containers normally interact with each other.

# Pterodactyl Networking:
 
Pterodactyl networking is different though. Instead, it uses the `172.18.0.1` network, which is on the `pterodactyl0` network. This can be confusing when setting up firewalls, or in this case, creating allows for the firewall.

# So how do I get two servers on the same Node to connect?

Simple. You need to make the server with the port that you're trying to connect to from another server, and add it to the firewall allow list.

This is what I used to open that port, seeing `<PORT>`.

```
ufw allow in on pterodactyl0 to 172.18.0.1 port <PORT> proto tcp
```

This allows any server on that Node to connect to the server with that port. This is risky, but it's one of the easier ways to do this.

## Conclusion

Pterodactyl is a great software and I highly recommend it, just some small tweaks that needs to be addressed for it to work.

---