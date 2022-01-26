export function healthCheck(msg, client) {
  return msg.reply({
    content: `[ON] BOT: ${client.user.tag}`
  })
}