const Discord = require('discord.js');
const ayarlar = require('./ayarlar.json');
const client = new Discord.Client();
const https = require('https');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const request = require("request");
const express = require("express");
const http = require("http");
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

client.on('ready', () => {
  console.log(`Logged in ass ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});



client.login(process.env.BOT_TOKEN);
