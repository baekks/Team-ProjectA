
    $(document).ready(function () {

        function convertTime() {
            var now = new Date();


            var month = now.getMonth() + 1;
            var date = now.getDate();

            return month + '월' + date + '일';
        }

        var currentTime = convertTime();
        $('.nowtime').append(currentTime);
    });
var WeatherslideIndex = 1;

    var WeatherSlideTimer;

    var slideshowContainer;

    window.addEventListener("load", function () {
        WeathershowSlides(WeatherslideIndex);
        WeatherSlideTimer = setInterval(function () {
            WeatherPlusSlides(1)
        }, 2000);

        //화살표 부분을 마우스 멈춤/재개 부분으로 유지하려면 아래 줄을 주석 처리하세요
        slideshowContainer = document.getElementsByClassName('Weather-slideshow-inner')[0];

        //화살표 부분을 마우스 일시 중지/재개에 유지하려면 아래 줄의 주석 처리를 제거하세요
        // slideshowContainer = document.getElementsByClassName('Weather-slideshow-container')[0];

        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', pause)
            slideshowContainer.addEventListener('mouseleave', resume)
        }
    })

    // 다음 그리고 이전 컨트롤
    function WeatherPlusSlides(n) {
        clearInterval(WeatherSlideTimer);
        if (n < 0) {
            WeathershowSlides(WeatherslideIndex -= 1);
        } else {
            WeathershowSlides(WeatherslideIndex += 1);
        }

        //화살표 부분을 PAUSE/RESUME의 일부로 유지하려면 아래 줄을 주석 처리하세요

        if (n === -1) {
            WeatherSlideTimer = setInterval(function () {
                WeatherPlusSlides(n + 2)
            }, 2000);
        } else {
            WeatherSlideTimer = setInterval(function () {
                WeatherPlusSlides(n + 1)
            }, 2000);
        }
    }

    //현재 슬라이드를 제어하고 필요한 경우 간격을 재설정합니다
    function WeatherCurrentSlide(n) {
        clearInterval(WeatherSlideTimer);
        WeatherSlideTimer = setInterval(function () {
            WeatherPlusSlides(n + 1)
        }, 2000);
        WeathershowSlides(WeatherslideIndex = n);
    }

    function WeathershowSlides(n) {
        var i;
        var slides = document.getElementsByClassName("Weather-Slides");
        var Weatherdots = document.getElementsByClassName("Weather-dot");
        if (slides.length === 0) {
            return;
        }
        if (n > slides.length) {
            WeatherslideIndex = 1
        }
        if (n < 1) {
            WeatherslideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < Weatherdots.length; i++) {
            Weatherdots[i].className = Weatherdots[i].className.replace(" active", "");
        }
        slides[WeatherslideIndex - 1].style.display = "block";
        if (Weatherdots.length > 0 && Weatherdots[WeatherslideIndex - 1]) {
            Weatherdots[WeatherslideIndex - 1].className += " active";
        }
    }

    pause = () => {
        clearInterval(WeatherSlideTimer);
    }

    resume = () => {
        clearInterval(WeatherSlideTimer);
        WeatherSlideTimer = setInterval(function () {
            WeatherPlusSlides(WeatherslideIndex)
        }, 2000);
    }
//제이쿼리사용
$.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Chuncheon,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (ChuncheonWeather) {
        // 춘천 기온출력
       
        $('.ChuncheonNowtemp').append(ChuncheonWeather.main.temp);
        $('.ChuncheonLowtemp').append(ChuncheonWeather.main.temp_min);
        $('.ChuncheonHightemp').append(ChuncheonWeather.main.temp_max);
        
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + ChuncheonWeather.weather[0].icon +
            '.png" alt="' + ChuncheonWeather.weather[0].description + '"/>'

        $('.ChuncheonIcon').html(weathericonUrl);

    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Gangneung,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (GangneungWeather) {
        // 강릉 기온출력
        $('.GangneungNowtemp').append(GangneungWeather.main.temp);
        $('.GangneungLowtemp').append(GangneungWeather.main.temp_min);
        $('.GangneungHightemp').append(GangneungWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + GangneungWeather.weather[0].icon +
            '.png" alt="' + GangneungWeather.weather[0].description + '"/>'

        $('.GangneungIcon').html(weathericonUrl);

    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Wonju,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (WonjuWeather) {
        // 원주 기온출력
        $('.WonjuNowtemp').append(WonjuWeather.main.temp);
        $('.WonjuLowtemp').append(WonjuWeather.main.temp_min);
        $('.WonjuHightemp').append(WonjuWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + WonjuWeather.weather[0].icon +
            '.png" alt="' + WonjuWeather.weather[0].description + '"/>'

        $('.WonjuIcon').html(weathericonUrl);

    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Seoul,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (SeoulWeather) {
        // 서울 기온출력
        $('.SeoulNowtemp').append(SeoulWeather.main.temp);
        $('.SeoulLowtemp').append(SeoulWeather.main.temp_min);
        $('.SeoulHightemp').append(SeoulWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + SeoulWeather.weather[0].icon +
            '.png" alt="' + SeoulWeather.weather[0].description + '"/>'

        $('.SeoulIcon').html(weathericonUrl);

    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Incheon,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (IncheonWeather) {
        // 인천 기온출력
        $('.IncheonNowtemp').append(IncheonWeather.main.temp);
        $('.IncheonLowtemp').append(IncheonWeather.main.temp_min);
        $('.IncheonHightemp').append(IncheonWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + IncheonWeather.weather[0].icon +
            '.png" alt="' + IncheonWeather.weather[0].description + '"/>'

        $('.IncheonIcon').html(weathericonUrl);

    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Cheongju-si,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (CheongjuWeather) {
        // 청주 기온출력
        $('.CheongjuNowtemp').append(CheongjuWeather.main.temp);
        $('.CheongjuLowtemp').append(CheongjuWeather.main.temp_min);
        $('.CheongjuHightemp').append(CheongjuWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + CheongjuWeather.weather[0].icon +
            '.png" alt="' + CheongjuWeather.weather[0].description + '"/>'

        $('.CheongjuIcon').html(weathericonUrl);

    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Daejeon,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (DaejeonWeather) {
        // 대전 기온출력
        $('.DaejeonNowtemp').append(DaejeonWeather.main.temp);
        $('.DaejeonLowtemp').append(DaejeonWeather.main.temp_min);
        $('.DaejeonHightemp').append(DaejeonWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + DaejeonWeather.weather[0].icon +
            '.png" alt="' + DaejeonWeather.weather[0].description + '"/>'

        $('.DaejeonIcon').html(weathericonUrl);

    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Andong,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (AndongWeather) {
        // 안동 기온출력
        $('.AndongNowtemp').append(AndongWeather.main.temp);
        $('.AndongLowtemp').append(AndongWeather.main.temp_min);
        $('.AndongHightemp').append(AndongWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + AndongWeather.weather[0].icon +
            '.png" alt="' + AndongWeather.weather[0].description + '"/>'

        $('.AndongIcon').html(weathericonUrl);

    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Daegu,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (DaeguWeather) {
        // 대구 기온출력
        $('.DaeguNowtemp').append(DaeguWeather.main.temp);
        $('.DaeguLowtemp').append(DaeguWeather.main.temp_min);
        $('.DaeguHightemp').append(DaeguWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + DaeguWeather.weather[0].icon +
            '.png" alt="' + DaeguWeather.weather[0].description + '"/>'

        $('.DaeguIcon').html(weathericonUrl);
    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Ulsan,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (UlsanWeather) {
        // 울산 기온출력
        $('.UlsanNowtemp').append(UlsanWeather.main.temp);
        $('.UlsanLowtemp').append(UlsanWeather.main.temp_min);
        $('.UlsanHightemp').append(UlsanWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + UlsanWeather.weather[0].icon +
            '.png" alt="' + UlsanWeather.weather[0].description + '"/>'

        $('.UlsanIcon').html(weathericonUrl);
    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Changwon,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (ChangwonWeather) {
        // 창원 기온출력
        $('.ChangwonNowtemp').append(ChangwonWeather.main.temp);
        $('.ChangwonLowtemp').append(ChangwonWeather.main.temp_min);
        $('.ChangwonHightemp').append(ChangwonWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + ChangwonWeather.weather[0].icon +
            '.png" alt="' + ChangwonWeather.weather[0].description + '"/>'

        $('.ChangwonIcon').html(weathericonUrl);
    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Busan,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (BusanWeather) {
        // 부산 기온출력
        $('.BusanNowtemp').append(BusanWeather.main.temp);
        $('.BusanLowtemp').append(BusanWeather.main.temp_min);
        $('.BusanHightemp').append(BusanWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + BusanWeather.weather[0].icon +
            '.png" alt="' + BusanWeather.weather[0].description + '"/>'

        $('.BusanIcon').html(weathericonUrl);
    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Jeonju,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (JeonjuWeather) {
        // 전주 기온출력
        $('.JeonjuNowtemp').append(JeonjuWeather.main.temp);
        $('.JeonjuLowtemp').append(JeonjuWeather.main.temp_min);
        $('.JeonjuHightemp').append(JeonjuWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + JeonjuWeather.weather[0].icon +
            '.png" alt="' + JeonjuWeather.weather[0].description + '"/>'

        $('.JeonjuIcon').html(weathericonUrl);
    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Mokpo,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (MokpoWeather) {
        // 목포 기온출력
        $('.MokpoNowtemp').append(MokpoWeather.main.temp);
        $('.MokpoLowtemp').append(MokpoWeather.main.temp_min);
        $('.MokpoHightemp').append(MokpoWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + MokpoWeather.weather[0].icon +
            '.png" alt="' + MokpoWeather.weather[0].description + '"/>'

        $('.MokpoIcon').html(weathericonUrl);
    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Mokpo,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (GwangjuWeather) {
        // 광주 기온출력
        $('.GwangjuNowtemp').append(GwangjuWeather.main.temp);
        $('.GwangjuLowtemp').append(GwangjuWeather.main.temp_min);
        $('.GwangjuHightemp').append(GwangjuWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + GwangjuWeather.weather[0].icon +
            '.png" alt="' + GwangjuWeather.weather[0].description + '"/>'

        $('.GwangjuIcon').html(weathericonUrl);
    });
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Yeosu,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (YeosuWeather) {
        // 여수 기온출력
        $('.YeosuNowtemp').append(YeosuWeather.main.temp);
        $('.YeosuLowtemp').append(YeosuWeather.main.temp_min);
        $('.YeosuHightemp').append(YeosuWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + YeosuWeather.weather[0].icon +
            '.png" alt="' + YeosuWeather.weather[0].description + '"/>'

        $('.YeosuIcon').html(weathericonUrl);
    });
        $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Jeju City,KR&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
    function (JejuWeather) {
        // 제주 기온출력
        $('.JejuNowtemp').append(JejuWeather.main.temp);
        $('.JejuLowtemp').append(JejuWeather.main.temp_min);
        $('.JejuHightemp').append(JejuWeather.main.temp_max);
        //날씨아이콘출력
        //WeatherResult.weater[0].icon
        var weathericonUrl =
            '<img src= "http://openweathermap.org/img/wn/'
            + JejuWeather.weather[0].icon +
            '.png" alt="' + JejuWeather.weather[0].description + '"/>'

        $('.JejuIcon').html(weathericonUrl);
    });
    
    
    
    
