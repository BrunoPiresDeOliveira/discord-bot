import dotenv from 'dotenv'
import Discord, { Intents } from 'discord.js'
import { Player } from 'discord-player'

import { healthCheck } from './commands/check.js'
import { defaultResponse } from './commands/defaultResponse.js'
import { play } from './commands/music/playMusic.js'
import { skip } from './commands/music/skipMusic.js'

dotenv.config()

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INTEGRATIONS
  ]
})

const player = new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 5000,
  autoSelfDeaf: true,
  initialVolume: 50,
  bufferingTimeout: 3000,
})


client.login("OTM4MjM3NTA2NTYwODcyNTI5.YfnXxQ.GA7AAe-FadldV-RR5In4uSgGsO0")

client.on("ready", () => {
  console.log(`[ON] BOT: ${client.user.tag}`),
  client.user.setActivity("Your song", { type: "LISTENING"})
})

const prefix = "$"

client.on("messageCreate", (msg) => {
  if (msg.author.tag == client.user.tag) return
  const commandFormated = msg.content.toLowerCase()
  if (!commandFormated.startsWith(prefix)) return

  const command = commandFormated.slice(prefix.length).trim().split(/ +/)[0]
  switch (command) {
    case `check`:
      healthCheck(msg, client)
      break
    case `tocar`:
      const args = msg.content.slice(prefix.length).trim().split(/ +/)
      play(msg, client, player, args)
      break
    case `skip`:
      skip(msg, client, player)
      break
    default :
      defaultResponse(msg, client)
  }
})
