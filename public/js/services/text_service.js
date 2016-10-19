//Used to hold textfields throughout application
angular.module("samesameApp.services.text", [])
    .value("TextStrings", {
        registerAnswerHeader: "Er du sånn eller slik?",
        registerParticipant1Text: "Bli med i trekkningen av et Airboard. Fortell oss hva du heter og hvilken e-postadresse vi skal bruke hvis du trekkes ut som VINNER! ",
        registerParticipant2Text: "Ingen fare: Vi sletter både navn og e-post etter trekningen. Æresord og kors på halsen."
    })

    .value("SliderConstants", {
        numberOfImagesInCarousel: 19,
        numberOfListsTypePerson: 2,
        getMillisForCarouselSlide: 6000,
        getMillisForTypePerson: 6000,
        getMillisForSlides: 6000,
        getMillisForDisplayLogo: 6000
    });