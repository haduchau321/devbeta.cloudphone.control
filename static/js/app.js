!function(a) {
    "use strict";

    function c() {
        for (var e = document.getElementById("topnav-menu-content").getElementsByTagName("a"), t = 0, a = e.length; t < a; t++)
            "nav-item dropdown active" === e[t].parentElement.getAttribute("class") && (e[t].parentElement.classList.remove("active"),
            null !== e[t].nextElementSibling && e[t].nextElementSibling.classList.remove("show"))
    }

    function o() {
        document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || (console.log("pressed"),
        a("body").removeClass("fullscreen-enable"))
    }
    a("#side-menu").metisMenu(),
    a("#vertical-menu-btn").on("click", function(e) {
        e.preventDefault(),
        a("body").toggleClass("sidebar-enable"),
        992 <= a(window).width() ? a("body").toggleClass("vertical-collpsed") : a("body").removeClass("vertical-collpsed")
    }),
    a("#sidebar-menu a").each(function() {
        var e = window.location.href.split(/[?#]/)[0];
        this.href == e && (a(this).addClass("active"),
        a(this).parent().addClass("mm-active"),
        a(this).parent().parent().addClass("mm-show"),
        a(this).parent().parent().prev().addClass("mm-active"),
        a(this).parent().parent().parent().addClass("mm-active"),
        a(this).parent().parent().parent().parent().addClass("mm-show"),
        a(this).parent().parent().parent().parent().parent().addClass("mm-active"))
    }),
    a(document).ready(function() {
        var e;
        0 < a("#sidebar-menu").length && 0 < a("#sidebar-menu .mm-active .active").length && (300 < (e = a("#sidebar-menu .mm-active .active").offset().top) && (e -= 300,
        a(".vertical-menu .simplebar-content-wrapper").animate({
            scrollTop: e
        }, "slow")))
    }),
    a(".navbar-nav a").each(function() {
        var e = window.location.href.split(/[?#]/)[0];
        this.href == e && (a(this).addClass("active"),
        a(this).parent().addClass("active"),
        a(this).parent().parent().addClass("active"),
        a(this).parent().parent().parent().addClass("active"),
        a(this).parent().parent().parent().parent().addClass("active"),
        a(this).parent().parent().parent().parent().parent().addClass("active"),
        a(this).parent().parent().parent().parent().parent().parent().addClass("active"))
    }),
    a('[data-bs-toggle="fullscreen"]').on("click", function(e) {
        e.preventDefault(),
        a("body").toggleClass("fullscreen-enable"),
        document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ? document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }),
    document.addEventListener("fullscreenchange", o),
    document.addEventListener("webkitfullscreenchange", o),
    document.addEventListener("mozfullscreenchange", o),
    a(".right-bar-toggle").on("click", function(e) {
        a("body").toggleClass("right-bar-enabled")
    }),
    a(document).on("click", "body", function(e) {
        0 < a(e.target).closest(".right-bar-toggle, .right-bar").length || a("body").removeClass("right-bar-enabled")
    }),
    function() {
        if (document.getElementById("topnav-menu-content")) {
            for (var e = document.getElementById("topnav-menu-content").getElementsByTagName("a"), t = 0, a = e.length; t < a; t++)
                e[t].onclick = function(e) {
                    "#" === e.target.getAttribute("href") && (e.target.parentElement.classList.toggle("active"),
                    e.target.nextElementSibling.classList.toggle("show"))
                }
                ;
            window.addEventListener("resize", c)
        }
    }(),
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(e) {
        return new bootstrap.Tooltip(e)
    }),
    [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(e) {
        return new bootstrap.Popover(e)
    }),
    [].slice.call(document.querySelectorAll(".offcanvas")).map(function(e) {
        return new bootstrap.Offcanvas(e)
    }),
    a(window).on("load", function() {
        a("#status").fadeOut(),
        a("#preloader").delay(350).fadeOut("slow")
    }),
    Waves.init(),
    a("#checkAll").on("change", function() {
        a(".table-check .form-check-input").prop("checked", a(this).prop("checked"))
    }),
    a(".table-check .form-check-input").change(function() {
        a(".table-check .form-check-input:checked").length == a(".table-check .form-check-input").length ? a("#checkAll").prop("checked", !0) : a("#checkAll").prop("checked", !1)
    })
}(jQuery);

$('body').append(`<div class="modal fade" id="loader" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="loaderLabel" style="display: none;" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document" style="border: none;background-color: rgba(0, 0, 0, 0);">
        <div class="modal-content" style="border: none;background-color: rgba(0, 0, 0, 0);">
            <div class="modal-body">
                <div class="centerY" id="loader" >
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
            </div>
        </div> 
    </div>
</div>`);

$.ajaxSetup({
    beforeSend: function() {$('#loader').modal("show")},
    complete: function(){setTimeout(()=>{$('#loader').modal("hide")},1000)}
});