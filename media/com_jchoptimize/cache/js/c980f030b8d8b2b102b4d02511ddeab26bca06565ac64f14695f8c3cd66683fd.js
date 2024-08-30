try {
    (function() {
        "use strict";
        const u = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
            d = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
            f = (t, e) => {
                const o = t.nodeName.toLowerCase();
                return e.includes(o) ? u.has(o) ? !!d.test(t.nodeValue) : !0 : e.filter(r => r instanceof RegExp).some(r => r.test(o))
            };

        function p(t, e, o) {
            if (!t.length) return t;
            if (o && typeof o == "function") return o(t);
            const a = new window.DOMParser().parseFromString(t, "text/html"),
                l = [].concat(...a.body.querySelectorAll("*"));
            for (const n of l) {
                const c = n.nodeName.toLowerCase();
                if (!Object.keys(e).includes(c)) {
                    n.remove();
                    continue
                }
                const J = [].concat(...n.attributes),
                    h = [].concat(e["*"] || [], e[c] || []);
                for (const m of J) f(m, h) || n.removeAttribute(m.nodeName)
            }
            return a.body.innerHTML
        }
        const i = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i, /^data-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: [],
            button: ["type"],
            input: ["accept", "alt", "autocomplete", "autofocus", "capture", "checked", "dirname", "disabled", "height", "list", "max", "maxlength", "min", "minlength", "multiple", "type", "name", "pattern", "placeholder", "readonly", "required", "size", "src", "step", "value", "width", "inputmode"],
            select: ["name"],
            textarea: ["name"],
            option: ["value", "selected"]
        };
        window.Joomla = window.Joomla || {}, Joomla.editors = Joomla.editors || {}, Joomla.editors.instances = Joomla.editors.instances || {}, Joomla.Modal = Joomla.Modal || {
            current: "",
            setCurrent: t => {
                Joomla.Modal.current = t
            },
            getCurrent: () => Joomla.Modal.current
        }, Joomla.extend = (t, e) => {
            let o = t;
            return t === null && (o = {}), [].slice.call(Object.keys(e)).forEach(r => {
                o[r] = e[r]
            }), t
        }, Joomla.optionsStorage = Joomla.optionsStorage || null, Joomla.getOptions = (t, e) => (Joomla.optionsStorage || Joomla.loadOptions(), Joomla.optionsStorage[t] !== void 0 ? Joomla.optionsStorage[t] : e), Joomla.loadOptions = t => {
            if (!t) {
                const e = [].slice.call(document.querySelectorAll(".joomla-script-options.new"));
                let o = 0;
                if (e.forEach(r => {
                        const a = r.text || r.textContent,
                            l = JSON.parse(a);
                        l && (Joomla.loadOptions(l), o += 1), r.className = r.className.replace(" new", " loaded")
                    }), o) return
            }
            Joomla.optionsStorage ? t && [].slice.call(Object.keys(t)).forEach(e => {
                t[e] !== null && typeof Joomla.optionsStorage[e] == "object" && typeof t[e] == "object" ? Joomla.optionsStorage[e] = Joomla.extend(Joomla.optionsStorage[e], t[e]) : Joomla.optionsStorage[e] = t[e]
            }) : Joomla.optionsStorage = t || {}
        }, Joomla.Text = {
            strings: {},
            _: (t, e) => {
                let o = t,
                    r = e;
                const a = Joomla.getOptions("joomla.jtext");
                return a && (Joomla.Text.load(a), Joomla.loadOptions({
                    "joomla.jtext": null
                })), r = r === void 0 ? o : r, o = o.toUpperCase(), Joomla.Text.strings[o] !== void 0 ? Joomla.Text.strings[o] : r
            },
            load: t => ([].slice.call(Object.keys(t)).forEach(e => {
                Joomla.Text.strings[e.toUpperCase()] = t[e]
            }), Joomla.Text)
        }, Joomla.JText = Joomla.Text, Joomla.submitform = (t, e, o) => {
            let r = e;
            const a = t;
            r || (r = document.getElementById("adminForm")), a && (r.task.value = a), r.noValidate = !o, o ? r.hasAttribute("novalidate") && r.removeAttribute("novalidate") : r.setAttribute("novalidate", "");
            const l = document.createElement("input");
            l.classList.add("hidden"), l.type = "submit", r.appendChild(l).click(), r.removeChild(l)
        }, Joomla.submitbutton = (t, e, o) => {
            let r = document.querySelector(e || "form.form-validate"),
                a = o;
            if (typeof e == "string" && r === null && (r = document.querySelector(`#${e}`)), r) {
                if (a == null) {
                    const l = t.split(".");
                    let n = r.getAttribute("data-cancel-task");
                    n || (n = `${l[0]}.cancel`), a = t !== n
                }(!a || document.formvalidator.isValid(r)) && Joomla.submitform(t, r)
            } else Joomla.submitform(t)
        }, Joomla.checkAll = (t, e) => {
            if (!t.form) return !1;
            const o = e || "cb",
                r = [].slice.call(t.form.elements);
            let a = 0;
            return r.forEach(l => {
                l.type === t.type && l.id.indexOf(o) === 0 && (l.checked = t.checked, a += l.checked ? 1 : 0)
            }), t.form.boxchecked && (t.form.boxchecked.value = a, t.form.boxchecked.dispatchEvent(new CustomEvent("change", {
                bubbles: !0,
                cancelable: !0
            }))), !0
        }, Joomla.isChecked = (t, e) => {
            let o = e;
            if (typeof o > "u" ? o = document.getElementById("adminForm") : typeof e == "string" && (o = document.getElementById(e)), o.boxchecked.value = t ? parseInt(o.boxchecked.value, 10) + 1 : parseInt(o.boxchecked.value, 10) - 1, o.boxchecked.dispatchEvent(new CustomEvent("change", {
                    bubbles: !0,
                    cancelable: !0
                })), !o.elements["checkall-toggle"]) return;
            let r = !0,
                a, l, n;
            for (a = 0, n = o.elements.length; a < n; a++)
                if (l = o.elements[a], l.type === "checkbox" && l.name !== "checkall-toggle" && !l.checked) {
                    r = !1;
                    break
                }
            o.elements["checkall-toggle"].checked = r
        }, Joomla.tableOrdering = (t, e, o, r) => {
            let a = r;
            typeof a > "u" ? a = document.getElementById("adminForm") : typeof r == "string" && (a = document.getElementById(r)), a.filter_order.value = t, a.filter_order_Dir.value = e, Joomla.submitform(o, a)
        }, Joomla.listItemTask = (t, e, o = null) => {
            let r = o;
            o !== null ? r = document.getElementById(o) : r = document.adminForm;
            const a = r[t];
            let l = 0,
                n;
            if (!a) return !1;
            for (; n = r[`cb${l}`], !!n;) n.checked = !1, l += 1;
            return a.checked = !0, r.boxchecked.value = 1, Joomla.submitform(e, r), !1
        }, Joomla.replaceTokens = t => {
            if (!/^[0-9A-F]{32}$/i.test(t)) return;
            [].slice.call(document.getElementsByTagName("input")).forEach(o => {
                o.type === "hidden" && o.value === "1" && o.name.length === 32 && (o.name = t)
            })
        }, Joomla.request = t => {
            const e = Joomla.extend({
                    url: "",
                    method: "GET",
                    data: null,
                    perform: !0,
                    promise: !1
                }, t),
                o = (r, a) => {
                    const l = new XMLHttpRequest;
                    if (l.open(e.method, e.url, !0), l.setRequestHeader("X-Requested-With", "XMLHttpRequest"), l.setRequestHeader("X-Ajax-Engine", "Joomla!"), e.method !== "GET") {
                        const n = Joomla.getOptions("csrf.token", "");
                        n && (!e.url.startsWith("http:") && !e.url.startsWith("https:") || e.url.startsWith(window.location.origin)) && l.setRequestHeader("X-CSRF-Token", n), typeof e.data == "string" && (!e.headers || !e.headers["Content-Type"]) && l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    }
                    if (e.headers && [].slice.call(Object.keys(e.headers)).forEach(n => {
                            n === "Content-Type" && e.headers["Content-Type"] === "false" || l.setRequestHeader(n, e.headers[n])
                        }), l.onreadystatechange = () => {
                            l.readyState === 4 && (l.status === 200 ? e.promise ? r.call(window, l) : r.call(window, l.responseText, l) : a.call(window, l), e.onComplete && !e.promise && e.onComplete.call(window, l))
                        }, e.perform) {
                        if (e.onBefore && e.onBefore.call(window, l) === !1) return e.promise && r.call(window, l), l;
                        l.send(e.data)
                    }
                    return l
                };
            if (e.promise) return new Promise((r, a) => {
                e.perform = !0, o(r, a)
            });
            try {
                return o(e.onSuccess || (() => {}), e.onError || (() => {}))
            } catch (r) {
                return console.error(r), !1
            }
        };
        let s;
        Joomla.enqueueRequest = t => {
            if (!t.promise) throw new Error("Joomla.enqueueRequest supports only Joomla.request as Promise");
            return s ? s = s.then(() => Joomla.request(t)) : s = Joomla.request(t), s
        }, Joomla.sanitizeHtml = (t, e, o) => {
            const r = e == null ? i : { ...i,
                ...e
            };
            return p(t, r, o)
        }, Joomla.ajaxErrorsMessages = (t, e) => {
            const o = {};
            if (e === "parsererror") {
                const r = [];
                let a = t.responseText.trim();
                for (let l = a.length - 1; l >= 0; l--) r.unshift(["&#", a[l].charCodeAt(), ";"].join(""));
                a = r.join(""), o.error = [Joomla.Text._("JLIB_JS_AJAX_ERROR_PARSE").replace("%s", a)]
            } else e === "nocontent" ? o.error = [Joomla.Text._("JLIB_JS_AJAX_ERROR_NO_CONTENT")] : e === "timeout" ? o.error = [Joomla.Text._("JLIB_JS_AJAX_ERROR_TIMEOUT")] : e === "abort" ? o.error = [Joomla.Text._("JLIB_JS_AJAX_ERROR_CONNECTION_ABORT")] : t.responseJSON && t.responseJSON.message ? o.error = [`${Joomla.Text._("JLIB_JS_AJAX_ERROR_OTHER").replace("%s",t.status)} <em>${t.responseJSON.message}</em>`] : t.statusText ? o.error = [`${Joomla.Text._("JLIB_JS_AJAX_ERROR_OTHER").replace("%s",t.status)} <em>${t.statusText}</em>`] : o.error = [Joomla.Text._("JLIB_JS_AJAX_ERROR_OTHER").replace("%s", t.status)];
            return o
        }
    })();
} catch (e) {
    console.error('Error in file:/media/system/js/core.min.js?37ffe4186289eba9c5df81bea44080aff77b9684; Error:' + e.message);
};