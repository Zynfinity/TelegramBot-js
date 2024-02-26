import axios from 'axios'
import fetch from 'node-fetch'
import FormData from 'form-data';
import fs from 'fs'
import cheerio from 'cheerio'
import file from 'file-type';
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const formatRupiah = async (angka, prefix) => {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        const separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}
const parseResult = async (title, json, option) => {
    if (Array.isArray(json)) {
        var txt = `${global.shp} ${title}\n\n${global.shp}\n`
        for (let i = 0; i < json.length; i++) {
            if (option && option.delete) {
                for (let j of option.delete) {
                    delete json[i][j]
                }
            }
            for (let j of Object.entries(json[i])) {
                txt += `${global.shp} ${await kapitalisasiKata(j[0].replace(/_/, ' '))} : ${j[1]}\n`
            }
            if (i + 1 != json.length) txt += `\n${global.shp}\n`
        }
    }
    else {
        var txt = `${global.shp} ${title}\n\n`
        if (option && option.delete) {
            for (let j of option.delete) {
                delete json[j]
            }
        }
        for (let i of Object.entries(json)) {
            txt += `${global.shp} ${await kapitalisasiKata(i[0].replace(/_/, ' '))} : ${i[1]}\n`
        }
    }
    return txt
}
const toTimer = async (seconds) => {
    function pad(s) {
        return (s < 10 ? '0' : '') + s
    }
    var hours = Math.floor(seconds / (60 * 60))
    var minutes = Math.floor((seconds % (60 * 60)) / 60)
    var seconds = Math.floor(seconds % 60)

    //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    return `${pad(hours)} Jam - ${pad(minutes)} Menit - ${pad(seconds)} Detik`
}
const kapitalisasiKata = async (str) => {
    return str.replace(/\w\S*/g, function (kata) {
        const kataBaru = kata.slice(0, 1).toUpperCase() + kata.substr(1);
        return kataBaru
    });
}
const tiny = async (link) => {
    return new Promise((resolve) => {
        axios.get(`https://tinyurl.com/api-create.php?url=${link}`).then(res => {
            resolve(res.data)
        })
    })
}
const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
const telegraph = async (buffer) => {
    const {
        ext
    } = await file.fromBuffer(buffer)
    let form = new FormData
    form.append('file', buffer, 'tmp.' + ext)
    let res = await fetch('https://telegra.ph/upload', {
        method: 'POST',
        body: form
    })
    let img = await res.json()
    if (img.error) throw img.error
    return 'https://telegra.ph' + img[0].src
}
const fileIO = async (buffer) => {
    const {
        ext
    } = await file.fromBuffer(buffer) || {}
    let form = new FormData
    form.append('file', buffer, 'tmp.' + ext)
    let res = await fetch('https://file.io/?expires=1d', { // 1 Day Expiry Date
        method: 'POST',
        body: form
    })
    let json = await res.json()
    if (!json.success) throw json
    return json.link
}
const getBuffer = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (e) {
        console.log(`Error : ${e}`)
    }
}
export { kapitalisasiKata, sleep, formatRupiah, getBuffer, parseResult, toTimer }