import dotenv from 'dotenv'
import Discord, { Intents } from 'discord.js'
import { Player } from 'discord-player'

import { healthCheck } from './commands/check.js'
import { defaultResponse } from './commands/defaultResponse.js'
import { play } from './commands/playMusic.js'

dotenv.config()

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
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


client.login(process.env.TOKEN)

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
  console.log(command)
  switch (command) {
    case `check`:
      healthCheck(msg, client)
      break
    case `tocar`:
      const args = msg.content.slice(prefix.length).trim().split(/ +/)
      play(msg, client, player, args)
      break
    default :
      defaultResponse(msg)
  }
})
