let rtp = "rtp-v2"
const assets = [
    "./assets/img/gift.svg",
    "./assets/img/home.svg",
    "./assets/img/hydro-flask.svg",
    "./assets/img/limbah-bahan-kimia.svg",
    "./assets/img/limbah-pabrik.svg",
    "./assets/img/person.svg",
    "./assets/img/recycle-sign.svg",
    "./assets/img/reusable-mask.svg",
    "./assets/img/reusable-spoon-and-fork.svg",
    "./assets/img/sampah-batu-baterai.svg",
    "./assets/img/trash_green.svg",
    "./assets/img/trash_red.svg",
    "./assets/img/trash_yellow.svg",
    "./assets/img/yuru.jpg",
    "./assets/img/sampah-daun.svg",
    "./assets/img/sampah-detergen.svg",
    "./assets/img/sampah-kaca.svg",
    "./assets/img/sampah-kaleng.svg",
    "./assets/img/sampah-kayu.svg",
    "./assets/img/sampah-kotoran-hewan.svg",
    "./assets/img/sampah-plastik.svg",
    "./assets/img/sampah-sisa-makanan.svg",
    "./assets/img/sampah-telur.svg",
    "./assets/img/stainless-straw.svg"
]
const file=[
    "./index.html",
    "./account-page.html",
    "./login.html",
    "./register.html",
    "./question_page.html",
    "./prize-page.html",
    "./map.html",
    "./style.css",
    "./login-page.css",
    "./src/js/all.js",
    "./all.css",
    "./src/js/jquery-new.js",
    "./sweetalert/dist/sweetalert2.all.js",
    "./sweetalert/dist/sweetalert2.css",
    "./btiga.css",
    "./btiga.html",
    "./organik.html",
    "./anor.css",
    "./anor.html",
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(rtp).then((cache) => {
            return cache.addAll(assets.concat(file))
        }).catch((err)=>{
            // console.error(err)
            return new Promise((resolve,reject)=>{
                reject("error"+err)
            })
        })
    )
})
self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})