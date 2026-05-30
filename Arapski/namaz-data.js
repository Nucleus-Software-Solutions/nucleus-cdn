// ============================================================
// NAMAZ — content data (shared between namaz.html and tools/generate-namaz-audio.mjs)
// Dodaj ovdje nove dijelove namaza po potrebi (id mora biti unikatan).
// Ako dodaš nove fraze, ponovo pokreni generator:
//   cd tools && npm run gen
// ============================================================
const NAMAZ_SECTIONS = [
  {
    id: 'tekbir',
    title: 'Tekbir (početni)',
    titleAr: 'تَكْبِيرَةُ الْإِحْرَامِ',
    desc: 'Početak namaza — izgovara se podizanjem ruku.',
    full: {
      ar: 'اللَّهُ أَكْبَرُ',
      tr: 'Allāhu akbar',
      bs: 'Allah je najveći.'
    },
    phrases: [
      { ar: 'اللَّهُ', tr: 'Allāhu', bs: 'Allah' },
      { ar: 'أَكْبَرُ', tr: 'akbar', bs: 'najveći' }
    ]
  },

  {
    id: 'subhaneke',
    title: 'Subhaneke',
    titleAr: 'سُبْحَانَكَ',
    desc: 'Otvaranje namaza, izgovara se nakon početnog tekbira.',
    full: {
      ar: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ.',
      tr: 'Subhāneke-llāhumme we bi-hamdike, we tebāreke-smuke, we te‘ālā džedduke, we lā ilāhe gajruke.',
      bs: 'Slavljen si Ti, Allahu moj, i hvaljen, blagoslovljeno je Tvoje ime, uzvišena je Tvoja veličina i nema boga osim Tebe.'
    },
    phrases: [
      { ar: 'سُبْحَانَكَ اللَّهُمَّ', tr: 'subhāneke-llāhumme', bs: 'Slavljen si Ti, Allahu moj' },
      { ar: 'وَبِحَمْدِكَ', tr: 'we bi-hamdike', bs: 'i Tebi hvala' },
      { ar: 'وَتَبَارَكَ اسْمُكَ', tr: 'we tebāreke-smuke', bs: 'i blagoslovljeno je Tvoje ime' },
      { ar: 'وَتَعَالَى جَدُّكَ', tr: 'we te‘ālā džedduke', bs: 'i uzvišena je Tvoja veličina' },
      { ar: 'وَلَا إِلَٰهَ غَيْرُكَ', tr: 'we lā ilāhe gajruke', bs: 'i nema boga osim Tebe' }
    ]
  },

  {
    id: 'euza-bismila',
    title: 'Euza i Bismila',
    titleAr: 'الْاسْتِعَاذَةُ وَالْبَسْمَلَةُ',
    desc: 'Utjecanje Allahu od šejtana i otpočinjanje s Allahovim imenom — prije učenja Fatihe.',
    full: {
      ar: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.',
      tr: 'E‘ūzu bi-llāhi mineš-šejtāni-r-radžīm. Bismillāhi-r-rahmāni-r-rahīm.',
      bs: 'Utječem se Allahu od prokletog šejtana. U ime Allaha, Svemilosnog, Milostivog.'
    },
    phrases: [
      { ar: 'أَعُوذُ بِاللَّهِ', tr: 'e‘ūzu bi-llāhi', bs: 'Utječem se Allahu' },
      { ar: 'مِنَ الشَّيْطَانِ', tr: 'mineš-šejtāni', bs: 'od šejtana' },
      { ar: 'الرَّجِيمِ', tr: 'er-radžīm', bs: 'prokletog' },
      { ar: 'بِسْمِ اللَّهِ', tr: 'bismi-llāhi', bs: 'U ime Allaha' },
      { ar: 'الرَّحْمَٰنِ', tr: 'er-rahmāni', bs: 'Svemilosnog' },
      { ar: 'الرَّحِيمِ', tr: 'er-rahīm', bs: 'Milostivog' }
    ]
  },

  {
    id: 'fatiha',
    title: 'El-Fatiha',
    titleAr: 'الْفَاتِحَة',
    desc: 'Prva sura Kur\'ana, uči se na stajanju (kijam) u svakom rekatu namaza.',
    full: {
      ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَٰنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ.',
      tr: 'Bismillāhi-r-rahmāni-r-rahīm. El-hamdu li-llāhi rabbi-l-‘ālemīn. Er-rahmāni-r-rahīm. Māliki jewmi-d-dīn. Ijjāke na‘budu we ijjāke neste‘īn. Ihdine-s-sirāta-l-mustekīm. Sirāta-llezīne en‘amte ‘alejhim, gajri-l-magdūbi ‘alejhim we le-d-dāllīn.',
      bs: 'U ime Allaha, Svemilosnog, Milostivog. Hvala Allahu, Gospodaru svjetova. Svemilosnom, Milostivom. Vladaru Dana sudnjeg. Samo Tebi ibadet činimo i samo od Tebe pomoć tražimo. Uputi nas na Pravi put. Na put onih kojima si milost Svoju darovao, a ne onih koji su Tvoju srdžbu zaslužili, niti onih koji su zalutali.'
    },
    phrases: [
      { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', tr: 'bismillāhi-r-rahmāni-r-rahīm', bs: 'U ime Allaha, Svemilosnog, Milostivog' },
      { ar: 'الْحَمْدُ لِلَّهِ', tr: 'el-hamdu li-llāhi', bs: 'Hvala Allahu' },
      { ar: 'رَبِّ الْعَالَمِينَ', tr: 'rabbi-l-‘ālemīn', bs: 'Gospodaru svjetova' },
      { ar: 'الرَّحْمَٰنِ الرَّحِيمِ', tr: 'er-rahmāni-r-rahīm', bs: 'Svemilosnom, Milostivom' },
      { ar: 'مَالِكِ يَوْمِ الدِّينِ', tr: 'māliki jewmi-d-dīn', bs: 'Vladaru Sudnjeg dana' },
      { ar: 'إِيَّاكَ نَعْبُدُ', tr: 'ijjāke na‘budu', bs: 'Samo Tebi robujemo' },
      { ar: 'وَإِيَّاكَ نَسْتَعِينُ', tr: 'we ijjāke neste‘īn', bs: 'i samo od Tebe pomoć tražimo' },
      { ar: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', tr: 'ihdine-s-sirāta-l-mustekīm', bs: 'Uputi nas na pravi put' },
      { ar: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ', tr: 'sirāta-llezīne en‘amte ‘alejhim', bs: 'Put onih kojima si milost darovao' },
      { ar: 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ', tr: 'gajri-l-magdūbi ‘alejhim', bs: 'a ne onih koji su srdžbu zaslužili' },
      { ar: 'وَلَا الضَّالِّينَ', tr: 'we le-d-dāllīn', bs: 'niti onih koji su zalutali' }
    ]
  },

  {
    id: 'ihlas',
    title: 'Sura El-Ihlas',
    titleAr: 'سُورَةُ الْإِخْلَاص',
    desc: 'Sura iskrenosti — uči se na stajanju nakon Fatihe.',
    full: {
      ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ. اللَّهُ الصَّمَدُ. لَمْ يَلِدْ وَلَمْ يُولَدْ. وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ.',
      tr: 'Kul huwe-llāhu ehad. Allāhu-s-samed. Lem jelid we lem jūled. We lem jekun lehu kufuwen ehad.',
      bs: 'Reci: "On je Allah — Jedan! Allah je Es-Samed (Onaj koji ni od koga ne zavisi)! Nije rodio i rođen nije, i niko Mu ravan nije!"'
    },
    phrases: [
      { ar: 'قُلْ', tr: 'kul', bs: 'Reci' },
      { ar: 'هُوَ اللَّهُ أَحَدٌ', tr: 'huwe-llāhu ehad', bs: 'On je Allah — Jedan' },
      { ar: 'اللَّهُ الصَّمَدُ', tr: 'Allāhu-s-samed', bs: 'Allah, Onaj o kome sve zavisi' },
      { ar: 'لَمْ يَلِدْ', tr: 'lem jelid', bs: 'Nije rodio' },
      { ar: 'وَلَمْ يُولَدْ', tr: 'we lem jūled', bs: 'i rođen nije' },
      { ar: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', tr: 'we lem jekun lehu kufuwen ehad', bs: 'i niko Mu ravan nije' }
    ]
  },

  {
    id: 'asr',
    title: 'Sura El-Asr',
    titleAr: 'سُورَةُ الْعَصْر',
    desc: 'Sura o vremenu — kratka, često se uči u namazu.',
    full: {
      ar: 'وَالْعَصْرِ. إِنَّ الْإِنسَانَ لَفِي خُسْرٍ. إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ.',
      tr: 'We-l-‘asr. Inne-l-insāne lefī husr. Ille-llezīne āmenū we ‘amilu-s-sālihāti we tewāsaw bi-l-hakki we tewāsaw bi-s-sabr.',
      bs: 'Tako mi vremena, doista je čovjek na gubitku — osim onih koji vjeruju i dobra djela čine i koji jedni drugima istinu preporučuju i koji jedni drugima preporučuju strpljenje.'
    },
    phrases: [
      { ar: 'وَالْعَصْرِ', tr: 'we-l-‘asr', bs: 'Tako mi vremena' },
      { ar: 'إِنَّ الْإِنسَانَ', tr: 'inne-l-insāne', bs: 'doista čovjek' },
      { ar: 'لَفِي خُسْرٍ', tr: 'lefī husr', bs: 'je na gubitku' },
      { ar: 'إِلَّا الَّذِينَ آمَنُوا', tr: 'ille-llezīne āmenū', bs: 'osim onih koji vjeruju' },
      { ar: 'وَعَمِلُوا الصَّالِحَاتِ', tr: 'we ‘amilu-s-sālihāti', bs: 'i čine dobra djela' },
      { ar: 'وَتَوَاصَوْا بِالْحَقِّ', tr: 'we tewāsaw bi-l-hakki', bs: 'i jedni drugima istinu preporučuju' },
      { ar: 'وَتَوَاصَوْا بِالصَّبْرِ', tr: 'we tewāsaw bi-s-sabr', bs: 'i jedni drugima preporučuju strpljenje' }
    ]
  },

  {
    id: 'felek',
    title: 'Sura El-Felek',
    titleAr: 'سُورَةُ الْفَلَق',
    desc: 'Sura zaštite — traženje utočišta od svakog zla stvorenog.',
    full: {
      ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ. مِن شَرِّ مَا خَلَقَ. وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ. وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ. وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.',
      tr: 'Kul e‘ūzu bi-rabbi-l-felek. Min šerri mā halek. We min šerri gāsikin izā wekab. We min šerri-n-neffāsāti fi-l-‘ukad. We min šerri hāsidin izā hased.',
      bs: 'Reci: "Utječem se Gospodaru svitanja, od zla onoga što je stvorio, i od zla mrkle noći kad razastre tmine, i od zla onih koje u čvorove pušu, i od zla zavidnika kad zavidi."'
    },
    phrases: [
      { ar: 'قُلْ أَعُوذُ', tr: 'kul e‘ūzu', bs: 'Reci: Utječem se' },
      { ar: 'بِرَبِّ الْفَلَقِ', tr: 'bi-rabbi-l-felek', bs: 'Gospodaru svitanja' },
      { ar: 'مِن شَرِّ مَا خَلَقَ', tr: 'min šerri mā halek', bs: 'od zla onoga što je stvorio' },
      { ar: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', tr: 'we min šerri gāsikin izā wekab', bs: 'i od zla mrkle noći kad razastre tmine' },
      { ar: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', tr: 'we min šerri-n-neffāsāti fi-l-‘ukad', bs: 'i od zla onih koje u čvorove pušu' },
      { ar: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', tr: 'we min šerri hāsidin izā hased', bs: 'i od zla zavidnika kad zavidi' }
    ]
  },

  {
    id: 'nas',
    title: 'Sura En-Nas',
    titleAr: 'سُورَةُ النَّاس',
    desc: 'Sura zaštite — utjecanje Gospodaru ljudi od došaptavanja.',
    full: {
      ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ. مَلِكِ النَّاسِ. إِلَٰهِ النَّاسِ. مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ. الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ. مِنَ الْجِنَّةِ وَالنَّاسِ.',
      tr: 'Kul e‘ūzu bi-rabbi-n-nās. Meliki-n-nās. Ilāhi-n-nās. Min šerri-l-weswāsi-l-hannās. Ellezī juweswisu fī sudūri-n-nās. Mine-l-džinneti we-n-nās.',
      bs: 'Reci: "Utječem se Gospodaru ljudi, Vladaru ljudi, Bogu ljudi — od zla šejtana napasnika koji se skriva, koji zle misli unosi u grudi ljudi, od džina i od ljudi."'
    },
    phrases: [
      { ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', tr: 'kul e‘ūzu bi-rabbi-n-nās', bs: 'Reci: Utječem se Gospodaru ljudi' },
      { ar: 'مَلِكِ النَّاسِ', tr: 'meliki-n-nās', bs: 'Vladaru ljudi' },
      { ar: 'إِلَٰهِ النَّاسِ', tr: 'ilāhi-n-nās', bs: 'Bogu ljudi' },
      { ar: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', tr: 'min šerri-l-weswāsi-l-hannās', bs: 'od zla napasnika koji se skriva' },
      { ar: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', tr: 'ellezī juweswisu fī sudūri-n-nās', bs: 'koji zle misli unosi u grudi ljudi' },
      { ar: 'مِنَ الْجِنَّةِ وَالنَّاسِ', tr: 'mine-l-džinneti we-n-nās', bs: 'od džina i od ljudi' }
    ]
  },

  {
    id: 'ruku',
    title: 'Ruku — Subhane Rabbijel-Azim',
    titleAr: 'تَسْبِيحُ الرُّكُوع',
    desc: 'Tesbih na rukuu — uči se najmanje tri puta na pregibu.',
    full: {
      ar: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ.',
      tr: 'Subhāne rabbije-l-‘azīm.',
      bs: 'Slavljen je moj Gospodar, Veličanstveni.'
    },
    phrases: [
      { ar: 'سُبْحَانَ', tr: 'subhāne', bs: 'Slavljen (neka je)' },
      { ar: 'رَبِّيَ', tr: 'rabbije', bs: 'moj Gospodar' },
      { ar: 'الْعَظِيمِ', tr: 'el-‘azīm', bs: 'Veličanstveni' }
    ]
  },

  {
    id: 'tesmi',
    title: 'Ustajanje s rukua',
    titleAr: 'الرَّفْعُ مِنَ الرُّكُوع',
    desc: 'Imam (ili pojedinac) izgovara "Semi‘allāhu...", a klanjač odgovara "Rabbenā lekel-hamd".',
    full: {
      ar: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ. رَبَّنَا وَلَكَ الْحَمْدُ.',
      tr: 'Semi‘a-llāhu li-men hamideh. Rabbenā we leke-l-hamd.',
      bs: 'Allah čuje onoga ko Ga hvali. Gospodaru naš, Tebi pripada svaka hvala.'
    },
    phrases: [
      { ar: 'سَمِعَ اللَّهُ', tr: 'semi‘a-llāhu', bs: 'Allah je čuo' },
      { ar: 'لِمَنْ حَمِدَهُ', tr: 'li-men hamideh', bs: 'onoga ko Ga hvali' },
      { ar: 'رَبَّنَا', tr: 'rabbenā', bs: 'Gospodaru naš' },
      { ar: 'وَلَكَ الْحَمْدُ', tr: 'we leke-l-hamd', bs: 'i Tebi pripada hvala' }
    ]
  },

  {
    id: 'sedzda',
    title: 'Sedžda — Subhane Rabbijel-A‘la',
    titleAr: 'تَسْبِيحُ السُّجُود',
    desc: 'Tesbih na sedždi — uči se najmanje tri puta. (Napomena: na sedždi se uči "el-A‘lā", a ne "el-Azim".)',
    full: {
      ar: 'سُبْحَانَ رَبِّيَ الْأَعْلَى.',
      tr: 'Subhāne rabbije-l-a‘lā.',
      bs: 'Slavljen je moj Gospodar, Najuzvišeniji.'
    },
    phrases: [
      { ar: 'سُبْحَانَ', tr: 'subhāne', bs: 'Slavljen (neka je)' },
      { ar: 'رَبِّيَ', tr: 'rabbije', bs: 'moj Gospodar' },
      { ar: 'الْأَعْلَى', tr: 'el-a‘lā', bs: 'Najuzvišeniji' }
    ]
  },

  {
    id: 'ettehijatu',
    title: 'Ettehijatu (Tešehhud)',
    titleAr: 'التَّحِيَّاتُ',
    desc: 'Uči se na sjedenju — na prvom i posljednjem (jalsi).',
    full: {
      ar: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ. السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ. السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ.',
      tr: 'Et-tehijjātu li-llāhi we-s-salewātu we-t-tajjibāt. Es-selāmu ‘alejke ejjuhe-n-nebijju we rahmetu-llāhi we berekātuh. Es-selāmu ‘alejnā we ‘alā ‘ibādi-llāhi-s-sālihīn. Ešhedu en lā ilāhe ille-llāh we ešhedu enne Muhammeden ‘abduhu we resūluh.',
      bs: 'Allahu pripadaju svi pozdravi, molitve i lijepa djela. Mir tebi, o Vjerovjesniče, i Allahova milost i blagoslov. Mir nama i svim dobrim Allahovim robovima. Svjedočim da nema boga osim Allaha i svjedočim da je Muhammed Njegov rob i Njegov poslanik.'
    },
    phrases: [
      { ar: 'التَّحِيَّاتُ لِلَّهِ', tr: 'et-tehijjātu li-llāhi', bs: 'Allahu pripadaju svi pozdravi' },
      { ar: 'وَالصَّلَوَاتُ', tr: 'we-s-salewātu', bs: 'i sve molitve' },
      { ar: 'وَالطَّيِّبَاتُ', tr: 'we-t-tajjibāt', bs: 'i lijepa djela / lijepe riječi' },
      { ar: 'السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ', tr: 'es-selāmu ‘alejke ejjuhe-n-nebijju', bs: 'Mir tebi, o Vjerovjesniče' },
      { ar: 'وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ', tr: 'we rahmetu-llāhi we berekātuh', bs: 'i Allahova milost i Njegov blagoslov' },
      { ar: 'السَّلَامُ عَلَيْنَا', tr: 'es-selāmu ‘alejnā', bs: 'Mir nama' },
      { ar: 'وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ', tr: 'we ‘alā ‘ibādi-llāhi-s-sālihīn', bs: 'i dobrim Allahovim robovima' },
      { ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ', tr: 'ešhedu en lā ilāhe ille-llāh', bs: 'Svjedočim da nema boga osim Allaha' },
      { ar: 'وَأَشْهَدُ أَنَّ مُحَمَّدًا', tr: 'we ešhedu enne Muhammeden', bs: 'i svjedočim da je Muhammed' },
      { ar: 'عَبْدُهُ وَرَسُولُهُ', tr: '‘abduhu we resūluh', bs: 'Njegov rob i Njegov poslanik' }
    ]
  },

  {
    id: 'salavati',
    title: 'Salavati (Allahumme salli / barik)',
    titleAr: 'الصَّلَاةُ الْإِبْرَاهِيمِيَّةُ',
    desc: 'Uče se nakon Ettehijatua, na posljednjem sjedenju.',
    full: {
      ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.',
      tr: 'Allāhumme salli ‘alā Muhammedin we ‘alā āli Muhammed, kemā sallejte ‘alā Ibrāhīme we ‘alā āli Ibrāhīm, inneke hamīdun medžīd. Allāhumme bārik ‘alā Muhammedin we ‘alā āli Muhammed, kemā bārekte ‘alā Ibrāhīme we ‘alā āli Ibrāhīm, inneke hamīdun medžīd.',
      bs: 'Allahu moj, blagoslovi Muhammeda i porodicu Muhammedovu, kao što si blagoslovio Ibrahima i porodicu Ibrahimovu — Ti si, doista, Hvaljeni, Slavljeni. Allahu moj, podari bereket Muhammedu i porodici Muhammedovoj, kao što si podario Ibrahimu i porodici Ibrahimovoj — Ti si, doista, Hvaljeni, Slavljeni.'
    },
    phrases: [
      { ar: 'اللَّهُمَّ', tr: 'Allāhumme', bs: 'Allahu moj' },
      { ar: 'صَلِّ عَلَى مُحَمَّدٍ', tr: 'salli ‘alā Muhammedin', bs: 'blagoslovi Muhammeda' },
      { ar: 'وَعَلَى آلِ مُحَمَّدٍ', tr: 'we ‘alā āli Muhammed', bs: 'i porodicu Muhammedovu' },
      { ar: 'كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ', tr: 'kemā sallejte ‘alā Ibrāhīme', bs: 'kao što si blagoslovio Ibrahima' },
      { ar: 'وَعَلَى آلِ إِبْرَاهِيمَ', tr: 'we ‘alā āli Ibrāhīm', bs: 'i porodicu Ibrahimovu' },
      { ar: 'إِنَّكَ حَمِيدٌ مَجِيدٌ', tr: 'inneke hamīdun medžīd', bs: 'Ti si, doista, Hvaljeni i Slavljeni' },
      { ar: 'اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ', tr: 'Allāhumme bārik ‘alā Muhammedin', bs: 'Allahu moj, podari bereket Muhammedu' },
      { ar: 'كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ', tr: 'kemā bārekte ‘alā Ibrāhīme', bs: 'kao što si podario bereket Ibrahimu' }
    ]
  },

  {
    id: 'dova-rabbena',
    title: 'Dova — Rabbenā ātinā',
    titleAr: 'دُعَاءُ "رَبَّنَا آتِنَا"',
    desc: 'Dova nakon salavata, prije selama — uobičajena dova na završetku namaza.',
    full: {
      ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.',
      tr: 'Rabbenā ātinā fi-d-dunjā haseneten we fi-l-āhireti haseneten we kinā ‘azāben-nār.',
      bs: 'Gospodaru naš, podari nam dobro na ovom svijetu i dobro na onom svijetu i sačuvaj nas od kazne vatre.'
    },
    phrases: [
      { ar: 'رَبَّنَا', tr: 'rabbenā', bs: 'Gospodaru naš' },
      { ar: 'آتِنَا', tr: 'ātinā', bs: 'podari nam' },
      { ar: 'فِي الدُّنْيَا حَسَنَةً', tr: 'fi-d-dunjā haseneten', bs: 'na ovom svijetu dobro' },
      { ar: 'وَفِي الْآخِرَةِ حَسَنَةً', tr: 'we fi-l-āhireti haseneten', bs: 'i na onom svijetu dobro' },
      { ar: 'وَقِنَا', tr: 'we kinā', bs: 'i sačuvaj nas' },
      { ar: 'عَذَابَ النَّارِ', tr: '‘azāben-nār', bs: 'kazne vatre' }
    ]
  },

  {
    id: 'selam',
    title: 'Selam (predaja selama)',
    titleAr: 'التَّسْلِيمُ',
    desc: 'Završetak namaza — okreće se desno pa lijevo izgovarajući selam.',
    full: {
      ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ.',
      tr: 'Es-selāmu ‘alejkum we rahmetu-llāh.',
      bs: 'Neka je mir s vama i Allahova milost.'
    },
    phrases: [
      { ar: 'السَّلَامُ', tr: 'es-selāmu', bs: 'Mir' },
      { ar: 'عَلَيْكُمْ', tr: '‘alejkum', bs: 's vama' },
      { ar: 'وَرَحْمَةُ اللَّهِ', tr: 'we rahmetu-llāh', bs: 'i Allahova milost' }
    ]
  },

  {
    id: 'estagfirullah',
    title: 'Istigfar (3 puta)',
    titleAr: 'الِاسْتِغْفَارُ',
    desc: 'Uči se tri puta nakon predaje selama.',
    full: {
      ar: 'أَسْتَغْفِرُ اللَّهَ.',
      tr: 'Estagfiru-llāh.',
      bs: 'Tražim oprost od Allaha.'
    },
    phrases: [
      { ar: 'أَسْتَغْفِرُ', tr: 'estagfiru', bs: 'Tražim oprost' },
      { ar: 'اللَّهَ', tr: '(min)a-llāh', bs: 'od Allaha' }
    ]
  },

  {
    id: 'allahumme-entesselam',
    title: 'Allāhumme Ente-s-Selām',
    titleAr: 'اللَّهُمَّ أَنْتَ السَّلَامُ',
    desc: 'Zikr nakon istigfara — uči se odmah nakon namaza.',
    full: {
      ar: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.',
      tr: 'Allāhumme Ente-s-Selāmu we minke-s-selām, tebārekte jā ze-l-dželāli we-l-ikrām.',
      bs: 'Allahu moj, Ti si Mir i od Tebe je mir — Blagoslovljen si, o Vlasniče veličanstva i plemenitosti.'
    },
    phrases: [
      { ar: 'اللَّهُمَّ', tr: 'Allāhumme', bs: 'Allahu moj' },
      { ar: 'أَنْتَ السَّلَامُ', tr: 'Ente-s-Selāmu', bs: 'Ti si Selam (Mir)' },
      { ar: 'وَمِنْكَ السَّلَامُ', tr: 'we minke-s-selām', bs: 'i od Tebe je mir' },
      { ar: 'تَبَارَكْتَ', tr: 'tebārekte', bs: 'Blagoslovljen si' },
      { ar: 'يَا ذَا الْجَلَالِ', tr: 'jā ze-l-dželāli', bs: 'o Vlasniče veličanstva' },
      { ar: 'وَالْإِكْرَامِ', tr: 'we-l-ikrām', bs: 'i plemenitosti' }
    ]
  }
];

// Export for both browser (global) and Node.js (CommonJS) contexts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NAMAZ_SECTIONS;
}
