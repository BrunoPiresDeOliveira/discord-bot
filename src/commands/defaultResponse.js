export function defaultResponse (msg) {
  let author = msg.author.tag
  author = author.split("#")

  return msg.reply(
    {
      content: `${author[0]} Desculpe eu ainda não tenho este comando :(`
    }
  )
}