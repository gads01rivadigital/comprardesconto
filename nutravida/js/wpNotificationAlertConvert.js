/**
 * Author Thiago Tedeschi
 * @copyright Todos os direitos reservados a equipe NODZ
 */

let canShowAudio = false
let showWpAlertInterval = ''
function getBuyers() {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest()
        var url = wpAlertConvert.siteurl + '/getLastBuyersWpAlert';

        let params = "type=ajax&pageOrPost="+wpAlertConvert.pageOrPost+"&current_slug="+wpAlertConvert.current_slug+"&currentePageID="+wpAlertConvert.currentePageID

        http.open('POST', url, true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                const response = JSON.parse(http.responseText)
                if (response.status) {
                    resolve(response.result)
                } else {
                    reject(false)
                }
            } else if (http.readyState == 4 && http.status != 200) {
                reject(false)
            }
        }

        http.send(params);
    })
}

function notificationWpAlertaConversao() {

    getBuyers().then(result => {
        let limitShowAlert = result.alert.numberAlerts
        let timesShowedAlert = getCookieWpAlert("showWpAlertConvert")

        timesShowedAlert = parseInt(timesShowedAlert)
        limitShowAlert = parseInt(limitShowAlert)

        if (limitShowAlert == 0 || timesShowedAlert <= limitShowAlert) {
            let showtimeFadeInWpAlert = parseInt(result.alert.timeFadeInWpAlert)
            let showtimeFadeOutWpAlert = parseInt(result.alert.timeFadeOutWpAlert)
            let showinitialTimeFadeInWpAlert = parseInt(result.alert.initialTimeFadeInWpAlert)

            let showtimeFadeOutWpAlertInitial = showinitialTimeFadeInWpAlert + showtimeFadeOutWpAlert

            let showTimeInterval = (showtimeFadeInWpAlert + showtimeFadeOutWpAlert) * 1000

            let spanShowAlertBox = document.createElement("span");
            spanShowAlertBox.setAttribute("id", "showWpAlertBox");
            document.body.appendChild(spanShowAlertBox);

            showNotificationsWpAlertInitial(result,showinitialTimeFadeInWpAlert)
            hideNotificationsWpAlertInitial(showtimeFadeOutWpAlertInitial).then(snap => {
                showWpAlertInterval = setInterval(function () {
                    showNotificationsWpAlert(result)
                    hideNotificationsWpAlert(showtimeFadeOutWpAlert)
                }, showTimeInterval)
            })
        }

        document.body.addEventListener("click", function () {
            canShowAudio = true
        })

        if(limitShowAlert != 0){
            let showedToUser = getCookieWpAlert("showWpAlertConvert")
            if(!showedToUser){
                setCookieWpAlert("showWpAlertConvert",1,1)
            }else{
                showedToUser = parseInt(showedToUser) + 1
                setCookieWpAlert("showWpAlertConvert",showedToUser,1)
            }
        }else{
            setCookieWpAlert("showWpAlertConvert","","-1")
        }
    }).catch(err =>{})
}

function showNotificationsWpAlert(result) {
    let buyerNames = result.buyers.buyers
    let buyerCities = result.buyers.cities
    let buyerProducts = result.buyers.products

    buyerNames = buyerNames.split(",")
    buyerCities = buyerCities.split(",")
    buyerProducts = buyerProducts.split(",")

    buyerNameAlert = buyerNames.sort(function () {
        return 0.5 - Math.random()
    })
    buyerNameAlert = buyerNameAlert[0]

    buyerCityAlert = buyerCities.sort(function () {
        return 0.5 - Math.random()
    })
    buyerCityAlert = buyerCityAlert[0]

    buyerProductAlert = buyerProducts.sort(function () {
        return 0.5 - Math.random()
    })
    buyerProductAlert = buyerProductAlert[0]

    let dataNotification = {
        positionAlertHorizontal: result.alert.positionAlertHorizontal,
        positionAlert: result.alert.positionAlert,
        bg_color: result.alert.bg_color,
        content_padding: result.alert.content_padding,
        border_color: result.alert.border_color,
        border_width: result.alert.border_width,
        styleBox: result.alert.styleBox,
        showBorderRadius: result.alert.showBorderRadius,
        text_color: result.alert.text_color,
        buyerName: buyerNameAlert,
        buyerCity: buyerCityAlert,
        showCloseAlert: result.alert.enableCloseAlertByUser,
        second_text_color: result.alert.second_text_color,
        textNotification: result.alert.textNotification,
        buyerProduct: buyerProductAlert,
        purchaseTime: changePurchaseTime(result.alert.purchaseTime),
        affiliateUrl: result.alert.affiliateUrl,
        enableAffiliateLink: result.alert.enableAffiliateLink,
        linkInBox: result.alert.linkInBox,
        linkInBoxTarget: result.alert.linkInBoxTarget,
        imageAlert: result.image.imageAlert,
        showImage: result.image.showImage,
        showBorderImageRadius: result.image.showBorderImageRadius,
        timeFadeInWpAlert: result.alert.timeFadeInWpAlert,
        timeFadeOutWpAlert: result.alert.timeFadeOutWpAlert,
        initialTimeFadeInWpAlert: result.alert.initialTimeFadeInWpAlert,
        showProgressBar: result.alert.showProgressBar,
        bgColorProgressBar: result.alert.bgColorProgressBar,
        colorProgressBar: result.alert.colorProgressBar,
    }

    document.getElementById("showWpAlertBox").innerHTML = getNotificationWpAlert(dataNotification,result.alert.timeFadeOutWpAlert)
    jQuery("#showWpAlertBox").fadeIn("slow");

    if(canShowAudio && result.alert.soundPurchase){
        let audio = new Audio(result.alert.soundPurchase); audio.play()
    }

    if(result.alert.enableCloseAlertByUser == 'enabled'){
        document.getElementById("closeWpAlertConvert").addEventListener("click", function(){
            document.getElementById("boxTotal").style.display = "none"
            clearInterval(showWpAlertInterval)
        })
    }
}

function hideNotificationsWpAlert(timeFadeOutWpAlert) {
    timeFadeOutWpAlert = timeFadeOutWpAlert * 1000
    setTimeout(function () {
        jQuery("#showWpAlertBox").fadeOut("slow")
    }, timeFadeOutWpAlert)
}

function showNotificationsWpAlertInitial(result, timeFadeInWpAlert) {
    let ShowtimeFadeInWpAlert = timeFadeInWpAlert * 1000
    setTimeout(function () {
        let buyerNames = result.buyers.buyers
        let buyerCities = result.buyers.cities
        let buyerProducts = result.buyers.products

        buyerNames = buyerNames.split(",")
        buyerCities = buyerCities.split(",")
        buyerProducts = buyerProducts.split(",")

        buyerNameAlert = buyerNames.sort(function () {
            return 0.5 - Math.random()
        })
        buyerNameAlert = buyerNameAlert[0]

        buyerCityAlert = buyerCities.sort(function () {
            return 0.5 - Math.random()
        })
        buyerCityAlert = buyerCityAlert[0]

        buyerProductAlert = buyerProducts.sort(function () {
            return 0.5 - Math.random()
        })
        buyerProductAlert = buyerProductAlert[0]

        let dataNotification = {
            positionAlertHorizontal: result.alert.positionAlertHorizontal,
            positionAlert: result.alert.positionAlert,
            bg_color: result.alert.bg_color,
            content_padding: result.alert.content_padding,
            border_color: result.alert.border_color,
            border_width: result.alert.border_width,
            styleBox: result.alert.styleBox,
            showBorderRadius: result.alert.showBorderRadius,
            text_color: result.alert.text_color,
            buyerName: buyerNameAlert,
            buyerCity: buyerCityAlert,
            showCloseAlert: result.alert.enableCloseAlertByUser,
            second_text_color: result.alert.second_text_color,
            textNotification: result.alert.textNotification,
            buyerProduct: buyerProductAlert,
            purchaseTime: changePurchaseTime(result.alert.purchaseTime),
            affiliateUrl: result.alert.affiliateUrl,
            enableAffiliateLink: result.alert.enableAffiliateLink,
            linkInBox: result.alert.linkInBox,
            linkInBoxTarget: result.alert.linkInBoxTarget,
            imageAlert: result.image.imageAlert,
            showImage: result.image.showImage,
            showBorderImageRadius: result.image.showBorderImageRadius,
            timeFadeInWpAlert: result.alert.timeFadeInWpAlert,
            timeFadeOutWpAlert: result.alert.timeFadeOutWpAlert,
            initialTimeFadeInWpAlert: result.alert.initialTimeFadeInWpAlert,
            showProgressBar: result.alert.showProgressBar,
            bgColorProgressBar: result.alert.bgColorProgressBar,
            colorProgressBar: result.alert.colorProgressBar,
        }

        document.getElementById("showWpAlertBox").innerHTML = getNotificationWpAlert(dataNotification,result.alert.timeFadeOutWpAlert)
        jQuery("#showWpAlertBox").fadeIn("slow");

        if(canShowAudio && result.alert.soundPurchase){
            let audio = new Audio(result.alert.soundPurchase); audio.play()
        }

        if(result.alert.enableCloseAlertByUser == 'enabled'){
            document.getElementById("closeWpAlertConvert").addEventListener("click", function(){
                document.getElementById("boxTotal").style.display = "none"
                clearInterval(showWpAlertInterval)
            })
        }
    }, ShowtimeFadeInWpAlert)
}

function hideNotificationsWpAlertInitial(timeFadeOutWpAlert) {
    return new Promise((resolve, reject) => {
        timeFadeOutWpAlert = timeFadeOutWpAlert * 1000
        setTimeout(function () {
            jQuery("#showWpAlertBox").fadeOut("slow")
            resolve(true)
        }, timeFadeOutWpAlert)
    })
}

function changePurchaseTime(purchaseTime = '') {
    if (purchaseTime != "") {
        let timesRandom = purchaseTime
        timesRandom = timesRandom.split(",").sort(function () {
            return 0.5 - Math.random()
        })
        timesRandom = timesRandom[0]
        return timesRandom
    } else {
        return ""
    }
}

function randomTimeWpAlert(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getCookieWpAlert(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookieWpAlert(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

function getNotificationWpAlert(data,timeFadeInWpAlert) {

    let htmlShowCloseAlert = ""

    if (data.showCloseAlert == "disabled") {
        htmlShowCloseAlert = "display: none;"
    }

    let htmlShowAffiliateLink = ""

    if (data.affiliateUrl == "" || data.enableAffiliateLink == "disabled") {
        htmlShowAffiliateLink = "display: none;"
    }

    let htmlShowImage = ""

    if (data.showImage == "disabled") {
        htmlShowImage = "display: none;"
    }

    let tempoExibicao = parseInt(timeFadeInWpAlert) + parseInt(data.timeFadeOutWpAlert)

    let htmlShowProgressBar = ""
    if (data.showProgressBar == "disabled") {
        htmlShowProgressBar = "display: none;"
    }

    let showLinkTotalAlert = "";
    let showCloseLinkTotalAlert = "";

    if(data.linkInBox != ""){
        showLinkTotalAlert = '<a href="'+data.linkInBox+'" target="'+data.linkInBoxTarget+'" style="text-decoration: none !important;">';
        showCloseLinkTotalAlert = "</a>";
    }

    let boxNotification = `
                            <style>
                                .progressAlertC{
                                    height: 5px;
                                    position: relative;
                                    margin-top: 5px;
                                    background-color: ${data.bgColorProgressBar};
                                }
                                
                                .progressAlertC .progressAlertC-bar{
                                    position: absolute;
                                    height: 100%;
                                    background-color: ${data.colorProgressBar};
                                    animation: progressAlertC-animation ${tempoExibicao}s infinite;
                                }
                                
                                @keyframes progressAlertC-animation{
                                    0% { width: 0%; }
                                    100% { width: 100%}
                                }
                            </style>
                            ${showLinkTotalAlert}
                                <div id="boxTotal" style="${data.positionAlertHorizontal}; ${data.positionAlert}; position: fixed; z-index: 10000;">
                                    <div style="width: auto;">
                                        <div id="alertBox" style="background-color: ${data.bg_color}; padding: ${data.content_padding}px; border: ${data.border_color} ${data.border_width}px solid; ${data.styleBox} ${data.showBorderRadius}">
                                            <div style="display: flex;">
                                                <div style="text-align: left;">
                                                    <img src="${data.imageAlert}" alt="" style="max-width: 60px; max-height: 60px; ${data.showBorderImageRadius} ${htmlShowImage}">
                                                </div>
                                                <div style="text-align: left; padding: 0px 10px; line-height: 22px; margin-top: -6px;">
                                                    <span id="firstText" style="color:${data.text_color}; font-size: 14px; font-family: Helvetica, Arial, serif !important; margin-right:10px;">${data.buyerName} de ${data.buyerCity} </span> <span style="${htmlShowCloseAlert} text-align: right !important; right: 0px; float: right;" id="closeWpAlertConvert"> <img src="${wpAlertConvert.imagesAlertConvert}/closeAlertcircle.png" style="width: 12px;"> </span><br>
                                                    <span style="color:${data.second_text_color}; font-size: 12px; font-family: Helvetica, Arial, serif !important;">${data.textNotification} ${data.buyerProduct} ${data.purchaseTime}</span>
                                                    <span style="font-size: 10px; font-family: Helvetica, Arial, serif !important; color: #909090; text-align: left !important; margin-left: 0px; margin-top: -12px; ${htmlShowAffiliateLink}">
                                                        <br>
                                                        <img src="${wpAlertConvert.imagesAlertConvert}/check-square-white.png" style="color: #ffffff !important; background-color: #afafaf; width: 10px; ${htmlShowAffiliateLink}">
                                                        Verified by <a href="${data.affiliateUrl}" target="_blank" style="text-decoration: none !important;font-size: 10px; font-family: Helvetica, Arial, serif !important; color: #54738C; ${htmlShowAffiliateLink}">Alerta de Conversões</a>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="progressAlertC" style="${htmlShowProgressBar}">
                                                <div class="progressAlertC-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ${showCloseLinkTotalAlert}
                            `

    return boxNotification
}

notificationWpAlertaConversao()
