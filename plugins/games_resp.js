import similarity from 'similarity'
const threshold = 0.72

export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/استخدم.*تلميح/i.test(m.quoted.text) || /.*hhint/i.test(m.text))
        return !0
    this.tebakbendera = this.tebakbendera ? this.tebakbendera : {}
    if (!(id in this.tebakbendera))
        return this.reply(m.chat, 'انـــتـــهــي الـــوقــــت حــاول مــجــددا', m)
    if (m.quoted.id == this.tebakbendera[id][0].id) {
        let isSurrender = /^(انسحب|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakbendera[id][3])
            delete this.tebakbendera[id]
            return this.reply(m.chat, 'اســتــســلـــم :(!', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebakbendera[id][1]))

        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakbendera[id][2]
            this.reply(m.chat, `*❐┃اجـابـة صـحـيـحـة┃✅ ❯*\n\n*❐↞┇الـجـائـزة💰↞${this.tebakbendera[id][2]} نقطه*`, m)
            clearTimeout(this.tebakbendera[id][3])
            delete this.tebakbendera[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold)
            m.reply(`*لقد كنت علي وشك النجاح*!`)
        else
            this.reply(m.chat, `❐┃اجـابـة خـاطـئـة┃❌ ❯`, m)
    }
    return !0
}

export const exp = 0