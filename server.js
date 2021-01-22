var hostName = window.location.origin
hostName = hostName.replace('http://', '')
hostName = hostName.replace('https://', '')
hostName = hostName.replace('www', '')
hostName = hostName.split(':')

// hostName = hostName[0]
hostName = '185.201.8.233'
port = '25565'
// port     = '25566'

$(document).ready(function () {
    getStatus()
})

function getStatus() {
    $.ajax({
        url: `https://api.mcsrvstat.us/2/${ hostName }`,
        type: "GET",
        dataType: "JSON",
        complete: function () {
            $("#loading").addClass("d-none")
        },
        success: function (result) {
            var date = new Date()
            let cekTime = (date.getHours() > 18 || date.getHours() < 6)
            let timeNya = cekTime == true ? 'night' : 'day'        
            $("#styleNya").html(`
                body {
                    background: url("background/background-${timeNya}.png") no-repeat center center fixed;
                    -webkit-background-size: cover;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    background-size: cover;
                }
            `)
            $("#server").removeClass('d-none')
            if (result.online == false) {
                $("#serverOnline").addClass("d-none")
                $("#serverOffline").removeClass("d-none")
            } else {
                $("#serverOnline").removeClass("d-none")
                $("#serverOffline").addClass("d-none")
            }
            $("#serverLogo").attr('src', result.icon)
            $("#title").html(result.motd.clean)
            $("#serverName").html(result.motd.html)
            $("#serverIp").html(`<b>${hostName}</b>`)
            $("#serverPort").html(`<b>${result.port}</b>`)
            $("#serverStatus").html(result.online == true ? '<b>Online</b>' : '<b>Offline</b>')
            $("#serverVersion").html(`<b> ${result.version} </b>`)
            $("#slot").html(`${result.players.online}/${result.players.max}`)
            let players = []
            // let tampungMods = result.mods.raw
            // let mods_ = ''
            let players_ = ''
            // let mods = []
            if (result.players.online != 0) {
                players = result.players.list
                players.sort()
            }
            // Object.values(tampungMods).forEach(mod => {
            //     mods.push(mod)
            // })
            // mods.sort()
            // mods.forEach(mod => {
            //     mods_ += `<a href="https://google.com/search?q=minecraft ${mod}" target="_blank">${mod}</a>, `
            // })
            // mods_ = mods_.substr(0, mods_.length - 2)
            // $("#serverMods").html(mods_)
            players.forEach(player => {
                players_ += `<b>${player}</b>, `
            });
            players_ = players_.substr(0, players_.length - 2)
            let html = `<tr><td>${players_}</tr></td>`
            $("#serverPlayers").html(html)
        }
    })
}

setInterval(() => {
    getStatus()
}, 30000);