window.onload = function() {
    $("#iconMenu").on('click', function(e) {
        $(".fixed-menu-mobile").css({ 'left': 0 }).addClass('open');
        e.stopPropagation();
    });

    // show on hover (desktop)
    $("#iconMenu").on('mouseenter', function(e) {
        $(".fixed-menu-mobile").css({ 'left': 0 }).addClass('open');
    });

    // hide when leaving the menu area
    $(".fixed-menu-mobile").on('mouseleave', function(e) {
        $(this).css({ 'left': '-300px' }).removeClass('open');
    });

    $(".nav-close").on('click', function(e) {
        $(".fixed-menu-mobile").css({ 'left': "-300px" }).removeClass('open');
    });

    $(".fixed-menu-mobile").click(function(e) {
        e.stopPropagation();
    });

    $(document).click(function() {
        $(".fixed-menu-mobile").css({ 'left': "-300px" }).removeClass('open');
    });

    $(".my-games").on('click', function() {
        $(".overlayer").addClass("active");
        $(".mygames__panel").addClass("active");
        loadStorageGames()
        $("html,body").attr('style', 'overflow:hidden');
    })

    $(".mygames__panel--close, .overlayer").on('click', function() {
        $(".overlayer").removeClass("active");
        $(".mygames__panel").removeClass("active");
        $("html,body").attr('style', '');
    })

    $("#close__game-controls").on('click', function() {
        $("#game-controls").hide();
        $("#game-controls-toggle-button").removeClass("active")
    })

    $("#game-controls-toggle-button").on('click', function(e) {
        e.stopPropagation();
        $(this).addClass('active');
        $("#game-controls").toggle();
        if ($("#game-controls").is(":hidden")) {
            $(this).removeClass("active")
        }
    })

    $("#game-controls").on('click', function(e) {
        e.stopPropagation();
    })
    window.addEventListener('message', function(event) {
        if (event.data === 'iframeClick') {
            $("#game-controls").hide();
            $("#game-controls-toggle-button").removeClass("active");
        }
    });

    $(document).on('click', function() {
        $("#game-controls").hide();
        $("#game-controls-toggle-button").removeClass("active");
    })

    //hide report
    $("#report-close, #report__layer").on('click', function() {
        $("#report__layout").hide();
        $("#report__layer").hide();
        $("#report__form").hide();
        $("html,body").attr('style', '');
    })

    //show report
    $("#reportGame").on('click', function() {
        $("#report__layout").show();
        $("#report__layer").show();
        $("#report__form").show();
        $("html,body").attr('style', 'overflow:hidden');
    })


    function validateForm() {
        const issue = $('#report_select').val();
        const message = $('textarea[name="game[message]"]').val().trim();

        const isValid = issue !== '' && message.length >= 20;

        // Show/hide error message
        if (message.length < 20 && message.length > 0) {
            $('#report-error-message').show();
        } else {
            $('#report-error-message').hide();
        }
        if (isValid) {
            $('.css-1osun8m').prop('disabled', !isValid).removeClass("Mui-disabled");
        } else {
            $('.css-1osun8m').prop('disabled', !isValid).addClass("Mui-disabled");
        }
    }

    $('#report_select, textarea[name="game[message]"]').on('change input', validateForm);
    $('.css-1osun8m').on('click', function() {
        $('#form-report').submit();
    })
    // Form submission
    $('#form-report').on('submit', function(e) {
        e.preventDefault();
        const issue = $('#report_select').val();
        const message = $('textarea[name="game[message]"]').val().trim();
        if (issue == '') {
            $('#report-error-message').text('Please select an issue').show();
            return;
        }
        if (message.length < 20) {
            $('#report-error-message').text('Your message must contain at least 20 characters').show();
            return;
        }
        const gameName = $('input[name="game[name]"]').val().trim();
        const email = $('input[name="game[email]"]').val().trim();
        const game_url = $('input[name="game[url]"]').val().trim();
        const formData = {
            'game[name]': gameName,
            'game[issue]': issue,
            'game[email]': email,
            'game[message]': message,
            'game[url]': game_url
        };

        $.ajax({
            url: '/report.ajax',
            type: 'POST',
            data: formData,
            success: function(response) {
                $('#report-error-message').text('Report sent successfully!').css('color', 'green').show();
                $('.css-1osun8m').prop('disabled', true).addClass("Mui-disabled");
                $('#report_select').val('')
                $('textarea[name="game[message]"]').val('')
                $('input[name="game[email]"]').val('')
                $('#report_select').val('')
                setTimeout(() => {
                    $('#report-error-message').hide();
                    $('#report-error-message').text('Your message must contain at least 20 characters').css("color", "rgb(231, 13, 92)")
                }, 3000)
            },
            error: function(xhr, status, error) {
                $('#report-error-message').text('Failed to send report. Please try again.').css('color', 'rgb(231, 13, 92)').show();
            }
        });
    });

    expand();
}

function loadStorageGames() {
    loadRecentStorageGame();
    loadFavouritesStorageGame();
    loadLikesStorageGame();
}

function loadFavouritesStorageGame() {
    let games = azStorage.arrayFavoritesStorage;
    let html = buildMyGamesHtml(games, 'favorites');
    pushToMyGames(html, "#favorites-layout");
}

function loadRecentStorageGame() {
    let games = azStorage.arrayRecentStorage;
    let html = buildMyGamesHtml(games, 'recent');
    pushToMyGames(html, "#recent-layout");
}

function loadLikesStorageGame() {
    let games = azStorage.arrayLikesStorage;
    let html = buildMyGamesHtml(games, 'liked');
    pushToMyGames(html, "#liked-layout");
}

function buildMyGamesHtml(gamesList = [], action = 'recent') {
    let html = '';
    if (!gamesList.length) {
        return html = '<div class="css-h0cm5o"><div style="padding-left: 32px; padding-right: 32px; margin-top: 8px;"><div class="css-11o2ve7">No games found!</div></div></div>';
    }

    html += `<div class="mygames__panel--container">`;
    html += `<div class="mygames__panel--grid">`;
    for (let t = gamesList.length - 1; t >= 0; t--) {
        let game = gamesList[t];
        html += `<div class="us-grid-game">`;
        html += `<a class="us-game-link" href="/${game.slug}">`;
        html += `<div class="us-wrap-image">`;
        html += `<img width="144" height="144" loading="" src="${game.image}" title="${game.name}" alt="${game.name}" />`;
        html += `<div class="us-game-title" title="${game.name}">`;
        html += `<span class="text-overflow">${game.name}</span>`;
        html += `</div>`;
        html += `</div>`;
        html += `</a>`;
        html += `<div class="mygames__panel--remove" onclick="removeGameStorage(this,event)" data-slug="${game.slug}" data-action="${action}">
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" class="css-6qu7l6"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"></path></svg>
        </div>`;
        html += `</div>`;
    }

    html += `</div>`;
    html += `</div>`;

    return html;
}

function pushToMyGames(html, id) {
    document.querySelector(id).innerHTML = html;
}

function removeGameStorage(me, e) {
    e.preventDefault();
    let action = me.getAttribute("data-action");
    let game_slug = me.getAttribute("data-slug");
    let parent = me.parentNode;
    parent.remove();
    switch (action) {
        case 'favorites':
            $("#addFavoritesGame").removeClass('active')
            $("#addFavoritesGame").attr("data-title", "Add to favorites");
            azStorage.removeFavoritesGame(game_slug);
            break;
        case 'liked':
            $("#likegame").removeClass('active')
            $("#likegame").attr("data-title", "Like");
            azStorage.removeLikeGame(game_slug);
            break;
        case 'recent':
            azStorage.removeRecentGame(game_slug);
            break;
        default:
    }
}

function likeGames(game_id) {
    if (!game_id) return;
    let url = '/likegame.ajax';
    let like_num = $("#like-number").attr('data-likes') || 0;;
    let current_like = '';
    if ($("#likegame").hasClass("active")) {
        $("#likegame").removeClass("active");
        $("#likegame").attr("data-title", "Like");
        url = '/unlike.ajax';
        azStorage.removeLikeGame(objGame.slug)
        current_like = parseInt(like_num) - 1 <= 0 ? "" : parseInt(like_num) - 1;
    } else {
        $("#likegame").addClass("active");
        $("#likegame").attr("data-title", "Unlike");
        azStorage.addLikeGame(objGame)
        current_like = parseInt(like_num) + 1;
    }
    let text_like = '';
    if (current_like > 0) {
        text_like = formatNumberCompact(current_like);
    } else {
        text_like = current_like;
    }
    $("#like-number").html(text_like)
    $.ajax(({
        type: "POST",
        url: url,
        data: {
            game_id: game_id
        },
        success: function(res) {
            // if (res) {
            // res = JSON.parse(res)
            // }
            // $("#like-number").html(res.likes)
        }
    }))
}

function formatNumberCompact(input) {
    input = parseInt(input);
    const p = input / 1000;
    if (p >= 1000) {
        return (input / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (p >= 100) {
        return (input / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else if (p >= 10) {
        return (input / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else if (p >= 1) {
        return (input / 1000).toFixed(2).replace(/\.00$/, '') + 'K';
    } else {
        return input;
    }
}

function paging(p) {
    $(".gif").removeClass("hidden");
    var url = '/paging.ajax';
    $.ajax({
        type: "POST",
        url: url,
        data: {
            page: p,
            keywords: keywords,
            tags_id: tag_id,
            category_id: category_id,
            field_order: field_order,
            order_type: order_type,
            is_hot: is_hot,
            is_new: is_new,
            is_trending: is_trending,
            is_popular: is_popular,
            limit: limit,
            title: title
        },
        success: function(xxxx) {
            let new_page = parseInt(p) + 1;
            if (new_page > max_page) {
                $("#ajax-append .next_page").hide();
            }
            $(".gif").addClass("hidden");
            if (xxxx !== '') {
                let data = JSON.parse(xxxx);
                $("#ajax-append .us-grid-clayover").append(data.content);
                $("#ajax-append .next_page").attr('onclick', `paging(${new_page})`)
            }
        }
    });
}

function addToFavourites(me) {
    if (typeof(objGame) == 'object' && typeof(azStorage) == 'object') {
        if ($(me).hasClass('active')) {
            $(me).removeClass('active')
            $(me).attr('data-title', 'Add to favorites')
            azStorage.removeFavoritesGame(objGame.slug);
        } else {
            $(me).addClass('active')
            $(me).attr('data-title', 'Remove from favorites')
            azStorage.addFavoritesGame(objGame);
        }
    }
}

function theaterMode() {
    let iframe = document.querySelector("#iframehtml5");
    if (iframe.classList.contains("force_half_full_screen")) {
        iframe.classList.remove("force_half_full_screen");
        document.body.style.overflow = "unset";
        document.querySelector("#header-game").classList.remove("header_game_enable_half_full_screen");
    } else {
        let above = 0;
        let left = 0;
        let below = document.querySelector("#header-game").clientHeight;
        let right = 0;
        // let width = window.innerWidth;
        // let height = window.innerHeight;
        if (!document.querySelector("#style-append")) {
            let styleElement = document.createElement("style");
            styleElement.type = "text/css";
            styleElement.setAttribute('id', "style-append");
            let cssCode = `
        .force_half_full_screen{
        position: fixed!important;
        top: 0!important;
        left: 0!important;
        z-index: 887;
        top:${above}px!important;
        left:${left}px!important;
        width:calc(100% - ${left}px)!important;
        height:calc(100% - ${above + below}px)!important;
        background-color:#000;
        }
        .header_game_enable_half_full_screen{
            position:fixed;
            left:${left}px!important;
            bottom:0!important;
            right:0!important;
            z-index:887!important;
            width:calc(100% - ${left}px)!important;
            padding-left:10px;
            padding-right:10px;
            margin:0;
        }
        @media (max-width: 1364px){
            .force_half_full_screen{
                left:0!important;
                width:100%!important;
            }
            .header_game_enable_half_full_screen{
                width:100%!important;
                left:0!important;
            }
        }`
            styleElement.innerHTML = cssCode;
            document.querySelector('head').appendChild(styleElement);
        }
        document.body.style.overflow = "hidden";
        iframe.classList.add("force_half_full_screen")
        document.querySelector("#header-game").classList.add("header_game_enable_half_full_screen")
    }
}

function reloadIframe() {
    let linkIframe = $("#iframehtml5").attr('src');
    $("#iframehtml5").attr('src', linkIframe);
}

function expand() {
    $("#expand").on('click', function() {
        $("#iframehtml5").addClass("force_full_screen");
        $("#_exit_full_screen").removeClass('hidden');
        requestFullScreen(document.body);
    });
    $("#_exit_full_screen").on('click', cancelFullScreen);
}

function scrollToDiv(element) {
    if ($(element).length) {
        $('html,body').animate({
            scrollTop: $(element).offset().top - 100
        }, 'slow');
    }
}

function closeBox() {
    $(".close-sharing-box").hide();
    $(".clipboard-share").addClass("hide-zindex");
}

function showSharingBox() {
    $(".close-sharing-box").show();
    $(".clipboard-share").removeClass("hide-zindex");
}

function runValidate() {
    jQuery("#contact-form").validate({
        focusInvalid: false,
        onfocusout: false,
        ignore: ".ignore",
        errorElement: "div",
        errorPlacement: function(error, element) {
            error.appendTo("div#contact_err");
        },
        rules: {
            Name: {
                required: true,
                maxlength: 255,
            },
            Email: {
                required: true,
                email: true,
                maxlength: 100
            },
            Website: {
                required: false,
                maxlength: 255,
            },
            Topic: {
                required: false,
                maxlength: 255,
            },
            Message: {
                required: true,
                maxlength: 65525
            },
            "contactChecked": {
                required: true
            }
        },
        messages: {
            Name: {
                required: "Please type your name!",
                maxlength: "255"
            },
            Email: {
                required: "Please type your email!",
                email: "Please check a valid email!",
                maxlength: "100"
            },
            Message: {
                required: "Please type your message!",
                maxlength: "65525"
            },
            "contactChecked": {
                required: "Please agree to the terms and conditions before comment."
            }
        },
        submitHandler: function() {
            let question_ajax = "/make-contact.ajax";
            let name = jQuery("#Name").val();
            let email = jQuery("#Email").val();
            let website = jQuery("#Website").val();
            let subject = jQuery("#Topic").val();
            let message = jQuery("#Message").val();
            let metadataload = {};
            metadataload.name = name;
            metadataload.email = email;
            metadataload.website = website;
            metadataload.subject = subject;
            metadataload.message = message;
            jQuery.ajax({
                url: question_ajax,
                data: metadataload,
                type: 'POST',
                success: function(data) {
                    if (data != 0 || data != '0') {
                        showSuccessMessage();
                    }
                }
            });
        }
    });
}

function showSuccessMessage(message) {
    document.getElementById('fcf-status').innerHTML = '';
    document.getElementById('fcf-form').style.display = 'none';
    document.getElementById('fcf-thank-you').style.display = 'block';
}

function resetFormDemo() {
    document.getElementById('fcf-form').style.display = "block";
    document.getElementById('fcf-thank-you').style.display = "none";
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).attr('href')).select();
    document.execCommand("copy");
    $temp.remove();
}

function requestFullScreen(element) {
    $("#iframehtml5").removeClass("force_half_full_screen");
    $("#header-game").removeClass("header_game_enable_half_full_screen");
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function cancelFullScreen() {
    $("#_exit_full_screen").addClass('hidden');
    $("#iframehtml5").removeClass("force_full_screen");
    $("#iframehtml5").removeClass("force_half_full_screen");
    $("#header-game").removeClass("header_game_enable_half_full_screen");
    document.body.style.overflow = "unset";
    fitIframe();
    var requestMethod = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.exitFullScreenBtn;
    if (requestMethod) { // cancel full screen.
        requestMethod.call(document);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function exitHandler() {
    if (document.webkitIsFullScreen === false ||
        document.mozFullScreen === false ||
        document.msFullscreenElement === false) {
        cancelFullScreen();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const gameThumbLinks = document.querySelectorAll('.us-game-link');
    if (gameThumbLinks.length) {
        handleThumbVideo(gameThumbLinks);
    }

    // Initialize the search overlay so header search inputs show suggestions.
    initSearchOverlay();

    function handleThumbVideo(gameThumbLinks) {
        gameThumbLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const videoSrc = link.dataset.videosrc;

                if (!videoSrc) {
                    return;
                }

                if (link.querySelector('.GameThumb_gameThumbVideo__jgUDS')) {
                    const videoElement = link.querySelector('.GameThumb_gameThumbVideo__jgUDS video');
                    if (videoElement) {
                        videoElement.play();
                    }
                    return;
                }

                pushVideo(link, videoSrc)
            });

            link.addEventListener('mouseleave', () => {
                const videoContainer = link.querySelector('.GameThumb_gameThumbVideo__jgUDS');
                if (videoContainer) {
                    link.removeChild(videoContainer);
                }
            });
        });
    }

    function pushVideo(link, videoSrc) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'GameThumb_gameThumbVideo__jgUDS';

        const videoElement = document.createElement('video');
        videoElement.loop = true;
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.playsinline = true;
        videoElement.preload = 'auto';
        videoElement.disableremoteplayback = true;

        const sourceElement = document.createElement('source');
        sourceElement.src = videoSrc;
        sourceElement.type = 'video/mp4';

        videoElement.appendChild(sourceElement);
        videoContainer.appendChild(videoElement);
        const gradientVignette = link.querySelector('.GameThumb_gradientVignette__Q04oZ');
        if (gradientVignette) {
            link.insertBefore(videoContainer, gradientVignette);
        } else {
            link.appendChild(videoContainer);
        }
    }
});

// ----------------------------------------------------------
// Client-side search overlay (auto-suggest) for the header search inputs.
// Builds an in-memory index from the existing game grid and shows results as the user types.
// ----------------------------------------------------------

let __searchGameIndex = null;
let __searchOverlay = null;
let __searchOverlayInput = null;

function initSearchOverlay() {
    const desktopInput = document.getElementById('txt-search1');
    const mobileInput = document.getElementById('txt-search2');
    if (!desktopInput && !mobileInput) return;

    buildSearchGameIndex();
    createSearchOverlay();

    const inputs = [desktopInput, mobileInput].filter(Boolean);
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            openSearchOverlay(input.value || '');
        });
        input.addEventListener('input', (e) => {
            openSearchOverlay(e.target.value || '');
        });

        const form = input.closest('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                openSearchOverlay(input.value || '');
            });
        }
    });
}

function buildSearchGameIndex() {
    if (__searchGameIndex) return;

    __searchGameIndex = [];

    const pageLinks = Array.from(document.querySelectorAll('.us-game-link'));
    if (pageLinks.length) {
        pageLinks.forEach((link) => {
            const titleEl = link.querySelector('.us-game-title');
            const title = (titleEl && titleEl.textContent.trim()) || link.getAttribute('title') || '';
            const img = link.querySelector('img');
            const imgSrc = img ? img.getAttribute('src') : '';
            const href = link.getAttribute('href') || '';
            if (!title || !href) return;
            __searchGameIndex.push({
                title: title.trim(),
                titleLower: title.trim().toLowerCase(),
                href: href,
                img: imgSrc,
            });
        });
        return;
    }

    // Fallback for single-game views (no .us-game-link): load from games.json
    fetch('/assest/data/games.json')
        .then((r) => {
            if (!r.ok) throw new Error('games.json not found');
            return r.json();
        })
        .then((items) => {
            if (!Array.isArray(items)) return;
            __searchGameIndex = items
                .filter((g) => g.title && g.href)
                .map((g) => ({
                    title: g.title,
                    titleLower: g.title.toLowerCase(),
                    href: g.href,
                    img: g.img || '',
                }));
        })
        .catch((err) => {
            console.warn('Search index fallback load failed', err);
        });
}

function createSearchOverlay() {
    if (__searchOverlay) return;

    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
        <div class="search-modal" role="dialog" aria-modal="true" aria-label="Search games">
            <div class="search-modal__header">
                <div class="search-modal__input-wrapper">
                    <input class="search-modal__input" type="text" placeholder="Search games..." aria-label="Search games" />
                </div>
                <button class="search-modal__close" type="button" aria-label="Close search">✕</button>
            </div>
            <div class="search-modal__results" role="region" aria-live="polite"></div>
        </div>
    `;

    document.body.appendChild(overlay);
    __searchOverlay = overlay;
    __searchOverlayInput = overlay.querySelector('.search-modal__input');

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeSearchOverlay();
    });

    overlay.querySelector('.search-modal__close').addEventListener('click', closeSearchOverlay);

    __searchOverlayInput.addEventListener('input', (event) => {
        updateSearchResults(event.target.value || '');
    });

    __searchOverlayInput.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSearchOverlay();
            return;
        }
        if (event.key === 'Enter') {
            const first = overlay.querySelector('.search-item');
            if (first) {
                event.preventDefault();
                first.click();
            }
        }
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .search-overlay { position: fixed; inset: 0; display: none; align-items: flex-start; justify-content: center; padding: 2.5rem 1rem 1rem; background: rgba(0,0,0,0.55); z-index: 9999; overflow: auto; }
        .search-modal { width: min(1120px, 100%); max-height: 90vh; background: #e9e1e1; border-radius: 18px; box-shadow: 0 24px 60px rgba(0,0,0,0.35); overflow: hidden; display: flex; flex-direction: column; }
        .search-modal__header { display: flex; align-items: center; padding: 16px; gap: 12px; border-bottom: 1px solid rgba(0,0,0,0.07); }
        .search-modal__input-wrapper { flex: 1; }
        .search-modal__input { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.16); font-size: 16px; outline: none; }
        .search-modal__input:focus { border-color: rgba(0,0,0,0.32); box-shadow: 0 0 0 3px rgba(0,0,0,0.06); }
        .search-modal__close { width: 38px; height: 38px; border: none; background: rgba(0,0,0,0.08); border-radius: 50%; cursor: pointer; font-size: 18px; line-height: 1; display: grid; place-items: center; }
        .search-modal__close:hover { background: rgba(0,0,0,0.14); }
        .search-modal__results { padding: 16px; overflow: auto; }
        .search-modal__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
        .search-item { display: block; border-radius: 14px; overflow: hidden; text-decoration: none; color: inherit; background: #fff; box-shadow: 0 6px 18px rgba(0,0,0,0.08); transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .search-item:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(0,0,0,0.14); }
        .search-item__thumb { width: 100%; display: block; }
        .search-item__title { padding: 10px 10px 12px; font-size: 14px; font-weight: 700; text-align: center; line-height: 1.2; }
        .search-item__empty { padding: 40px 0; text-align: center; color: rgba(0,0,0,0.65); font-size: 15px; }
    `;
    document.head.appendChild(style);
}

function openSearchOverlay(query) {
    if (!__searchOverlay) return;
    __searchOverlay.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (__searchOverlayInput) {
        __searchOverlayInput.value = query || '';
        __searchOverlayInput.focus({ preventScroll: true });
        updateSearchResults(query || '');
    }
}

function closeSearchOverlay() {
    if (!__searchOverlay) return;
    __searchOverlay.style.display = 'none';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

function updateSearchResults(query) {
    if (!__searchOverlay) return;
    const resultsContainer = __searchOverlay.querySelector('.search-modal__results');
    if (!resultsContainer) return;

    const normalized = (query || '').trim().toLowerCase();
    if (!normalized) {
        resultsContainer.innerHTML = '<div class="search-item__empty">Type to search games.</div>';
        return;
    }

    const matches = (__searchGameIndex || []).filter((item) => item.titleLower.includes(normalized));
    if (!matches.length) {
        resultsContainer.innerHTML = '<div class="search-item__empty">No games found.</div>';
        return;
    }

    const maxResults = 60;
    const items = matches.slice(0, maxResults);

    const grid = document.createElement('div');
    grid.className = 'search-modal__grid';

    items.forEach((item) => {
        const anchor = document.createElement('a');
        anchor.className = 'search-item';
        anchor.href = item.href;
        anchor.setAttribute('aria-label', item.title);

        const img = document.createElement('img');
        img.className = 'search-item__thumb';
        img.src = item.img;
        img.alt = item.title;

        const title = document.createElement('div');
        title.className = 'search-item__title';
        title.textContent = item.title;

        anchor.appendChild(img);
        anchor.appendChild(title);

        anchor.addEventListener('click', () => {
            closeSearchOverlay();
        });

        grid.appendChild(anchor);
    });

    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(grid);
}
