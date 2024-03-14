const child = require('node:child_process');
const fs = require('node:fs');

if (!fs.existsSync(`./config.json`)) fs.writeFileSync('./config.json', JSON.stringify({token: null, langue: "en"}, null, 4))

const gradient = require('gradient-string');
const discord = require('djs-selfbot-v13');
const readline = require('readline-sync');
const superagent = require('superagent');
const config = require('./config.json');
const color = randomColor()
const logo = randomLogo()


if (!fs.existsSync(`./language/${config.langue}.json`)) return console.log(color(`[-] Unvalid language !`))
const language = require(`./language/${config.langue}.json`);

const client = new discord.Client({checkUpdate: false})
client.login(config.token).catch(async () => {
    config.token = readline.question(color(language.invalidToken))
    await fs.promises.writeFile("./config.json", JSON.stringify(config, null, 4))
    process.exit(1)
})


client.on('ready', async () => await main())

async function main(){
    console.clear()
    console.log(color(logo))
    
    const channelId = readline.question(color(language.choice))
    const channel = await client.channels.fetch(channelId).catch(() => false)

    if (!channel) {
        console.log(color(language.invalidChannel.replace("<channelId>", channelId)))
        await client.sleep(3000)
        return await main()
    }

    const number = readline.question(color(language.number))

    for (let i = 0; i < parseInt(number || 100); i++){
        const f = await superagent.get(randomURL()).catch(() => false)
        if (channel) await channel.send(f.body.url).catch(() => false)
        console.log(color(language.sended))
    }

    main()
}






function randomLogo(){
    const logos = [
 ` ██╗  ██╗███████╗███╗   ██╗████████╗ █████╗ ██╗    ██████╗  ██████╗ ███╗   ███╗██████╗ ███████╗██████╗ 
 ██║  ██║██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██║    ██╔══██╗██╔═══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗
 ███████║█████╗  ██╔██╗ ██║   ██║   ███████║██║    ██████╔╝██║   ██║██╔████╔██║██████╔╝█████╗  ██████╔╝
 ██╔══██║██╔══╝  ██║╚██╗██║   ██║   ██╔══██║██║    ██╔══██╗██║   ██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗
 ██║  ██║███████╗██║ ╚████║   ██║   ██║  ██║██║    ██████╔╝╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗██║  ██║
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝    ╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝`,
 ` ██░ ██ ▓█████  ███▄    █ ▄▄▄█████▓ ▄▄▄       ██▓    ▄▄▄▄    ▒█████   ███▄ ▄███▓ ▄▄▄▄   ▓█████  ██▀███  
▓██░ ██▒▓█   ▀  ██ ▀█   █ ▓  ██▒ ▓▒▒████▄    ▓██▒   ▓█████▄ ▒██▒  ██▒▓██▒▀█▀ ██▒▓█████▄ ▓█   ▀ ▓██ ▒ ██▒
▒██▀▀██░▒███   ▓██  ▀█ ██▒▒ ▓██░ ▒░▒██  ▀█▄  ▒██▒   ▒██▒ ▄██▒██░  ██▒▓██    ▓██░▒██▒ ▄██▒███   ▓██ ░▄█ ▒
░▓█ ░██ ▒▓█  ▄ ▓██▒  ▐▌██▒░ ▓██▓ ░ ░██▄▄▄▄██ ░██░   ▒██░█▀  ▒██   ██░▒██    ▒██ ▒██░█▀  ▒▓█  ▄ ▒██▀▀█▄  
░▓█▒░██▓░▒████▒▒██░   ▓██░  ▒██▒ ░  ▓█   ▓██▒░██░   ░▓█  ▀█▓░ ████▓▒░▒██▒   ░██▒░▓█  ▀█▓░▒████▒░██▓ ▒██▒
 ▒ ░░▒░▒░░ ▒░ ░░ ▒░   ▒ ▒   ▒ ░░    ▒▒   ▓▒█░░▓     ░▒▓███▀▒░ ▒░▒░▒░ ░ ▒░   ░  ░░▒▓███▀▒░░ ▒░ ░░ ▒▓ ░▒▓░
 ▒ ░▒░ ░ ░ ░  ░░ ░░   ░ ▒░    ░      ▒   ▒▒ ░ ▒ ░   ▒░▒   ░   ░ ▒ ▒░ ░  ░      ░▒░▒   ░  ░ ░  ░  ░▒ ░ ▒░
 ░  ░░ ░   ░      ░   ░ ░   ░        ░   ▒    ▒ ░    ░    ░ ░ ░ ░ ▒  ░      ░    ░    ░    ░     ░░   ░ 
 ░  ░  ░   ░  ░         ░                ░  ░ ░      ░          ░ ░         ░    ░         ░  ░   ░     
                                                          ░                           ░                 `
    ]
    const randomIndex = Math.floor(Math.random() * logos.length);
    return logos[randomIndex];
}

function randomColor(){
    const colors = [
        gradient.instagram.multiline,
        gradient.morning.multiline,
        gradient.passion.multiline,
        gradient.cristal.multiline,
        gradient.rainbow.multiline,
        gradient.pastel.multiline,
        gradient.summer.multiline,
        gradient.atlas.multiline,
        gradient.retro.multiline,
        gradient.fruit.multiline,
        gradient.mind.multiline,
        gradient.teen.multiline,
        gradient.vice.multiline
    ]

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function randomURL(){
    var urls = [ 
        "https://waifu.pics/api/nsfw/waifu",
        "https://waifu.pics/api/nsfw/neko",
        "https://waifu.pics/api/nsfw/blowjob"
    ]
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
}