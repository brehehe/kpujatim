(function (n) {
    var t;
    t = function (t, i, r, u) {
        this.$el = n(i);
        this.end = t;
        this.active = !1;
        this.interval = 1e3;
        this.callBack = jQuery.isFunction(u) ? u : null;
        this.localization = {days: "days", hours: "hours", minutes: "minutes", seconds: "seconds"};
        n.extend(this.localization, this.localization, r)
    };
    t.prototype = {getCounterNumbers: function () {
            var n = {days: {tens: 0, units: 0, hundreds: 0}, hours: {tens: 0, units: 0}, minutes: {tens: 0, units: 0}, seconds: {tens: 0, units: 0}}, s = 864e5, h = 36e5, c = 6e4, t = 0, l = new Date, i = this.end.getTime() - l.getTime(), r, u, f, e, o;
            return i <= 0 ? n : (r = Math.min(Math.floor(i / s), 999), t = i % s, n.days.hundreds = Math.floor(r / 100), u = r % 100, n.days.tens = Math.floor(u / 10), n.days.units = u % 10, f = Math.floor(t / h), t = t % h, n.hours.tens = Math.floor(f / 10), n.hours.units = f % 10, e = Math.floor(t / c), t = t % c, n.minutes.tens = Math.floor(e / 10), n.minutes.units = e % 10, o = Math.floor(t / 1e3), n.seconds.tens = Math.floor(o / 10), n.seconds.units = o % 10, n)
        }, updatePart: function (t) {
            var r = this.getCounterNumbers(), i = n("." + t, this.$el), u, f;
            t == "days" && (this.setDayHundreds(r.days.hundreds > 0), i.find(".number.hundreds.show").html() != r[t].hundreds && (u = n(".n1.hundreds", i), f = n(".n2.hundreds", i), this.scrollNumber(u, f, r[t].hundreds)));
            i.find(".number.tens.show").html() != r[t].tens && (u = n(".n1.tens", i), f = n(".n2.tens", i), this.scrollNumber(u, f, r[t].tens));
            i.find(".number.units.show").html() != r[t].units && (u = n(".n1.units", i), f = n(".n2.units", i), this.scrollNumber(u, f, r[t].units))
        }, timeOut: function () {
            var n = new Date, t = this.end.getTime() - n.getTime();
            return t <= 0 ? !0 : !1
        }, setDayHundreds: function (t) {
            t ? n(".counter.days", this.$el).addClass("with-hundreds") : n(".counter.days", this.$el).removeClass("with-hundreds")
        }, updateCounter: function () {
            this.updatePart("days");
            this.updatePart("hours");
            this.updatePart("minutes");
            this.updatePart("seconds");
            this.timeOut() && (this.active = !1, this.callBack && this.callBack(this))
        }, localize: function (t) {
            n.isPlainObject(t) && n.extend(this.localization, this.localization, t);
            n(".days", this.$el).siblings(".counter-caption").text(this.localization.days);
            n(".hours", this.$el).siblings(".counter-caption").text(this.localization.hours);
            n(".minutes", this.$el).siblings(".counter-caption").text(this.localization.minutes);
            n(".seconds", this.$el).siblings(".counter-caption").text(this.localization.seconds)
        }, start: function (n) {
            var i, t;
            n && (this.interval = n);
            i = this.interval;
            this.active = !0;
            t = this;
            setTimeout(function () {
                t.updateCounter();
                t.active && t.start()
            }, i)
        }, stop: function () {
            this.active = !1
        }, scrollNumber: function (n, t, i) {
            n.hasClass("show") ? (t.removeClass("hidden-down").css("top", "-100%").text(i).stop().animate({top: 0}, 500, function () {
                t.addClass("show")
            }), n.stop().animate({top: "100%"}, 500, function () {
                n.removeClass("show").addClass("hidden-down")
            })) : (n.removeClass("hidden-down").css("top", "-100%").text(i).stop().animate({top: 0}, 500, function () {
                n.addClass("show")
            }), t.stop().animate({top: "100%"}, 500, function () {
                t.removeClass("show").addClass("hidden-down")
            }))
        }};
    jQuery.fn.mbComingsoon = function (i) {
        var u = {interval: 1e3, callBack: null, localization: {days: "days", hours: "hours", minutes: "minutes", seconds: "seconds"}}, r = {}, f = '   <div class="counter-group" id="myCounter">       <div class="counter-block">           <div class="counter days">               <div class="number show n1 hundreds">0<\/div>               <div class="number show n1 tens">0<\/div>               <div class="number show n1 units">0<\/div>               <div class="number hidden-up n2 hundreds">0<\/div>               <div class="number hidden-up n2 tens">0<\/div>               <div class="number hidden-up n2 units">0<\/div>           <\/div>           <div class="counter-caption">days<\/div>       <\/div>       <div class="counter-block">           <div class="counter hours">               <div class="number show n1 tens">0<\/div>               <div class="number show n1 units">0<\/div>               <div class="number hidden-up n2 tens">0<\/div>               <div class="number hidden-up n2 units">0<\/div>           <\/div>           <div class="counter-caption">hours<\/div>       <\/div>       <div class="counter-block">           <div class="counter minutes">               <div class="number show n1 tens">0<\/div>               <div class="number show n1 units">0<\/div>               <div class="number hidden-up n2 tens">0<\/div>               <div class="number hidden-up n2 units">0<\/div>           <\/div>           <div class="counter-caption">minutes<\/div>       <\/div>       <div class="counter-block">           <div class="counter seconds">               <div class="number show n1 tens">0<\/div>               <div class="number show n1 units">0<\/div>               <div class="number hidden-up n2 tens">0<\/div>               <div class="number hidden-up n2 units">0<\/div>           <\/div>           <div class="counter-caption">seconds<\/div>       <\/div>   <\/div>';
        return this.each(function () {
            var o = n(this), e = o.data("mbComingsoon");
            if (e)
                i == "start" ? e.start() : i == "stop" ? e.stop() : n.isPlainObject(i) && (i.expiryDate instanceof Date && (e.end = i.expiryDate), n.isNumeric(i.interval) && (e.interval = i.interval), n.isFunction(i.callBack) && (e.callBack = i.callBack), n.isPlainObject(i.localization) && this.localize(i.localization));
            else {
                if (i instanceof Date ? r.expiryDate = i : n.isPlainObject(i) ? n.extend(r, u, i) : typeof i == "string" && (r.expiryDate = new Date(i)), !r.expiryDate)
                    throw new Error("Expiry date is required!");
                e = new t(r.expiryDate, o, r.localization, r.callBack);
                o.html(f);
                e.localize();
                e.start()
            }
        })
    }
})(jQuery);
/*
 //# sourceMappingURL=jquery.mb-comingsoon.min.js.map
 */