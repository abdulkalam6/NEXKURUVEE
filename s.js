try {
    (function(w, d) {
        zaraz.debug = (cv = "") => {
            document.cookie = `zarazDebug=${cv}; path=/`;
            location.reload()
        };
        window.zaraz._al = function(bH, bI, bJ) {
            w.zaraz.listeners.push({
                item: bH,
                type: bI,
                callback: bJ
            });
            bH.addEventListener(bI, bJ)
        };
        zaraz.preview = (bK = "") => {
            document.cookie = `zarazPreview=${bK}; path=/`;
            location.reload()
        };
        zaraz.i = function(cn) {
            const co = d.createElement("div");
            co.innerHTML = unescape(cn);
            const cp = co.querySelectorAll("script"),
                cq = d.querySelector("script[nonce]"),
                cr = cq ? .nonce || cq ? .getAttribute("nonce");
            for (let cs = 0; cs < cp.length; cs++) {
                const ct = d.createElement("script");
                cr && (ct.nonce = cr);
                cp[cs].innerHTML && (ct.innerHTML = cp[cs].innerHTML);
                for (const cu of cp[cs].attributes) ct.setAttribute(cu.name, cu.value);
                d.head.appendChild(ct);
                cp[cs].remove()
            }
            d.body.appendChild(co)
        };
        zaraz.f = async function(dC, dD) {
            const dE = {
                credentials: "include",
                keepalive: !0,
                mode: "no-cors"
            };
            if (dD) {
                dE.method = "POST";
                dE.body = new URLSearchParams(dD);
                dE.headers = {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
            return await fetch(dC, dE)
        };
        window.zaraz._p = async bv => new Promise((bw => {
            if (bv) {
                bv.e && bv.e.forEach((bx => {
                    try {
                        const by = d.querySelector("script[nonce]"),
                            bz = by ? .nonce || by ? .getAttribute("nonce"),
                            bA = d.createElement("script");
                        bz && (bA.nonce = bz);
                        bA.innerHTML = bx;
                        bA.onload = () => {
                            d.head.removeChild(bA)
                        };
                        d.head.appendChild(bA)
                    } catch (bB) {
                        console.error(`Error executing script: ${bx}\n`, bB)
                    }
                }));
                Promise.allSettled((bv.f || []).map((bC => fetch(bC[0], bC[1]))))
            }
            bw()
        }));
        zaraz.pageVariables = {};
        zaraz.__zcl = zaraz.__zcl || {};
        zaraz.track = async function(bO, bP, bQ) {
            return new Promise(((bR, bS) => {
                const bT = {
                    name: bO,
                    data: {}
                };
                if (bP ? .__zarazClientEvent) Object.keys(localStorage).filter((bV => bV.startsWith("_zaraz_google_consent_"))).forEach((bU => bT.data[bU] = localStorage.getItem(bU)));
                else {
                    for (const bW of [localStorage, sessionStorage]) Object.keys(bW || {}).filter((bY => bY.startsWith("_zaraz_"))).forEach((bX => {
                        try {
                            bT.data[bX.slice(7)] = JSON.parse(bW.getItem(bX))
                        } catch {
                            bT.data[bX.slice(7)] = bW.getItem(bX)
                        }
                    }));
                    Object.keys(zaraz.pageVariables).forEach((bZ => bT.data[bZ] = JSON.parse(zaraz.pageVariables[bZ])))
                }
                Object.keys(zaraz.__zcl).forEach((b$ => bT.data[`__zcl_${b$}`] = zaraz.__zcl[b$]));
                bT.data.__zarazMCListeners = zaraz.__zarazMCListeners;
                //
                bT.data = { ...bT.data,
                    ...bP
                };
                bT.zarazData = zarazData;
                fetch("/cdn-cgi/zaraz/t", {
                    credentials: "include",
                    keepalive: !0,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bT)
                }).catch((() => {
                    //
                    return fetch("/cdn-cgi/zaraz/t", {
                        credentials: "include",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(bT)
                    })
                })).then((function(cb) {
                    zarazData._let = (new Date).getTime();
                    cb.ok || bS();
                    return 204 !== cb.status && cb.json()
                })).then((async ca => {
                    await zaraz._p(ca);
                    "function" == typeof bQ && bQ()
                })).finally((() => bR()))
            }))
        };
        zaraz.set = function(cc, cd, ce) {
            try {
                cd = JSON.stringify(cd)
            } catch (cf) {
                return
            }
            prefixedKey = "_zaraz_" + cc;
            sessionStorage && sessionStorage.removeItem(prefixedKey);
            localStorage && localStorage.removeItem(prefixedKey);
            delete zaraz.pageVariables[cc];
            if (void 0 !== cd) {
                ce && "session" == ce.scope ? sessionStorage && sessionStorage.setItem(prefixedKey, cd) : ce && "page" == ce.scope ? zaraz.pageVariables[cc] = cd : localStorage && localStorage.setItem(prefixedKey, cd);
                zaraz.__watchVar = {
                    key: cc,
                    value: cd
                }
            }
        };
        for (const {
                m: cg,
                a: ch
            } of zarazData.q.filter((({
                m: ci
            }) => ["debug", "set"].includes(ci)))) zaraz[cg](...ch);
        for (const {
                m: cj,
                a: ck
            } of zaraz.q) zaraz[cj](...ck);
        delete zaraz.q;
        delete zarazData.q;
        zaraz.spaPageview = () => {
            zarazData.l = d.location.href;
            zarazData.t = d.title;
            zaraz.pageVariables = {};
            zaraz.__zarazMCListeners = {};
            zaraz.track("__zarazSPA")
        };
        zaraz.fulfilTrigger = function(cQ, cR, cS, cT) {
            zaraz.__zarazTriggerMap || (zaraz.__zarazTriggerMap = {});
            zaraz.__zarazTriggerMap[cQ] || (zaraz.__zarazTriggerMap[cQ] = "");
            zaraz.__zarazTriggerMap[cQ] += "*" + cR + "*";
            zaraz.track("__zarazEmpty", { ...cS,
                __zarazClientTriggers: zaraz.__zarazTriggerMap[cQ]
            }, cT)
        };
        zaraz._processDataLayer = cV => {
            for (const cW of Object.entries(cV)) zaraz.set(cW[0], cW[1], {
                scope: "page"
            });
            if (cV.event) {
                if (zarazData.dataLayerIgnore && zarazData.dataLayerIgnore.includes(cV.event)) return;
                let cX = {};
                for (let cY of dataLayer.slice(0, dataLayer.indexOf(cV) + 1)) cX = { ...cX,
                    ...cY
                };
                delete cX.event;
                cV.event.startsWith("gtm.") || zaraz.track(cV.event, cX)
            }
        };
        window.dataLayer = w.dataLayer || [];
        const cU = w.dataLayer.push;
        Object.defineProperty(w.dataLayer, "push", {
            configurable: !0,
            enumerable: !1,
            writable: !0,
            value: function(...cZ) {
                let c$ = cU.apply(this, cZ);
                zaraz._processDataLayer(cZ[0]);
                return c$
            }
        });
        dataLayer.forEach((da => zaraz._processDataLayer(da)));
        zaraz._cts = () => {
            zaraz._timeouts && zaraz._timeouts.forEach((bD => clearTimeout(bD)));
            zaraz._timeouts = []
        };
        zaraz._rl = function() {
            w.zaraz.listeners && w.zaraz.listeners.forEach((bE => bE.item.removeEventListener(bE.type, bE.callback)));
            window.zaraz.listeners = []
        };
        history.pushState = function() {
            try {
                zaraz._rl();
                zaraz._cts && zaraz._cts()
            } finally {
                History.prototype.pushState.apply(history, arguments);
                setTimeout(zaraz.spaPageview, 100)
            }
        };
        history.replaceState = function() {
            try {
                zaraz._rl();
                zaraz._cts && zaraz._cts()
            } finally {
                History.prototype.replaceState.apply(history, arguments);
                setTimeout(zaraz.spaPageview, 100)
            }
        };
        zaraz._c = fr => {
            const {
                event: fs,
                ...ft
            } = fr;
            zaraz.track(fs, { ...ft,
                __zarazClientEvent: !0
            })
        };
        zaraz._syncedAttributes = ["altKey", "clientX", "clientY", "pageX", "pageY", "button"];
        zaraz.__zcl.track = !0;
        zaraz._p({
            "e": ["(function(w,d){w.zarazData.executed.push(\"AllTracks\");w.zarazData.executed.push(\"Pageview\");})(window,document)", "(function(w,d){})(window,document)"],
            "f": [
                ["https://bat.bing.com/action/0?evt=pageLoad&ti=187062794&tl=Removalists+Adelaide+%7C+Compare+Prices+%26+Book+Online+-+Muval&rn=657845&sw=562&sh=709&lg=en-US&p=https%3A%2F%2Fwww.muval.com.au%2Fremovalists%2Fadelaide&Ver=2&mid=76ad90bf-ef62-4bfe-94a1-627fc7eac260&msclkid=N", {}],
                ["https://www.google.com/pagead/1p-user-list/AW-817220686/?guid=ON&rnd=1725024252201&fst=1725023770245&cv=9&sendb=1&num=1&u_java=false&url=https%3A%2F%2Fwww.muval.com.au%2Fremovalists%2Fadelaide&tiba=Removalists+Adelaide+%7C+Compare+Prices+%26+Book+Online+-+Muval&u_tz=330&u_his=10&u_h=702&u_w=562&u_ah=709&u_aw=562&ig=1", {
                    "credentials": "include",
                    "mode": "no-cors",
                    "keepalive": true
                }],
                ["https://googleads.g.doubleclick.net/pagead/viewthroughconversion/AW-817220686/?guid=ON&rnd=1725024252201&fst=1725023770245&cv=9&sendb=1&num=1&u_java=false&url=https%3A%2F%2Fwww.muval.com.au%2Fremovalists%2Fadelaide&tiba=Removalists+Adelaide+%7C+Compare+Prices+%26+Book+Online+-+Muval&u_tz=330&u_his=10&u_h=702&u_w=562&u_ah=709&u_aw=562&ig=1", {
                    "credentials": "include",
                    "mode": "no-cors",
                    "keepalive": true
                }]
            ]
        })
    })(window, document)
} catch (e) {
    throw fetch("/cdn-cgi/zaraz/t"), e;
}