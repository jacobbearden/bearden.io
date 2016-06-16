---
title: Server Setup
---

### First things first
First off you should update all repositories and upgrade the system, applying the latest patches. There will be a later section on automatic security updates.

```bash
apt-get update
apt-get dist-upgrade
```

### User Setup
You should never use root when logging on to a remote server. I typically use a name like `deploy` or `live`, but you can use whatever naming convention you would like. When working with a somewhat large group it is a good idea to have different users with only some having access to `sudo`.

```bash
useradd live
mkdir /home/live
mkdir /home/live/.ssh
chmod 700 /home/live/.ssh
```

Setup your prefered shell for the user, I use bash:

```bash
usermod -s /bin/bash live
```

### Require SSH key auth
It's typically good practice too avoid password logins:

1. SSH keys are better because they require more information
2. Password can be brute forced, forcing a public key is essentially impossible
3. They can be revoked at will

So lets require SSH authentication on our server by copying the contends of your `id_rsa.pub` on your machine to the authorized keys file on the server.

```bash
vim /home/live/.ssh/authorized_keys
chmod 400 /home/live/.ssh/authorized_keys
chown live:live /home/live -R
```

`chmod 400` makes it so the file can only be read by the owner, and the second command sets the owner as our `live` user.

### Setup `sudo`
Open up the `sudo` file with:

```bash
visudo
```

Add the `%sudo` group below the `root` user as show below. Make sure to comment out and other users or groups with a `#`. Typically a fresh install won't have any there.

```shell
root	ALL=(ALL) ALL
%sudo	ALL=(ALL:ALL) ALL
```

Then add `live` user to the `sudo` group.

```bash
usermod -a -G sudo live
```

### Enforce SSH key logins
Open up the SSH configuration with:

```bash
vim /etc/ssh/sshd_config
```

You'll want to add these lines to the file:

```
PermitRootLogin no
PasswordAuthentication no
AllowUsers live@(your-static-ip)
```

Enable all these setting changes by restarting the SSH service. You'll probably need to reconnect, so you'll need to do so with the `live` user you just created.

```bash
service ssh restart
```

### Setting up a firewall
You can either directly use IPtables, or you can use a handy interface called `ufw`, which is a layer on top of IPtables meant to simplify things. We're going to use `ufw`.

By default `ufw` should deny all incoming connections and allow all outgoing connections, however we need to keep a few things enabled so that we can actually be connected.

First, ensure our server supports IPv6. Open up the config file.

```bash
vim /etc/default/ufw
```

Set IPv6 to yes.

```
IPV6=yes
```

For the rest of the ports we're going to manage, we can just use the `ufw` tool via command line.

```bash
sudo ufw allow from (your-static-ip) to any port 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw disable
sudo ufw enable
```

The first line ensures that only connections from our IP can connect via SSH, While the second and third lines open up both http and https traffic.

### Automated security updates
While not perfect, these are better than missing big patches.

```bash
apt-get install unattended-upgrades

vim /etc/apt/apt.conf.d/10periodic
```

Update the file to match:

```
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
```

This disables normal updates, and only enables security updates. The idea is that you don't want an application going down unnoticed because a dependency was updated.

```bash
vim /etc/apt/apt.conf.d/50unattended-upgrades
```

Make the file match:

```
Unattended-Upgrade::Allowed-Origins {
    "Ubuntu lucid-security";
    //"Ubuntu lucid-updates";
};
```

And you're all set.

### fail2ban
fail2ban is an awesome package that automatically blocks suspicious activity as it happens. It scans log files and bans IPs that show malicious signs like having too many password failures, looking for exploits, etc.

```bash
apt-get install fail2ban
```

### And we're set
There we are. After completing these tasks your main concern becomes you application and services, which are their own beast unto themselves.
