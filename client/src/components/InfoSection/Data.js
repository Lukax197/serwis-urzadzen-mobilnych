import img1 from '../../images/svg-1.svg'
import img2 from '../../images/svg-2.svg'
import img3 from '../../images/svg-8.svg'
import img4 from '../../images/svg-4.svg'
import img5 from '../../images/svg-5.svg'
import img6 from '../../images/svg-6.svg'

export const homeObjOne = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Serwis mobilny',
    headLine: 'Jesteśmy firmą z 10-cio letnim doświadczeniem',
    description: 'Nasza firma powstała w 2012 roku. Na początku zajmowaliśmy się głównie naprawą smartfonów, ale wraz z rozwojem rozszerzyliśmy naszą działalność.',
    buttonLabel: 'Dowiedz się więcej',
    buttonLinkTo: '/o-nas',
    imgStart: false,
    img: img1,
    alt: 'Car',
    dark: true,
    primary: true,
    darkText: false
}

export const homeObjTwo = {
    id: 'discover',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Kompleksowa naprawa',
    headLine: 'Poradzimy sobie z każdym problemem',
    description: 'Jesteśmy serwisem specjalizującym się w serwisie szeroko pojętych urządzeń mobilnych. Naprawiamy m.in smartfony, tablety, laptopy itp.',
    buttonLabel: 'Przejdź do oferty',
    buttonLinkTo: '/oferta',
    imgStart: true,
    img: img2,
    alt: 'Device',
    dark: false,
    primary: false,
    darkText: true
}

export const homeObjThree = {
    id: 'wycena',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Szybka wycena',
    headLine: 'Skorzystaj z szybkiej i bezpłatnej wyceny naprawy',
    description: "Zastanawiasz się ile zapłacisz za naprawę twojego urządzenia? To nic trudnego, wystarczy, że wyszukasz swój sprzęt i wybierzesz uszkodzone elementy. System dokona natychmiastowej wyceny.",
    buttonLabel: 'Przejdź do wyceny',
    buttonLinkTo: '/wycena',
    imgStart: false,
    img: img3,
    alt: 'wycena',
    dark: false,
    primary: false,
    darkText: true
}

export const homeObjFour = {
    id: 'naprawa',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Zleć naprawę',
    headLine: 'Wypełnij formularz i zgłoś chęć naprawy',
    description: "Aby dokonać zlecenia naprawy, należy wypełnić przygotowany przez nas formularz, a następnie przesłać lub dostarczyć do nas twoje urządzenie.",
    buttonLabel: 'Wypełnij formularz',
    buttonLinkTo: '/zlec-naprawe',
    imgStart: true,
    img: img5,
    alt: 'card',
    dark: true,
    primary: true,
    darkText: false
}

export const homeObjFive = {
    id: 'contact',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Przyjdź do nas',
    headLine: 'Nie chcesz wysyłać urządzenia? Żaden problem!',
    description: "Jeśli chcesz dokonać zlecenia na miejscu, zapraszamy Cię do naszego serwisu. Działamy w Warszawie, przy ulicy Marszałkowskiej 128. Jesteśmy dostępni od poniedziałku do piątku, między 8:00, a 18:00.",
    buttonLabel: 'Szczegóły',
    buttonLinkTo: '/kontakt',
    imgStart: false,
    img: img6,
    alt: 'wycena',
    dark: false,
    primary: false,
    darkText: true
}