export async function play(msg, client, player, args) {
  let author = msg.author.tag
  author = author.split("#")

  const channel = msg.member.voice.channelId;
  if (!channel) return msg.channel.send(`${author[0]} você precisa entrar em um chat de voz.`)

  const search_music = args.join(" ");
  if (!search_music) {
    return msg.channel.send("Digite o nome/link da música no youtube.")
  }

  const queue = player.createQueue(msg.guild, {
    metadata: {
      channel: msg.channel,
    }
  })

  try {
    if (!queue.connection) {
      await queue.connect(channel)
    }
  } catch (error) {
    console.log(error.message)
    queue.destroy();
    return await msg.reply({
      content: "Não foi possível entrar no chat de voz.",
      ephemeral: true,
    })
  }

  const song = await player.search(search_music, {
    requestedBy: msg.author,
  }).then((x) => x.tracks[0])
  client.user.setActivity(song.title, { type: "LISTENING" })
  if (!song) return msg.reply(`${search_music} não encontrada.`)

  msg.channel.send({ content: `Buscando ${song.title}...`})
  queue.play(song)
  player.on("trackStart", async(queue) => {
    queue.metadata.channel.send(`Tocando ${song.title}!`)
  })
}