if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker зарегистрирован:', reg))
            .catch(err => console.error('Ошибка регистрации Service Worker:', err));
    });
}

const airports = {
    "MIR": "DTMB/MIR - MONASTIR/HABIB BOU",
    "NBE": "DTNH/NBE - ENFIDHA / HAMMAMET",
    "TUN": "DTTA/TUN - TUNIS/CARTHAGE",
    "TLL": "EETN/TLL - TALLINN/LENNART ME",
    "HEL": "EFHK/HEL - HELSINKI/VANTAA",
    "ARN": "ESSA/ARN - STOCKHOLM/ARLANDA",
    "RIX": "EVRA/RIX - RIGA",
    "VNO": "EYVI/VNO - VILNIUS INTL",
    "CAI": "HECA/CAI - CAIRO INTL",
    "HRG": "HEGN/HRG - HURGHADA INTL",
    "LXR": "HELX/LXR - LUXOR INTL",
    "SSH": "HESH/SSH - SHARM EL SHEIKH IN",
    "LCA": "LCLK/LCA - LARNAKA INTL",
    "PFO": "LCPH/PFO - PAFOS INTL",
    "TLV": "LLBG/TLV - TEL AVIV/BEN GURIO",
    "ESB": "LTAC/ESB - ANKARA/ESENBOGA IN",
    "ADA": "LTAF/ADA - ADANA",
    "AYT": "LTAI/AYT - ANTALYA INTL",
    "ISL": "LTBA/ISL - ISTANBUL/ATATURK I",
    "ADB": "LTBJ/ADB - IZMIR/ADNAN MENDER",
    "DLM": "LTBS/DLM - MUGLA/DALAMAN",
    "BJV": "LTFE/BJV - MILAS/BODRUM",
    "GZP": "LTFG/GZP - GAZIPASA/ALANYA",
    "SAW": "LTFJ/SAW - ISTANBUL/SABIHA GO",
    "IST": "LTFM/IST - ISTANBUL AIRPORT",
    "KBL": "OAKB/KBL - HAMID KARZAI INTL/",
    "BAH": "OBBI/BAH - BAHRAIN INTL",
    "BUZ": "OIBB/BUZ - BUSHEHR",
    "IFN": "OIFM/IFN - ESFAHAN/SHAHID BEH",
    "IKA": "OIIE/IKA - TEHRAN/IMAM KHOMAI",
    "THR": "OIII/THR - TEHRAN/MEHRABAD IN",
    "SYZ": "OISS/SYZ - SHIRAZ/SHAHID DAST",
    "AMM": "OJAI/AMM - AMMAN/QUEEN ALIA I",
    "ADJ": "OJAM/ADJ - AMMAN MARKA INTL",
    "AQJ": "OJAQ/AQJ - AQABA/KING HUSSEIN",
    "BEY": "OLBA/BEY - BEIRUT/RAFIC HARIR",
    "AUH": "OMAA/AUH - ABU DHABI INTL",
    "AAN": "OMAL/AAN - AL AIN INTL",
    "DXB": "OMDB/DXB - DUBAI INTL",
    "DWC": "OMDW/DWC - DUBAI/AL MAKTOUM I",
    "FJR": "OMFJ/FJR - FUJAIRAH INTL",
    "RKT": "OMRK/RKT - RAS AL KHAIMAH INT",
    "SHJ": "OMSJ/SHJ - SHARJAH INTL",
    "MCT": "OOMS/MCT - MUSCAT INTL",
    "KHI": "OPKC/KHI - KARACHI/JINNAH INT",
    "LHE": "OPLA/LHE - LAHORE/ALLAMA IQBA",
    "PEW": "OPPS/PEW - BACHA KHAN INTL",
    "BGW": "ORBI/BGW - BAGHDAD INTL",
    "BSR": "ORMM/BSR - BASRAH INTL",
    "DIA": "OTBD/DIA - DOHA INTL",
    "DOH": "OTHH/DOH - DOHA/HAMAD INTL",
    "CJU": "RKPC/CJU - JEJU INTL",
    "PUS": "RKPK/PUS - BUSAN/GIMHAE INTL",
    "ICN": "RKSI/ICN - SEOUL/INCHEON INTL",
    "GMP": "RKSS/GMP - SEOUL/GIMPO INTL",
    "ALA": "UAAA/ALA - ALMATY",
    "NQZ": "UACC/NQZ - NUR-SULTAN/N. NAZA",
    "CIT": "UAII/CIT - SHYMKENT",
    "HSA": "UAIT/HSA - TURKISTAN",
    "KGF": "UAKK/KGF - KARAGANDA",
    "BXY": "UAOL/BXY - KRAINIY",
    "KZO": "UAOO/KZO - KYZYLORDA",
    "URA": "UARR/URA - URALSK",
    "SCO": "UATE/SCO - AKTAU",
    "GUW": "UATG/GUW - ATYRAU",
    "AKX": "UATT/AKX - AKTOBE/AKTOBE",
    "KSN": "UAUU/KSN - KOSTANAY",
    "GYD": "UBBB/GYD - BAKU/HEYDAR ALIYEV",
    "GNJ": "UBBG/GNJ - GANJA",
    "IKU": "UCFL/IKU - ISSYK-KUL",
    "FRU": "UCFM/FRU - BISHKEK/MANAS",
    "OSS": "UCFO/OSS - OSH",
    "LWN": "UDSG/LWN - GYUMRI/SHIRAK",
    "EVN": "UDYZ/EVN - YEREVAN/ZVARTNOTS",
    "TLK": "UECT/TLK - TALAKAN",
    "YKS": "UEEE/YKS - YAKUTSK",
    "NER": "UELL/NER - NERYUNGRI CHULMAN",
    "PYJ": "UERP/PYJ - POLYARNY",
    "MJZ": "UERR/MJZ - MIRNY",
    "BUS": "UGSB/BUS - BATUMI",
    "TBS": "UGTB/TBS - TBILISI/TBILISI",
    "BQS": "UHBB/BQS - BLAGOVESCHENSK/IGN",
    "KHV": "UHHH/KHV - KHABAROVSK NOVY",
    "XKD": "UHKD/XKD - KOMSOMOLSK NA AMUR",
    "DYR": "UHMA/DYR - ANADYR/UGOLNY",
    "GDX": "UHMM/GDX - MAGADAN/SOKOL",
    "PKC": "UHPP/PKC - PETROPAVLOVSK-KAMC",
    "UUS": "UHSS/UUS - YUZHNO-SAKHALINSK",
    "VVO": "UHWW/VVO - VLADIVOSTOK",
    "HTA": "UIAA/HTA - CHITA",
    "BTK": "UIBB/BTK - BRATSK",
    "IKT": "UIII/IKT - IRKUTSK",
    "UUD": "UIUU/UUD - ULAN-UDE/MUKHINO",
    "ARH": "ULAA/ARH - ARCHANGELSK",
    "NNM": "ULAM/NNM - NARYAN MAR",
    "LED": "ULLI/LED - SANKT-PETERBURG/PU",
    "KVK": "ULMK/KVK - APATITY/KHIBINY",
    "MMK": "ULMM/MMK - MURMANSK",
    "PKV": "ULOO/PKV - PSKOV",
    "PES": "ULPB/PES - PETROZAVODSK",
    "CEE": "ULWC/CEE - CHEREPOVETS",
    "KGD": "UMKK/KGD - KALININGRAD",
    "MSQ": "UMMS/MSQ - MINSK-2",
    "ABA": "UNAA/ABA - ABAKAN",
    "BAX": "UNBB/BAX - BARNAUL/MIKHAYLOVK",
    "RGK": "UNBG/RGK - GORNO-ALTAISK",
    "KEJ": "UNEE/KEJ - KEMEROVO/ALEXEY LE",
    "KJA": "UNKL/KJA - KRASNOYARSK",
    "OVB": "UNNT/OVB - NOVOSIBIRSK/TOLMAC",
    "OMS": "UNOO/OMS - OMSK TSENTRALNY",
    "TOF": "UNTT/TOF - TOMSK",
    "NOZ": "UNWW/NOZ - NOVOKUZNETSK",
    "HTG": "UOHH/HTG - KHATANGA",
    "IAA": "UOII/IAA - IGARKA",
    "NSK": "UOOO/NSK - NORILSK ALYKEL",
    "SIP": "URFF/SIP - SIMFEROPOL INTL",
    "AAQ": "URKA/AAQ - ANAPA",
    "GDZ": "URKG/GDZ - GELENDZHIK",
    "KRR": "URKK/KRR - KRASNODAR PASHKOVS",
    "GRV": "URMG/GRV - GROZNY/SEVERNY",
    "MCX": "URML/MCX - MAKHACHKALA/UYTASH",
    "MRV": "URMM/MRV - MINERALNYYE VODY",
    "NAL": "URMN/NAL - NALCHIK",
    "OGZ": "URMO/OGZ - VLADIKAVKAZ",
    "IGT": "URMS/IGT - MAGAS",
    "STW": "URMT/STW - STAVROPOL SHPAKOVS",
    "ROV": "URRP/ROV - ROSTOV NA DONU/PLA",
    "AER": "URSS/AER - SOCHI",
    "ASF": "URWA/ASF - ASTRAKHAN",
    "ESL": "URWI/ESL - ELISTA",
    "VOG": "URWW/VOG - VOLGOGRAD",
    "CEK": "USCC/CEK - CHELYABINSK BALAND",
    "MQF": "USCM/MQF - MAGNITOGORSK",
    "SBT": "USDA/SBT - SABETTA",
    "SLY": "USDD/SLY - SALEKHARD",
    "HMA": "USHH/HMA - KHANTY-MANSIYSK/KH",
    "EYK": "USHQ/EYK - BELOYARSKIY",
    "IJK": "USII/IJK - IZHEVSK",
    "KVX": "USKK/KVX - KIROV",
    "NYM": "USMM/NYM - NADYM",
    "YMB": "USMQ/YMB - YAMBURG",
    "NUX": "USMU/NUX - NOVY URENGOY",
    "NJC": "USNN/NJC - NIZHNEVARTOVSK",
    "PEE": "USPP/PEE - PERM/BOLSHOE SAVIN",
    "KGP": "USRK/KGP - KOGALYM",
    "NOJ": "USRO/NOJ - NOYABRSK",
    "SGC": "USRR/SGC - SURGUT",
    "SVX": "USSS/SVX - YEKATERINBURG/KOLT",
    "RMZ": "USTJ/RMZ - TOBOLSK/REMEZOV",
    "TJM": "USTR/TJM - TYUMEN/ROSHCHINO",
    "KRO": "USUU/KRO - KURGAN",
    "ASB": "UTAA/ASB - ASHGABAT",
    "KRW": "UTAK/KRW - TURKMENBASHI",
    "DYU": "UTDD/DYU - DUSHANBE",
    "TJU": "UTDK/TJU - KULOB",
    "LBD": "UTDL/LBD - KHUJAND",
    "AZN": "UTFA/AZN - ANDIZHAN",
    "FEG": "UTFF/FEG - FERGANA",
    "NMA": "UTFN/NMA - NAMANGAN",
    "NCU": "UTNN/NCU - NUKUS",
    "UGC": "UTNU/UGC - URGENCH",
    "NVI": "UTSA/NVI - NAVOI",
    "BHK": "UTSB/BHK - BUKHARA",
    "KSQ": "UTSK/KSQ - KARSHI",
    "SKD": "UTSS/SKD - SAMARKAND",
    "TAS": "UTTT/TAS - TASHKENT INTL/ISLA",
    "BZK": "UUBP/BZK - BRYANSK",
    "ZIA": "UUBW/ZIA - RAMENSKOYE",
    "DME": "UUDD/DME - MOSCOW/DOMODEDOVO",
    "IAR": "UUDL/IAR - YAROSLAVL / TUNOSH",
    "SVO": "UUEE/SVO - MOSCOW/SHEREMETYEV",
    "EGO": "UUOB/EGO - BELGOROD",
    "URS": "UUOK/URS - KURSK VOSTOCHNY",
    "LPK": "UUOL/LPK - LIPETSK",
    "VOZ": "UUOO/VOZ - VORONEZH",
    "VKO": "UUWW/VKO - MOSCOW/VNUKOVO",
    "UCT": "UUYH/UCT - UKHTA",
    "USK": "UUYS/USK - USINSK",
    "VKT": "UUYW/VKT - VORKUTA",
    "SCW": "UUYY/SCW - SYKTYVKAR",
    "GOJ": "UWGG/GOJ - NIZHNY NOVGOROD/ST",
    "KZN": "UWKD/KZN - KAZAN",
    "NBC": "UWKE/NBC - NIZHNEKAMSK/BEGISH",
    "JOK": "UWKJ/JOK - YOSHKAR-OLA",
    "CSY": "UWKS/CSY - CHEBOKSARY",
    "ULV": "UWLL/ULV - ULYANOVSK-BARATAEW",
    "ULY": "UWLW/ULY - ULYANOVSK/VOSTOCHN",
    "REN": "UWOO/REN - ORENBURG",
    "OSW": "UWOR/OSW - ORSK",
    "PEZ": "UWPP/PEZ - PENZA",
    "SKX": "UWPS/SKX - SARANSK",
    "GSV": "UWSG/GSV - SARATOV/GAGARIN",
    "UFA": "UWUU/UFA - UFA",
    "KUF": "UWWW/KUF - SAMARA/KURUMOCH",
    "AMD": "VAAH/AMD - AHMEDABAD/VALLABH",
    "BOM": "VABB/BOM - MUMBAI/CHHATRAPATI",
    "CMB": "VCBI/CMB - KATUNAYAKE/BAN. IN",
    "HRI": "VCRI/HRI - MATTALA RAJAPAKSA",
    "PNH": "VDPP/PNH - PHNOM PENH",
    "CCU": "VECC/CCU - KOLKATA INTL",
    "DAC": "VGHS/DAC - DHAKA/HAZRAT SHAHJ",
    "HKG": "VHHH/HKG - HONG KONG INTL",
    "ATQ": "VIAR/ATQ - AMRITSAR/SRI GURU",
    "DEL": "VIDP/DEL - DELHI/INDIRA GANDH",
    "LKO": "VILK/LKO - CHAUDHARY CHARAN S",
    "VTE": "VLVT/VTE - VIENTIANE WATTAY",
    "MFM": "VMMC/MFM - MACAO INTL",
    "BLR": "VOBL/BLR - BENGALURU/KEMPEGOW",
    "GOI": "VOGO/GOI - GOA/DABOLIM NAVY",
    "HYD": "VOHS/HYD - HYDERABAD/RAJIV GA",
    "MAA": "VOMM/MAA - CHENNAI INTL",
    "TRV": "VOTV/TRV - THIRUVANANTHAPURAM",
    "MLE": "VRMM/MLE - MALE/VELANA INTL",
    "BKK": "VTBS/BKK - BANGKOK/SUVARNABHU",
    "UTP": "VTBU/UTP - RAYONG/U-TAPAO PAT",
    "HKT": "VTSP/HKT - PHUKET INTL",
    "CXR": "VVCR/CXR - KHANH HOA/CAM RANH",
    "DAD": "VVDN/DAD - DANANG INTL",
    "HAN": "VVNB/HAN - HANOI/NOIBAI INTL",
    "SGN": "VVTS/SGN - HO CHI MINH/TAN SO",
    "MDL": "VYMD/MDL - MANDALAY INTL",
    "RGN": "VYYY/RGN - YANGON INTL",
    "KUL": "WMKK/KUL - KUALA LUMPUR/SEPAN",
    "SIN": "WSSS/SIN - SINGAPORE/CHANGI",
    "PEK": "ZBAA/PEK - BEIJING/CAPITAL",
    "PKX": "ZBAD/PKX - BEIJING/DAXING",
    "HET": "ZBHH/HET - HOHHOT/BAITA",
    "SJW": "ZBSJ/SJW - SHIJIAZHUANG/ZHENG",
    "TSN": "ZBTJ/TSN - TIANJIN/BINHAI INT",
    "TYN": "ZBYN/TYN - TAIYUAN/WUSU",
    "CAN": "ZGGG/CAN - GUANGZHOU/BAIYUN",
    "CSX": "ZGHA/CSX - CHANGSHA/HUANGHUA",
    "SZX": "ZGSZ/SZX - SHENZHEN/BAOAN",
    "CGO": "ZHCC/CGO - ZHENGZHOU/XINZHENG",
    "WUH": "ZHHH/WUH - WUHAN/TIANHE",
    "HAK": "ZJHK/HAK - HAIKOU/MEILAN",
    "SYX": "ZJSY/SYX - SANYA/PHOENIX INTL",
    "LHW": "ZLLL/LHW - LANZHOU/ZHONGCHUAN",
    "XIY": "ZLXY/XIY - XI AN XIANYANG",
    "UBN": "ZMCK/UBN - ULAANBAATAR/CHINGG",
    "XMN": "ZSAM/XMN - XIAMEN/GAOQI",
    "HGH": "ZSHC/HGH - HANGZHOU/XIAOSHAN",
    "TNA": "ZSJN/TNA - JINAN/YAOQIANG",
    "NKG": "ZSNJ/NKG - NANJING/LUKOU",
    "HFE": "ZSOF/HFE - HEFEI/XINQIAO",
    "PVG": "ZSPD/PVG - SHANGHAI/PUDONG",
    "TAO": "ZSQD/TAO - QINGDAO/JIAODONG",
    "SHA": "ZSSS/SHA - SHANGHAI/HONGQIAO",
    "CKG": "ZUCK/CKG - CHONGQING/JIANGBEI",
    "CTU": "ZUUU/CTU - CHENGDU/SHUANGLIU",
    "URC": "ZWWW/URC - URUMQI/DIWOPU",
    "DLC": "ZYTL/DLC - DALIAN/ZHOUSHUIZI",
    "SHE": "ZYTX/SHE - SHENYANG/TAOXIAN",
    "GOX": "VOGA/GOX - MOPA",
    "KLF": "UUBC/KLF - KALUGA",
    "CGQ": "ZYCC/CGQ - CHANGCHUN LONGJIA",
    "TFU ": "ZUTF/TFU  - TIANFU ",
    "KYZ": "UNKY/KYZ - KYZYL",
    "BAT": "UMBB/BAT - BREST",
    "BVJ": "USDB/BVJ - BOVANENKOVO",
    "DJE": "DTTJ/DJE - DJERBA",
    "JAI": "VIJP/JAI - JAIPUR INTL",
    "NIL": "UIIR/NIL - VOSTOCHNY",
    "UKK": "UASK/UKK - UST-KAMENOGORSK",
    "KHN": "ZSCN/KHN - NANGHANG CHANGBEI IN"
};

document.addEventListener("DOMContentLoaded", function () {
    const phaseGrid = document.querySelector(".phase-grid");
    const phaseCards = document.querySelectorAll(".phase-card:not(#room-exit)");
    const dateInput = document.querySelector(".date-input");
    const flightNumberInput = document.querySelector('.flight-number');
    const flightPrefixSelect = document.querySelector('.flight-prefix');
    const flightTimeDisplay = document.getElementById('flight-time-display');
    const departureAirportCode = document.querySelector('.airport:nth-child(1) .airport-code');
    const departureAirportName = document.querySelector('.airport:nth-child(1) .airport-name');
    const arrivalAirportCode = document.querySelector('.airport:nth-child(2) .airport-code');
    const arrivalAirportName = document.querySelector('.airport:nth-child(2) .airport-name');
    const baseAirportInput = document.getElementById('base-airport-input');
    const suggestionsContainer = document.getElementById('base-airport-suggestions');
    const modeHint = document.getElementById('mode-hint')
    const homeButton = document.getElementById('homeButton'); // Добавлено
    const hotelButton = document.getElementById('hotelButton'); // Добавлено

    let sleepHours = parseFloat(localStorage.getItem('sleepHours')) || 8.0;
    let travelTimeMinutes = parseInt(localStorage.getItem('travelTime')) || 40;
    let checkInTimeMinutes = parseInt(localStorage.getItem('checkInTime')) || 120;
    let flightDepartureTime = null;
    let customDepartureTime = null;
    let customWakeTime = null;
    let customRoomExitTime = null;
    let defaultDepartureTime = null;
    let defaultWakeTime = null;
    let defaultRoomExitTime = null;
    const HOTEL_EXIT_OFFSET = 15 * 60 * 1000;
    const PREPARATION_TIME = (1 * 60 + 20) * 60 * 1000;
    const CACHE_DURATION = 20 * 60 * 1000;
    const MOSCOW_OFFSET = 3 * 60 * 60 * 1000;

    function setupBaseAirportAutocomplete() {
        function showSuggestions(query) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.classList.remove('active');

            if (query.length < 1) return;

            const filteredAirports = Object.keys(airports).filter(code =>
                code.toLowerCase().includes(query.toLowerCase()) ||
                airports[code].toLowerCase().includes(query.toLowerCase())
            );

            if (filteredAirports.length === 0) return;

            filteredAirports.forEach(code => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.textContent = `${code} - ${airports[code]}`;
                suggestionItem.addEventListener('click', () => {
                    baseAirportInput.value = code;
                    localStorage.setItem('baseAirport', code);
                    suggestionsContainer.innerHTML = '';
                    suggestionsContainer.classList.remove('active');
                    if (flightPrefixSelect.value === 'EVENT') {
                        departureAirportCode.textContent = code;
                        departureAirportName.textContent = airports[code].split(' - ')[1];
                    }
                    setTravelMode(); // Вызываем для обновления режима
                    updateModeHint();
                });
                suggestionsContainer.appendChild(suggestionItem);
            });

            suggestionsContainer.classList.add('active');
        }

        baseAirportInput.addEventListener('input', () => {
            const query = baseAirportInput.value.trim();
            showSuggestions(query);
        });

        baseAirportInput.addEventListener('blur', () => {
            setTimeout(() => {
                suggestionsContainer.classList.remove('active');
            }, 200);
        });

        baseAirportInput.addEventListener('change', () => {
            const code = baseAirportInput.value.toUpperCase().trim();
            if (airports[code]) {
                localStorage.setItem('baseAirport', code);
                if (flightPrefixSelect.value === 'EVENT') {
                    departureAirportCode.textContent = code;
                    departureAirportName.textContent = airports[code].split(' - ')[1];
                }
            } else {
                baseAirportInput.value = '';
                localStorage.removeItem('baseAirport');
                if (flightPrefixSelect.value === 'EVENT') {
                    departureAirportCode.textContent = '---';
                    departureAirportName.textContent = '-----';
                }
            }
            setTravelMode(); // Вызываем для обновления режима
            updateModeHint();
        });

        document.addEventListener('click', (e) => {
            if (!baseAirportInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.classList.remove('active');
            }
        });
    }

    setupBaseAirportAutocomplete();

    const updateTime = () => {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };

        let localTime = new Date();
        const localTimezoneOffset = localTime.getTimezoneOffset();
        const utcTime = localTime.getTime() + (localTimezoneOffset * 60 * 1000);
        const moscowTime = new Date(utcTime + MOSCOW_OFFSET);

        document.getElementById('current-time').textContent = localTime.toLocaleTimeString('ru-RU', options);
        document.getElementById('destination-time').textContent = moscowTime.toLocaleTimeString('ru-RU', options);

        const flightCountdownCard = document.getElementById('flight-countdown');
        const departureCountdownCard = document.getElementById('departure-countdown');
        const roomExitCountdownCard = document.getElementById('room-exit-countdown');
        const wakeCountdownCard = document.getElementById('departure-countdown-card');
        const bedtimeCountdownCard = document.getElementById('bedtime-countdown');

        const wasHidden = {
            flight: flightCountdownCard.classList.contains('hidden'),
            departure: departureCountdownCard.classList.contains('hidden'),
            roomExit: roomExitCountdownCard.classList.contains('hidden'),
            wake: wakeCountdownCard.classList.contains('hidden'),
            bedtime: bedtimeCountdownCard.classList.contains('hidden')
        };

        flightCountdownCard.classList.add('hidden');
        departureCountdownCard.classList.add('hidden');
        roomExitCountdownCard.classList.add('hidden');
        wakeCountdownCard.classList.add('hidden');
        bedtimeCountdownCard.classList.add('hidden');

        document.querySelectorAll('.phase-card').forEach(card => card.classList.remove('next-phase'));

        if (!flightDepartureTime) {
            document.getElementById('departure-countdown-time-departure').textContent = "00:00";
            document.getElementById('room-exit-countdown-time').textContent = "00:00";
            document.getElementById('departure-countdown-time').textContent = "00:00";
            document.getElementById('flight-countdown-time').textContent = "00:00";
            document.getElementById('bedtime-countdown-time').textContent = "00:00";
            document.getElementById('bedtime').textContent = "--:--";
            document.getElementById('waketime').textContent = "--:--";
            document.getElementById('old-waketime').textContent = "";
            document.getElementById('old-waketime').classList.add('hidden');
            document.getElementById('departuretime').textContent = "--:--";
            document.getElementById('old-departuretime').textContent = "";
            document.getElementById('old-departuretime').classList.add('hidden');
            document.getElementById('roomExitTime').textContent = "--:--";
            document.getElementById('old-roomExitTime').textContent = "";
            document.getElementById('old-roomExitTime').classList.add('hidden');
            document.querySelectorAll('.phase-card').forEach(card => card.classList.remove('time-shifted'));
            document.querySelectorAll('.pseudo-old-time').forEach(pseudo => {
                pseudo.style.display = 'none';
            });
            syncPhaseCardHeights();
            return;
        }

        const arrivalTime = new Date(flightDepartureTime.getTime() - checkInTimeMinutes * 60 * 1000);
        defaultDepartureTime = new Date(arrivalTime.getTime() - travelTimeMinutes * 60 * 1000);
        const departureTime = customDepartureTime ? new Date(customDepartureTime) : defaultDepartureTime;
        const isHotelMode = document.getElementById('hotelButton').classList.contains('active');
        defaultRoomExitTime = isHotelMode ? new Date(departureTime.getTime() - HOTEL_EXIT_OFFSET) : null;
        const roomExitTime = isHotelMode ? (customRoomExitTime ? new Date(customRoomExitTime) : defaultRoomExitTime) : null;

        defaultWakeTime = isHotelMode
            ? new Date(roomExitTime.getTime() - PREPARATION_TIME)
            : new Date(departureTime.getTime() - PREPARATION_TIME);
        const wakeTime = customWakeTime ? new Date(customWakeTime) : defaultWakeTime;
        const bedTime = new Date(wakeTime.getTime() - sleepHours * 60 * 60 * 1000);

        const flightTimeDiff = flightDepartureTime - localTime;
        const departureTimeDiff = departureTime - localTime;
        const wakeTimeDiff = wakeTime - localTime;
        const roomExitTimeDiff = isHotelMode ? roomExitTime - localTime : Infinity;
        const bedTimeDiff = bedTime - localTime;

        document.getElementById('flight-countdown-time').textContent = formatTimeDiff(flightTimeDiff);
        document.getElementById('departure-countdown-time-departure').textContent = formatTimeDiff(departureTimeDiff);
        document.getElementById('departure-countdown-time').textContent = formatTimeDiff(wakeTimeDiff);
        document.getElementById('bedtime-countdown-time').textContent = formatTimeDiff(bedTimeDiff);
        if (isHotelMode) {
            document.getElementById('room-exit-countdown-time').textContent = formatTimeDiff(roomExitTimeDiff);
            document.getElementById('roomExitTime').textContent = roomExitTime.toLocaleTimeString('ru-RU', options);
            const roomExitTimeElement = document.getElementById('roomExitTime');
            const oldRoomExitTimeElement = document.getElementById('old-roomExitTime');
            if (customRoomExitTime && defaultRoomExitTime && customRoomExitTime.getTime() !== defaultRoomExitTime.getTime()) {
                oldRoomExitTimeElement.textContent = defaultRoomExitTime.toLocaleTimeString('ru-RU', options);
                oldRoomExitTimeElement.classList.remove('hidden');
            } else {
                oldRoomExitTimeElement.textContent = "";
                oldRoomExitTimeElement.classList.add('hidden');
            }
        } else {
            document.getElementById('room-exit-countdown-time').textContent = "00:00";
            document.getElementById('roomExitTime').textContent = "--:--";
            document.getElementById('old-roomExitTime').textContent = "";
            document.getElementById('old-roomExitTime').classList.add('hidden');
        }

        document.getElementById('bedtime').textContent = bedTime.toLocaleTimeString('ru-RU', options);

        const waketimeElement = document.getElementById('waketime');
        const oldWaketimeElement = document.getElementById('old-waketime');
        waketimeElement.textContent = wakeTime.toLocaleTimeString('ru-RU', options);
        if (customWakeTime && defaultWakeTime && customWakeTime.getTime() !== defaultWakeTime.getTime()) {
            oldWaketimeElement.textContent = defaultWakeTime.toLocaleTimeString('ru-RU', options);
            oldWaketimeElement.classList.remove('hidden');
        } else {
            oldWaketimeElement.textContent = "";
            oldWaketimeElement.classList.add('hidden');
        }

        const departuretimeElement = document.getElementById('departuretime');
        const oldDeparturetimeElement = document.getElementById('old-departuretime');
        departuretimeElement.textContent = departureTime.toLocaleTimeString('ru-RU', options);
        if (customDepartureTime && defaultDepartureTime && customDepartureTime.getTime() !== defaultDepartureTime.getTime()) {
            oldDeparturetimeElement.textContent = defaultDepartureTime.toLocaleTimeString('ru-RU', options);
            oldDeparturetimeElement.classList.remove('hidden');
        } else {
            oldDeparturetimeElement.textContent = "";
            oldDeparturetimeElement.classList.add('hidden');
        }

        const hasOldTime = !oldWaketimeElement.classList.contains('hidden') ||
                           !oldDeparturetimeElement.classList.contains('hidden') ||
                           !document.getElementById('old-roomExitTime').classList.contains('hidden');

        document.querySelectorAll('.phase-card').forEach(card => {
            const oldTimeElement = card.querySelector('.old-time');
            const pseudoOldTimeElement = card.querySelector('.pseudo-old-time');
            if (hasOldTime) {
                if (!oldTimeElement || oldTimeElement.classList.contains('hidden')) {
                    pseudoOldTimeElement.style.display = 'block';
                    pseudoOldTimeElement.textContent = "--";
                } else {
                    pseudoOldTimeElement.style.display = 'none';
                    pseudoOldTimeElement.textContent = "";
                }
            } else {
                pseudoOldTimeElement.style.display = 'none';
                pseudoOldTimeElement.textContent = "";
            }
        });

        const wakeCard = document.querySelector('#waketime').parentElement;
        const departureCard = document.querySelector('#departuretime').parentElement;
        const roomExitCard = document.querySelector('#roomExitTime').parentElement;
        if (hasOldTime) {
            wakeCard.classList.add('time-shifted');
            departureCard.classList.add('time-shifted');
            if (isHotelMode) {
                roomExitCard.classList.add('time-shifted');
            }
        } else {
            wakeCard.classList.remove('time-shifted');
            departureCard.classList.remove('time-shifted');
            roomExitCard.classList.remove('time-shifted');
        }

        const phases = [
            { id: 'bedtime', time: bedTime, diff: bedTimeDiff, card: bedtimeCountdownCard, phaseCardId: 'bedtime' },
            { id: 'wake', time: wakeTime, diff: wakeTimeDiff, card: wakeCountdownCard, phaseCardId: 'waketime' }
        ];

        if (isHotelMode) {
            phases.push({ id: 'room-exit', time: roomExitTime, diff: roomExitTimeDiff, card: roomExitCountdownCard, phaseCardId: 'roomExitTime' });
        }

        phases.push(
            { id: 'departure', time: departureTime, diff: departureTimeDiff, card: departureCountdownCard, phaseCardId: 'departuretime' },
            { id: 'flight', time: flightDepartureTime, diff: flightTimeDiff, card: flightCountdownCard, phaseCardId: null }
        );

        phases.sort((a, b) => a.time - b.time);

        const futurePhases = phases.filter(phase => phase.diff > 0);
        if (futurePhases.length > 0) {
            phases.forEach(phase => {
                if (phase.card.classList.contains('appearing')) {
                    phase.card.classList.remove('appearing');
                }
                phase.card.classList.add('hidden');
            });

            const nearestPhase = futurePhases[0];
            if (wasHidden[nearestPhase.id]) {
                nearestPhase.card.classList.add('appearing');
                setTimeout(() => {
                    nearestPhase.card.classList.remove('appearing');
                }, 300);
            }
            nearestPhase.card.classList.remove('hidden');

            if (nearestPhase.phaseCardId) {
                const phaseElement = document.querySelector(`#${nearestPhase.phaseCardId}`);
                if (phaseElement) {
                    const phaseCard = phaseElement.closest('.phase-card');
                    if (phaseCard) {
                        phaseCard.classList.add('next-phase');
                    } else {
                        console.error(`Parent .phase-card not found for #${nearestPhase.phaseCardId}`);
                    }
                } else {
                    console.error(`Element #${nearestPhase.phaseCardId} not found`);
                }
            }
        }

        syncPhaseCardHeights();
    };

    function applySavedTravelMode(mode) {
    const phaseGrid = document.querySelector('.phase-grid');
    const roomExitCard = document.getElementById('room-exit');
    const departureTimeElement = document.getElementById('departuretime');
    const departureIcon = departureTimeElement ? departureTimeElement.parentElement.querySelector('.phase-icon') : null;

    const homeButton = document.getElementById('homeButton');
    const hotelButton = document.getElementById('hotelButton');

    localStorage.setItem('travelMode', mode);

    homeButton.classList.remove('active');
    hotelButton.classList.remove('active');

    if (mode === 'hotel') {
        hotelButton.classList.add('active');
        phaseGrid.classList.add('expanded');
        roomExitCard.classList.remove('hidden');
        if (departureIcon) {
            departureIcon.classList.remove('fas', 'fa-car');
            departureIcon.classList.add('fa-solid', 'fa-van-shuttle');
        }
    } else {
        homeButton.classList.add('active');
        phaseGrid.classList.remove('expanded');
        roomExitCard.classList.add('hidden');
        if (departureIcon) {
            departureIcon.classList.remove('fa-solid', 'fa-van-shuttle');
            departureIcon.classList.add('fas', 'fa-car');
        }
    }

    updateTime();
    updateModeHint();
}


function setTravelMode() {
    const baseAirport = localStorage.getItem('baseAirport');
    const departureAirport = departureAirportCode.textContent.trim();
    const phaseGrid = document.querySelector('.phase-grid');
    const roomExitCard = document.getElementById('room-exit');
    const departureTimeElement = document.getElementById('departuretime');
    const departureIcon = departureTimeElement ? departureTimeElement.parentElement.querySelector('.phase-icon') : null;

    if (!baseAirport || departureAirport === '---') {
        return; // Не меняем режим, если данных недостаточно
    }

    let mode;
    if (baseAirport === departureAirport) {
        mode = 'home';
    } else {
        mode = 'hotel';
    }

    localStorage.setItem('travelMode', mode);

    if (mode === 'hotel') {
        hotelButton.classList.add('active');
        homeButton.classList.remove('active');
        phaseGrid.classList.add('expanded');
        roomExitCard.classList.remove('hidden');
        if (departureIcon) {
            departureIcon.classList.remove('fas', 'fa-car');
            departureIcon.classList.add('fa-solid', 'fa-van-shuttle');
        }
    } else {
        homeButton.classList.add('active');
        hotelButton.classList.remove('active');
        phaseGrid.classList.remove('expanded');
        roomExitCard.classList.add('hidden');
        if (departureIcon) {
            departureIcon.classList.remove('fa-solid', 'fa-van-shuttle');
            departureIcon.classList.add('fas', 'fa-car');
        }
    }

    updateTime();
}

    function updateModeHint() {
    const modeHint = document.getElementById('mode-hint');
    if (!modeHint) {
        console.warn('Элемент с ID "mode-hint" не найден в DOM');
        return;
    }

    const baseAirport = localStorage.getItem('baseAirport');
    const departureAirport = departureAirportCode.textContent.trim();
    const isHotelMode = document.getElementById('hotelButton').classList.contains('active');

    modeHint.classList.remove('active');
    modeHint.textContent = '';

    if (baseAirport && departureAirport !== '---') {
        if (baseAirport === departureAirport && isHotelMode) {
            modeHint.textContent = 'Похоже, вы дома';
            modeHint.classList.add('active');
        } else if (baseAirport !== departureAirport && !isHotelMode) {
            modeHint.textContent = 'Похоже, вы в отеле';
            modeHint.classList.add('active');
        }
    }
}


    function syncPhaseCardHeights() {
        const phaseCards = document.querySelectorAll('.phase-card');
        phaseCards.forEach(card => {
            card.style.height = 'auto';
        });

        let maxHeight = 0;
        phaseCards.forEach(card => {
            const height = card.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        phaseCards.forEach(card => {
            card.style.height = `${maxHeight}px`;
        });
    }

    function loadSavedData() {
        localStorage.removeItem('autoTimezone');
        localStorage.removeItem('selectedTimezone');

        const savedDate = localStorage.getItem('flightDate');
        const savedPrefix = localStorage.getItem('flightPrefix') || 'SU';
        const savedNumber = localStorage.getItem('flightNumber');
        const savedEventTime = localStorage.getItem('eventTime');
        const savedDepartureTime = localStorage.getItem('customDepartureTime');
        const savedWakeTime = localStorage.getItem('customWakeTime');
        const savedRoomExitTime = localStorage.getItem('customRoomExitTime');
        const savedBaseAirport = localStorage.getItem('baseAirport');
        let savedMode = localStorage.getItem('travelMode') || 'home';
        checkInTimeMinutes = parseInt(localStorage.getItem('checkInTime')) || 120;

        if (savedBaseAirport && savedNumber && savedPrefix !== 'EVENT') {
            flightPrefixSelect.value = savedPrefix;
            toggleEventMode(savedPrefix === 'EVENT');
            if (savedNumber) {
                flightNumberInput.value = savedNumber;
            }
            if (savedDate) {
                dateInput.value = savedDate;
                handleFlightInfoUpdate().then(() => {
                    applySavedTravelMode(savedMode);
                    applySavedTravelMode(savedMode);
                });
            } else {
                applySavedTravelMode(savedMode);
                applySavedTravelMode(savedMode);
            }
        } else if (savedBaseAirport && savedPrefix === 'EVENT' && savedEventTime) {
            flightPrefixSelect.value = savedPrefix;
            toggleEventMode(true);
            if (savedDate) {
                dateInput.value = savedDate;
                updateFlightTimeFromEvent();
                applySavedTravelMode(savedMode);
                applySavedTravelMode(savedMode);
            } else {
                applySavedTravelMode(savedMode);
                applySavedTravelMode(savedMode);
            }
        } else {
            applySavedTravelMode(savedMode);
            applySavedTravelMode(savedMode);
        }

        if (savedDate) {
            dateInput.value = savedDate;
        } else {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedDate = tomorrow.toISOString().split('T')[0];
            dateInput.value = formattedDate;
            localStorage.setItem('flightDate', formattedDate);
        }

        flightPrefixSelect.value = savedPrefix;
        toggleEventMode(savedPrefix === 'EVENT');

        if (savedNumber) {
            flightNumberInput.value = savedNumber;
        }

        if (savedBaseAirport && airports[savedBaseAirport]) {
            baseAirportInput.value = savedBaseAirport;
            if (flightPrefixSelect.value === 'EVENT') {
                departureAirportCode.textContent = savedBaseAirport;
                departureAirportName.textContent = airports[savedBaseAirport].split(' - ')[1];
            }
        }

        if (savedEventTime && savedPrefix === 'EVENT') {
            toggleEventMode(true);
            const timeInput = document.createElement('input');
            timeInput.type = 'time';
            timeInput.className = 'flight-time-display input-mode';
            timeInput.value = savedEventTime;
            flightTimeDisplay.replaceWith(timeInput);
            timeInput.addEventListener('change', updateFlightTimeFromEvent);
        }

        if (savedDepartureTime) {
            customDepartureTime = new Date(savedDepartureTime);
        }

        if (savedWakeTime) {
            customWakeTime = new Date(savedWakeTime);
        }

        if (savedRoomExitTime) {
            customRoomExitTime = new Date(savedRoomExitTime);
        }

        if (savedDate && savedNumber && savedPrefix !== 'EVENT') {
            handleFlightInfoUpdate().then(() => {
                applySavedTravelMode(savedMode);
                applySavedTravelMode(savedMode);
            });
        } else if (savedDate && savedEventTime && savedPrefix === 'EVENT') {
            updateFlightTimeFromEvent();
            applySavedTravelMode(savedMode);
            applySavedTravelMode(savedMode);
        }
    }

    loadSavedData();

    dateInput.addEventListener('change', () => {
        localStorage.setItem('flightDate', dateInput.value);
        customDepartureTime = null;
        customWakeTime = null;
        localStorage.removeItem('customDepartureTime');
        localStorage.removeItem('customWakeTime');
        if (flightPrefixSelect.value === 'EVENT') {
            updateFlightTimeFromEvent();
        } else if (flightNumberInput.value) {
            handleFlightInfoUpdate();
        } else {
            flightDepartureTime = null;
            updateTime();
        }
    });

    flightPrefixSelect.addEventListener('change', () => {
    localStorage.setItem('flightPrefix', flightPrefixSelect.value);
    const isEvent = flightPrefixSelect.value === 'EVENT';
    toggleEventMode(isEvent);

    departureAirportCode.textContent = '---';
    departureAirportName.textContent = '-----';
    arrivalAirportCode.textContent = '---';
    arrivalAirportName.textContent = '-----';
    flightDepartureTime = null;
    customDepartureTime = null;
    customWakeTime = null;
    localStorage.removeItem('customDepartureTime');
    localStorage.removeItem('customWakeTime');
    updateTime();

    if (isEvent) {
        const savedEventTime = localStorage.getItem('eventTime');
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.className = 'flight-time-display input-mode';
        if (savedEventTime) {
            timeInput.value = savedEventTime;
        }
        flightTimeDisplay.replaceWith(timeInput);
        timeInput.addEventListener('change', updateFlightTimeFromEvent);
        if (savedEventTime && dateInput.value) {
            updateFlightTimeFromEvent();
        }
    } else {
        const currentElement = document.querySelector('.flight-time-display');
        const newFlightTimeDisplay = document.createElement('div');
        newFlightTimeDisplay.className = 'flight-time-display';
        newFlightTimeDisplay.id = 'flight-time-display';
        newFlightTimeDisplay.textContent = 'нет данных';
        newFlightTimeDisplay.classList.add('no-data');
        currentElement.replaceWith(newFlightTimeDisplay);
        flightDepartureTime = null;
        updateTime();
    }
    setTravelMode();
    updateModeHint();
});

    flightNumberInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 5) {
            this.value = this.value.slice(0, 5);
        }
        localStorage.setItem('flightNumber', this.value);
        managePlaceholders();
    });

    flightNumberInput.addEventListener('blur', () => {
    customDepartureTime = null;
    customWakeTime = null;
    localStorage.removeItem('customDepartureTime');
    localStorage.removeItem('customWakeTime');
    if (dateInput.value && flightPrefixSelect.value !== 'EVENT' && flightNumberInput.value) {
        handleFlightInfoUpdate().then(() => {
            setTravelMode();
            updateModeHint();
        });
    } else {
        flightDepartureTime = null;
        updateTime();
        setTravelMode();
        updateModeHint();
    }
});

    function managePlaceholders() {
        if (!dateInput.value) {
            dateInput.classList.add("placeholder");
        } else {
            dateInput.classList.remove("placeholder");
        }

        if (!flightNumberInput.value) {
            flightNumberInput.classList.add("placeholder");
        } else {
            flightNumberInput.classList.remove("placeholder");
        }
    }

    managePlaceholders();

    function fetchFlightInfo(flightNumber, date) {
        return new Promise((resolve, reject) => {
            console.log("Дата:", date);
            console.log("Номер рейса:", flightNumber);

            const proxyUrl = `https://cocsr.na4u.ru/main.php?flightNumber=${encodeURIComponent(flightNumber)}&date=${encodeURIComponent(date)}`;

            console.log("Сформированный URL:", proxyUrl);

            fetch(proxyUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Ошибка HTTP: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data || !data.data || !data.data.routes || data.error) {
                        console.error("Недостаточно данных или ошибка API:", data?.error || "Неизвестная ошибка");
                        resolve(null);
                    } else {
                        console.log("Полученные данные:", data);
                        const cacheKey = `flightData_${flightNumber}_${date}`;
                        const cacheData = {
                            data: data,
                            timestamp: Date.now()
                        };
                        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                        resolve(data);
                    }
                })
                .catch(error => {
                    console.error("Ошибка при запросе:", error);
                    resolve(null);
                });
        });
    }

    function triggerShakeAndVibrate() {
        const elementsToShake = [
            departureAirportCode,
            departureAirportName,
            arrivalAirportCode,
            arrivalAirportName
        ];
        elementsToShake.forEach(element => {
            element.classList.remove('shake');
            void element.offsetWidth;
            element.classList.add('shake');
            setTimeout(() => element.classList.remove('shake'), 300);
        });

        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    function showLoadingSpinner() {
        const currentElement = document.querySelector('.flight-time-display');
        if (!currentElement) return;

        if (currentElement.classList.contains('loading-spinner')) {
            currentElement.remove();
        }

        const spinner = document.createElement('div');
        spinner.className = 'flight-time-display loading-spinner';
        spinner.id = 'flight-time-display';
        spinner.innerHTML = '<div class="spinner"></div>';
        currentElement.replaceWith(spinner);
    }

    function displayFlightInfo(flightData) {
        const currentElement = document.querySelector('.flight-time-display');
        const newFlightTimeDisplay = document.createElement('div');
        newFlightTimeDisplay.className = 'flight-time-display';
        newFlightTimeDisplay.id = 'flight-time-display';
        newFlightTimeDisplay.textContent = 'нет данных';
        newFlightTimeDisplay.classList.add('no-data');

        const now = new Date();
        const moscowTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + MOSCOW_OFFSET);

        // Проверка валидности flightData
        if (!flightData || !flightData.data || !flightData.data.routes || flightData.data.routes.length === 0) {
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            flightDepartureTime = null;
            newFlightTimeDisplay.textContent = 'нет данных';
            triggerShakeAndVibrate();
            console.log("Аэропорт прилета: ---");
            console.log("Время вылета: Не указано");
            currentElement.replaceWith(newFlightTimeDisplay);
            updateTime();
            return;
        }

        const flight = flightData.data.routes[0];
        let leg;

        // Определяем, является ли рейс MultiLeg или Direct
        if (flight.routeType === 'MultiLeg' && flight.legs && flight.legs.length > 0) {
            leg = flight.legs[0]; // Берем первый сегмент для MultiLeg
        } else if (flight.routeType === 'Direct' && flight.leg) {
            leg = flight.leg; // Используем leg для Direct
        } else {
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            flightDepartureTime = null;
            newFlightTimeDisplay.textContent = 'нет данных';
            triggerShakeAndVibrate();
            console.log("Ошибка: Недостаточно данных о рейсе");
            currentElement.replaceWith(newFlightTimeDisplay);
            updateTime();
            return;
        }

        const baseAirport = localStorage.getItem('baseAirport');
        const departureAirport = leg.departure?.scheduled?.airportCode?.trim();

        if (baseAirport && departureAirport) {
        const newMode = (baseAirport === departureAirport) ? 'home' : 'hotel';
        applySavedTravelMode(newMode);
        }

        // Проверка наличия departure и times
        if (!leg.departure || !leg.departure.times) {
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            flightDepartureTime = null;
            newFlightTimeDisplay.textContent = 'нет данных';
            triggerShakeAndVibrate();
            console.log("Ошибка: Данные о вылете отсутствуют");
            currentElement.replaceWith(newFlightTimeDisplay);
            updateTime();
            return;
        }

        const departureTimeStr = leg.departure.times.estimatedBlockOff?.local ||
                                leg.departure.times.scheduledDeparture?.local;

        console.log("Время вылета из API (departureTimeStr):", departureTimeStr);

        const flightDate = new Date(dateInput.value);
        let departureDateTime;

        if (!departureTimeStr) {
            console.error("Время вылета не указано в данных API");
            flightDepartureTime = null;
            newFlightTimeDisplay.textContent = 'Ошибка времени';
            currentElement.replaceWith(newFlightTimeDisplay);
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            triggerShakeAndVibrate();
            updateTime();
            return;
        }

        if (departureTimeStr.includes('T')) {
            departureDateTime = new Date(departureTimeStr);
        } else if (departureTimeStr.includes(' ')) {
            departureDateTime = new Date(departureTimeStr);
        } else {
            const [hours, minutes] = departureTimeStr.split(':').map(Number);
            departureDateTime = new Date(flightDate);
            departureDateTime.setHours(hours, minutes, 0, 0);
        }

        if (isNaN(departureDateTime.getTime())) {
            console.error("Некорректное время вылета:", departureTimeStr);
            flightDepartureTime = null;
            newFlightTimeDisplay.textContent = 'Ошибка времени';
            currentElement.replaceWith(newFlightTimeDisplay);
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            triggerShakeAndVibrate();
            updateTime();
            return;
        }

        flightDepartureTime = departureDateTime;
        console.log("Итоговое время вылета (flightDepartureTime):", flightDepartureTime);

        if (flightDepartureTime < moscowTime) {
            console.log("Время вылета рейса уже прошло:", flightDepartureTime, "<", moscowTime);
            flightDepartureTime = null;
            newFlightTimeDisplay.textContent = 'Рейс уже прошел';
            currentElement.replaceWith(newFlightTimeDisplay);
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            updateTime();
            return;
        }

        const formattedTime = flightDepartureTime.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        newFlightTimeDisplay.textContent = formattedTime;
        newFlightTimeDisplay.classList.remove('no-data');
        currentElement.replaceWith(newFlightTimeDisplay);

        const applyFadeAnimation = (element, newText) => {
            element.classList.remove('fade');
            setTimeout(() => {
                element.textContent = newText;
                element.classList.add('fade');
            }, 0);
        };

        applyFadeAnimation(departureAirportCode, leg.departure.scheduled.airportCode || 'N/A');
        applyFadeAnimation(departureAirportName, leg.departure.scheduled.airport || 'Неизвестно');
        applyFadeAnimation(arrivalAirportCode, leg.arrival.scheduled.airportCode || 'N/A');
        applyFadeAnimation(arrivalAirportName, leg.arrival.scheduled.airport || 'Неизвестно');

        console.log("Аэропорт прилета:", leg.arrival.scheduled.airportCode || 'N/A');
        console.log("Время вылета:", formattedTime);
        updateTime();
    }

    async function handleFlightInfoUpdate() {
        try {
            const prefix = flightPrefixSelect.value;
            let number = flightNumberInput.value.trim();
            number = number.padStart(4, '0');
            const flightNumber = `${prefix}${number}`.toUpperCase();
            const date = dateInput.value;

            if (!number || !date || !number.match(/^\d{1,5}$/)) {
                const currentElement = document.querySelector('.flight-time-display');
                const newFlightTimeDisplay = document.createElement('div');
                newFlightTimeDisplay.className = 'flight-time-display';
                newFlightTimeDisplay.id = 'flight-time-display';
                newFlightTimeDisplay.textContent = 'нет данных';
                newFlightTimeDisplay.classList.add('no-data');
                currentElement.replaceWith(newFlightTimeDisplay);

                departureAirportCode.textContent = '---';
                departureAirportName.textContent = '-----';
                arrivalAirportCode.textContent = '---';
                arrivalAirportName.textContent = '-----';
                flightDepartureTime = null;
                updateTime();
                return;
            }

            showLoadingSpinner();

            const cacheKey = `flightData_${flightNumber}_${date}`;
            const cachedData = localStorage.getItem(cacheKey);
            let flightData = null;

            if (cachedData) {
                try {
                    const parsedData = JSON.parse(cachedData);
                    const currentTime = Date.now();
                    const timeSinceLastFetch = currentTime - parsedData.timestamp;

                    if (timeSinceLastFetch < CACHE_DURATION && parsedData.data && parsedData.data.routes) {
                        console.log("Используем кэшированные данные для", flightNumber, date);
                        flightData = parsedData.data;
                    } else {
                        console.log("Кэш устарел, делаем новый запрос для", flightNumber, date);
                        flightData = await fetchFlightInfo(flightNumber, date);
                    }
                } catch (e) {
                    console.error("Ошибка при разборе кэшированных данных:", e);
                    localStorage.removeItem(cacheKey);
                    flightData = await fetchFlightInfo(flightNumber, date);
                }
            } else {
                console.log("Данные отсутствуют в кэше, делаем новый запрос для", flightNumber, date);
                flightData = await fetchFlightInfo(flightNumber, date);
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            displayFlightInfo(flightData);
        } catch (error) {
            console.error("Ошибка в handleFlightInfoUpdate:", error);
            const currentElement = document.querySelector('.flight-time-display');
            const newFlightTimeDisplay = document.createElement('div');
            newFlightTimeDisplay.className = 'flight-time-display';
            newFlightTimeDisplay.id = 'flight-time-display';
            newFlightTimeDisplay.textContent = 'Ошибка загрузки';
            newFlightTimeDisplay.classList.add('no-data');
            currentElement.replaceWith(newFlightTimeDisplay);
            updateTime();
        }
    }

    function toggleEventMode(isEvent) {
    const savedBaseAirport = localStorage.getItem('baseAirport');
    if (isEvent) {
        flightNumberInput.style.display = 'none';
        flightPrefixSelect.classList.add('expanded');
        if (savedBaseAirport && airports[savedBaseAirport]) {
            departureAirportCode.textContent = savedBaseAirport;
            departureAirportName.textContent = airports[savedBaseAirport].split(' - ')[1];
        } else {
            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
        }
    } else {
        flightNumberInput.style.display = 'block';
        flightPrefixSelect.classList.remove('expanded');
        const currentElement = document.querySelector('.flight-time-display');
        const newFlightTimeDisplay = document.createElement('div');
        newFlightTimeDisplay.className = 'flight-time-display';
        newFlightTimeDisplay.id = 'flight-time-display';
        newFlightTimeDisplay.textContent = 'нет данных';
        newFlightTimeDisplay.classList.add('no-data');
        currentElement.replaceWith(newFlightTimeDisplay);
        departureAirportCode.textContent = '---';
        departureAirportName.textContent = '-----';
    }
    setTravelMode();
    updateModeHint();
}

    function updateFlightTimeFromEvent() {
        const timeInput = document.querySelector('.flight-time-display.input-mode');
        const currentElement = document.querySelector('.flight-time-display');
        const newFlightTimeDisplay = document.createElement('div');
        newFlightTimeDisplay.className = 'flight-time-display';
        newFlightTimeDisplay.id = 'flight-time-display';

        if (timeInput && timeInput.value && dateInput.value) {
            const timeValue = timeInput.value;
            localStorage.setItem('eventTime', timeValue);
            const [hours, minutes] = timeValue.split(':');
            const eventDate = new Date(dateInput.value);
            eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            flightDepartureTime = eventDate;

            const now = new Date();
            const moscowTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + MOSCOW_OFFSET);
            if (flightDepartureTime < moscowTime) {
                console.log("Время события уже прошло:", flightDepartureTime, "<", moscowTime);
                flightDepartureTime = null;
                newFlightTimeDisplay.textContent = 'нет данных';
                newFlightTimeDisplay.classList.add('no-data');
                currentElement.replaceWith(newFlightTimeDisplay);
                departureAirportCode.textContent = '---';
                departureAirportName.textContent = '-----';
                arrivalAirportCode.textContent = '---';
                arrivalAirportName.textContent = '-----';
                updateTime();
                return;
            }

            newFlightTimeDisplay.textContent = timeValue;
            newFlightTimeDisplay.classList.remove('no-data');
            currentElement.replaceWith(newFlightTimeDisplay);

            departureAirportCode.textContent = '---';
            departureAirportName.textContent = '-----';
            arrivalAirportCode.textContent = '---';
            arrivalAirportName.textContent = '-----';
            updateTime();
        } else {
            flightDepartureTime = null;
            newFlightTimeDisplay.textContent = 'нет данных';
            newFlightTimeDisplay.classList.add('no-data');
            currentElement.replaceWith(newFlightTimeDisplay);
            updateTime();
        }
    }

    function toggleRoomExitCard(show) {
        const roomExitCard = document.getElementById('room-exit');
        if (show) {
            roomExitCard.classList.remove("hidden");
            roomExitCard.classList.add("appearing");
            setTimeout(() => {
                roomExitCard.classList.remove("appearing");
            }, 300);
        } else {
            roomExitCard.classList.add("disappearing");
            setTimeout(() => {
                roomExitCard.classList.remove("disappearing");
                roomExitCard.classList.add("hidden");
            }, 300);
        }
        updateTime();
    }

    function adjustPhaseCardSizes(expanded) {
        phaseGrid.classList.toggle("expanded", expanded);
        phaseCards.forEach(card => {
            card.style.transition = "transform 0.6s ease-in-out";
            requestAnimationFrame(() => {
                card.style.transform = expanded ? "scale(0.9)" : "scale(1)";
            });
        });
        setTimeout(syncPhaseCardHeights, 300);
    }

    document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const isHotel = this.id === 'hotelButton';
        const homeButton = document.getElementById('homeButton');
        const hotelButton = document.getElementById('hotelButton');

        homeButton.classList.remove('active');
        hotelButton.classList.remove('active');
        this.classList.add('active');

        const phaseGrid = document.querySelector('.phase-grid');
        const roomExitCard = document.getElementById('room-exit');
        const departureTimeElement = document.getElementById('departuretime');
        const departureIcon = departureTimeElement ? departureTimeElement.parentElement.querySelector('.phase-icon') : null;

        const mode = isHotel ? 'hotel' : 'home';
        localStorage.setItem('travelMode', mode);

        if (isHotel) {
            phaseGrid.classList.add('expanded');
            roomExitCard.classList.remove('hidden');
            roomExitCard.classList.add('appearing');
            setTimeout(() => roomExitCard.classList.remove('appearing'), 300);

            if (departureIcon) {
                departureIcon.classList.add('icon-disappear');
                setTimeout(() => {
                    departureIcon.classList.remove('fas', 'fa-car');
                    departureIcon.classList.add('fa-solid', 'fa-van-shuttle');
                    departureIcon.classList.remove('icon-disappear');
                    departureIcon.classList.add('icon-appear');
                    setTimeout(() => departureIcon.classList.remove('icon-appear'), 300);
                }, 300);
            }
        } else {
            roomExitCard.classList.add('disappearing');
            setTimeout(() => {
                phaseGrid.classList.remove('expanded');
                roomExitCard.classList.add('hidden');
                roomExitCard.classList.remove('disappearing');
            }, 300);

            if (departureIcon) {
                departureIcon.classList.add('icon-disappear');
                setTimeout(() => {
                    departureIcon.classList.remove('fa-solid', 'fa-van-shuttle');
                    departureIcon.classList.add('fas', 'fa-car');
                    departureIcon.classList.remove('icon-disappear');
                    departureIcon.classList.add('icon-appear');
                    setTimeout(() => departureIcon.classList.remove('icon-appear'), 300);
                }, 300);
            }
        }

        updateTime();
        updateModeHint();
    });
});


    function formatTimeDiff(timeDiff) {
        if (timeDiff <= 0) return "00:00";
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours} ч ${minutes.toString().padStart(2, '0')} мин`;
    }



    setInterval(updateTime, 1000);
    updateTime();

    const updateSleep = () => {
        const hours = Math.floor(sleepHours);
        const minutes = Math.round((sleepHours - hours) * 60);
        document.getElementById('sleep-value').textContent = `${hours} ч ${minutes} мин`;
        localStorage.setItem('sleepHours', sleepHours);
        updateTime();
    };

    updateSleep();

    document.getElementById('increase-sleep').addEventListener('click', () => {
        if (sleepHours < 10) {
            sleepHours += 0.5;
            updateSleep();
        }
    });

    document.getElementById('decrease-sleep').addEventListener('click', () => {
        if (sleepHours > 0) {
            sleepHours -= 0.5;
            updateSleep();
        }
    });

    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeModal = document.getElementById('close-modal');

    settingsButton.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });

    const travelTimeInput = document.getElementById('travel-time-input');
    if (travelTimeInput) {
        travelTimeInput.value = travelTimeMinutes;
        travelTimeInput.addEventListener('change', (e) => {
            travelTimeMinutes = parseInt(e.target.value) || 40;
            localStorage.setItem('travelTime', travelTimeMinutes);
            customDepartureTime = null;
            customWakeTime = null;
            localStorage.removeItem('customDepartureTime');
            localStorage.removeItem('customWakeTime');
            updateTime();
        });
    }

    const checkInTimeInput = document.getElementById('check-in-time-input');
    if (checkInTimeInput) {
        checkInTimeInput.value = checkInTimeMinutes;
        checkInTimeInput.addEventListener('change', (e) => {
            let newValue = parseInt(e.target.value) || 120;
            if (newValue < 30 || newValue > 240) {
                alert('Время должно быть от 30 до 240 минут.');
                newValue = Math.max(30, Math.min(240, newValue));
                e.target.value = newValue;
            }
            checkInTimeMinutes = newValue;
            localStorage.setItem('checkInTime', checkInTimeMinutes);
            customDepartureTime = null;
            customWakeTime = null;
            customRoomExitTime = null;
            localStorage.removeItem('customDepartureTime');
            localStorage.removeItem('customWakeTime');
            localStorage.removeItem('customRoomExitTime');
            resetAllPhases();
        });
    }

    const departureCard = document.querySelector('.phase-card:has(#departuretime)');
    departureCard.addEventListener('click', () => {
        if (!flightDepartureTime) return;
        const departureModal = document.getElementById('departure-time-modal');
        const departureInput = document.getElementById('departure-time-input');

        const currentDepartureTime = customDepartureTime || defaultDepartureTime;
        if (currentDepartureTime) {
            const hours = currentDepartureTime.getHours().toString().padStart(2, '0');
            const minutes = currentDepartureTime.getMinutes().toString().padStart(2, '0');
            departureInput.value = `${hours}:${minutes}`;
        }

        departureModal.classList.add('active');
    });

    const departureModal = document.getElementById('departure-time-modal');
    const departureInput = document.getElementById('departure-time-input');
    const increaseDepartureBtn = document.getElementById('increase-departure-time');
    const decreaseDepartureBtn = document.getElementById('decrease-departure-time');
    const resetDepartureBtn = document.getElementById('reset-departure-time');
    const doneDepartureBtn = document.getElementById('done-departure-time');

    departureModal.addEventListener('click', (e) => {
        if (e.target === departureModal) {
            departureModal.classList.remove('active');
        }
    });

    function recalculatePhaseTimes(changedPhase, newTime) {
        const isHotelMode = document.getElementById('hotelButton').classList.contains('active');

        if (changedPhase === 'wake') {
            customWakeTime = new Date(newTime);
            localStorage.setItem('customWakeTime', customWakeTime.toISOString());
        } else if (changedPhase === 'departure') {
            customDepartureTime = new Date(newTime);
            localStorage.setItem('customDepartureTime', customDepartureTime.toISOString());
            if (isHotelMode) {
                customRoomExitTime = null;
                localStorage.removeItem('customRoomExitTime');
            }
        } else if (changedPhase === 'room-exit') {
            customRoomExitTime = new Date(newTime);
            localStorage.setItem('customRoomExitTime', customRoomExitTime.toISOString());
        }

        updateTime();
    }

    function resetDepartureTime() {
        customDepartureTime = null;
        localStorage.removeItem('customDepartureTime');
        updateTime();
    }

    function resetWakeTime() {
        customWakeTime = null;
        localStorage.removeItem('customWakeTime');
        updateTime();
    }

    function resetRoomExitTime() {
        customRoomExitTime = null;
        localStorage.removeItem('customRoomExitTime');
        updateTime();
    }

    function resetAllPhases() {
        if (!flightDepartureTime) return;
        const arrivalTime = new Date(flightDepartureTime.getTime() - checkInTimeMinutes * 60 * 1000);
        defaultDepartureTime = new Date(arrivalTime.getTime() - travelTimeMinutes * 60 * 1000);
        customDepartureTime = null;
        localStorage.removeItem('customDepartureTime');

        const isHotelMode = document.getElementById('hotelButton').classList.contains('active');
        const departureTime = defaultDepartureTime;
        defaultRoomExitTime = isHotelMode ? new Date(departureTime.getTime() - HOTEL_EXIT_OFFSET) : null;
        customRoomExitTime = null;
        localStorage.removeItem('customRoomExitTime');

        defaultWakeTime = isHotelMode
            ? new Date(defaultRoomExitTime.getTime() - PREPARATION_TIME)
            : new Date(departureTime.getTime() - PREPARATION_TIME);
        customWakeTime = null;
        localStorage.removeItem('customWakeTime');

        updateTime();
    }

    departureInput.addEventListener('change', () => {
        const [hours, minutes] = departureInput.value.split(':');
        const newTime = new Date(dateInput.value);
        newTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        recalculatePhaseTimes('departure', newTime);
    });

    increaseDepartureBtn.addEventListener('click', () => {
        let currentTime = departureInput.value ? new Date(`${dateInput.value}T${departureInput.value}:00`) : new Date(defaultDepartureTime);
        currentTime.setMinutes(currentTime.getMinutes() + 5);

        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        departureInput.value = `${hours}:${minutes}`;

        recalculatePhaseTimes('departure', currentTime);
    });

    decreaseDepartureBtn.addEventListener('click', () => {
        let currentTime = departureInput.value ? new Date(`${dateInput.value}T${departureInput.value}:00`) : new Date(defaultDepartureTime);
        currentTime.setMinutes(currentTime.getMinutes() - 5);

        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        departureInput.value = `${hours}:${minutes}`;

        recalculatePhaseTimes('departure', currentTime);
    });

    resetDepartureBtn.addEventListener('click', () => {
        resetDepartureTime();
        document.getElementById('old-departuretime').textContent = "";
        document.getElementById('old-departuretime').classList.add('hidden');
        departureModal.classList.remove('active');
    });

    doneDepartureBtn.addEventListener('click', () => {
        departureModal.classList.remove('active');
    });

    const wakeCard = document.querySelector('.phase-card:has(#waketime)');
    wakeCard.addEventListener('click', () => {
        if (!flightDepartureTime) return;
        const wakeModal = document.getElementById('wake-time-modal');
        const wakeInput = document.getElementById('wake-time-input');

        const currentWakeTime = customWakeTime || defaultWakeTime;
        if (currentWakeTime) {
            const hours = currentWakeTime.getHours().toString().padStart(2, '0');
            const minutes = currentWakeTime.getMinutes().toString().padStart(2, '0');
            wakeInput.value = `${hours}:${minutes}`;
        }

        wakeModal.classList.add('active');
    });

    const wakeModal = document.getElementById('wake-time-modal');
    const wakeInput = document.getElementById('wake-time-input');
    const increaseWakeBtn = document.getElementById('increase-wake-time');
    const decreaseWakeBtn = document.getElementById('decrease-wake-time');
    const resetWakeBtn = document.getElementById('reset-wake-time');
    const doneWakeBtn = document.getElementById('done-wake-time');

    wakeModal.addEventListener('click', (e) => {
        if (e.target === wakeModal) {
            wakeModal.classList.remove('active');
        }
    });

    wakeInput.addEventListener('change', () => {
        const [hours, minutes] = wakeInput.value.split(':');
        const newTime = new Date(dateInput.value);
        newTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        recalculatePhaseTimes('wake', newTime);
    });

    increaseWakeBtn.addEventListener('click', () => {
        let currentTime = wakeInput.value ? new Date(`${dateInput.value}T${wakeInput.value}:00`) : new Date(defaultWakeTime);
        currentTime.setMinutes(currentTime.getMinutes() + 5);

        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        wakeInput.value = `${hours}:${minutes}`;

        recalculatePhaseTimes('wake', currentTime);
    });

    decreaseWakeBtn.addEventListener('click', () => {
        let currentTime = wakeInput.value ? new Date(`${dateInput.value}T${wakeInput.value}:00`) : new Date(defaultWakeTime);
        currentTime.setMinutes(currentTime.getMinutes() - 5);

        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        wakeInput.value = `${hours}:${minutes}`;

        recalculatePhaseTimes('wake', currentTime);
    });

    resetWakeBtn.addEventListener('click', () => {
        resetWakeTime();
        document.getElementById('old-waketime').textContent = "";
        document.getElementById('old-waketime').classList.add('hidden');
        wakeModal.classList.remove('active');
    });

    doneWakeBtn.addEventListener('click', () => {
        wakeModal.classList.remove('active');
    });

    const roomExitCard = document.querySelector('.phase-card:has(#roomExitTime)');
    roomExitCard.addEventListener('click', () => {
        if (!flightDepartureTime || !document.getElementById('hotelButton').classList.contains('active')) return;
        const roomExitModal = document.getElementById('room-exit-time-modal');
        const roomExitInput = document.getElementById('room-exit-time-input');

        const currentRoomExitTime = customRoomExitTime || defaultRoomExitTime;
        if (currentRoomExitTime) {
            const hours = currentRoomExitTime.getHours().toString().padStart(2, '0');
            const minutes = currentRoomExitTime.getMinutes().toString().padStart(2, '0');
            roomExitInput.value = `${hours}:${minutes}`;
        }

        roomExitModal.classList.add('active');
    });

    const roomExitModal = document.getElementById('room-exit-time-modal');
    const roomExitInput = document.getElementById('room-exit-time-input');
    const increaseRoomExitBtn = document.getElementById('increase-room-exit-time');
    const decreaseRoomExitBtn = document.getElementById('decrease-room-exit-time');
    const resetRoomExitBtn = document.getElementById('reset-room-exit-time');
    const doneRoomExitBtn = document.getElementById('done-room-exit-time');

    roomExitModal.addEventListener('click', (e) => {
        if (e.target === roomExitModal) {
            roomExitModal.classList.remove('active');
        }
    });

    roomExitInput.addEventListener('change', () => {
        const [hours, minutes] = roomExitInput.value.split(':');
        const newTime = new Date(dateInput.value);
        newTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        recalculatePhaseTimes('room-exit', newTime);
    });

    increaseRoomExitBtn.addEventListener('click', () => {
        let currentTime = roomExitInput.value ? new Date(`${dateInput.value}T${roomExitInput.value}:00`) : new Date(defaultRoomExitTime);
        currentTime.setMinutes(currentTime.getMinutes() + 5);

        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        roomExitInput.value = `${hours}:${minutes}`;

        recalculatePhaseTimes('room-exit', currentTime);
    });

    decreaseRoomExitBtn.addEventListener('click', () => {
        let currentTime = roomExitInput.value ? new Date(`${dateInput.value}T${roomExitInput.value}:00`) : new Date(defaultRoomExitTime);
        currentTime.setMinutes(currentTime.getMinutes() - 5);

        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        roomExitInput.value = `${hours}:${minutes}`;

        recalculatePhaseTimes('room-exit', currentTime);
    });

    resetRoomExitBtn.addEventListener('click', () => {
        resetRoomExitTime();
        document.getElementById('old-roomExitTime').textContent = "";
        document.getElementById('old-roomExitTime').classList.add('hidden');
        roomExitModal.classList.remove('active');
    });

    doneRoomExitBtn.addEventListener('click', () => {
        roomExitModal.classList.remove('active');
    });

    function adjustDateInputWidth() {
        const flightTimeInputs = document.querySelector('.flight-time-inputs');
        const dateInput = document.querySelector('.date-input');
        if (flightTimeInputs && dateInput) {
            const flightTimeInputsWidth = flightTimeInputs.getBoundingClientRect().width;
            dateInput.style.width = `${flightTimeInputsWidth}px`;
        }
    }

    window.addEventListener('load', () => {
        setTimeout(adjustDateInputWidth, 100);
        syncPhaseCardHeights();
    });
    window.addEventListener('resize', () => {
        adjustDateInputWidth();
        syncPhaseCardHeights();
    });

    let currentPresetPhase = null;
    let presetMinutes = 0;

    function loadPresets(phase) {
        return JSON.parse(localStorage.getItem(`presets_${phase}`)) || [];
    }

    function savePreset(phase, name, minutes) {
        const presets = loadPresets(phase);
        presets.push({ name, minutes });
        localStorage.setItem(`presets_${phase}`, JSON.stringify(presets));
    }

    function updatePresetTimeDisplay() {
        const hours = Math.floor(presetMinutes / 60);
        const minutes = presetMinutes % 60;
        document.getElementById('preset-time-value').textContent = `${hours} ч ${minutes} мин`;
    }

    function openPresetModal(phase) {
        currentPresetPhase = phase;
        presetMinutes = 0;
        updatePresetTimeDisplay();
        document.getElementById('preset-name').value = '';
        document.getElementById('preset-modal').classList.add('active');
    }

    document.getElementById('create-departure-preset').addEventListener('click', () => {
        openPresetModal('departure');
    });

    document.getElementById('create-wake-preset').addEventListener('click', () => {
        openPresetModal('wake');
    });

    document.getElementById('create-room-exit-preset').addEventListener('click', () => {
        openPresetModal('room-exit');
    });

    const presetModal = document.getElementById('preset-modal');
    const closePresetModal = document.getElementById('close-preset-modal');

    closePresetModal.addEventListener('click', () => {
        presetModal.classList.remove('active');
    });

    presetModal.addEventListener('click', (e) => {
        if (e.target === presetModal) {
            presetModal.classList.remove('active');
        }
    });

    document.getElementById('increase-preset-time').addEventListener('click', () => {
        if (presetMinutes < 60) {
            presetMinutes += 5;
            updatePresetTimeDisplay();
        }
    });

    document.getElementById('decrease-preset-time').addEventListener('click', () => {
        if (presetMinutes > 0) {
            presetMinutes -= 5;
            updatePresetTimeDisplay();
        }
    });

    document.getElementById('save-preset').addEventListener('click', () => {
        const presetName = document.getElementById('preset-name').value.trim();
        if (!presetName) {
            alert('Пожалуйста, введите название пресета.');
            return;
        }
        if (!currentPresetPhase) {
            alert('Ошибка: фаза не выбрана.');
            return;
        }
        savePreset(currentPresetPhase, presetName, presetMinutes);
        presetModal.classList.remove('active');
        alert(`Пресет "${presetName}" сохранён для ${currentPresetPhase}.`);
    });
});