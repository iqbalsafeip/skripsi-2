const kamus = [
  {
    peribahasa: "Abong biwir teu diwengku",
    arti: "Ngomong seenaknya saja tanpa dipikir, yang akhirnya sering membuat orang kecewea",
  },
  {
    peribahasa: "Adam lali tapel",
    arti: "Lupa dengan saudara dan kampung halaman",
  },
  {
    peribahasa: "adat kakurung ku iga",
    arti: "tabiat yang susah dirubah",
  },
  {
    peribahasa: "Adean ku kuda beureum",
    arti: "bergaya, berdandan dengan menggunakan barang milik orang lain",
  },
  {
    peribahasa: "Adep hidep",
    arti: "berbakti, patuh pada suami",
  },
  {
    peribahasa: "adigung adiguna",
    arti: "besar kepala, merasa lebih hebat dari orang lain dilihat dari tingkah laku dan omongannya",
  },
  {
    peribahasa: "Adu; ngadu angklung dipasar",
    arti: "membicarakan masalah yang tidak ada manfaatnya dihadapan orang banyak",
  },
  {
    peribahasa: "adu telur ampar tiga",
    arti: "menyelesaikan masalah dengan musyawarah",
  },
  {
    peribahasa: "bengkok tikoro",
    arti: "tidak mendapat makanan enak, karena tidak datang atau kehabisan",
  },
  {
    peribahasa: "bengkung ngariung bongkok ngaronyok",
    arti: "biar miskin asal kumpul",
  },
  {
    peribahasa: "beres roes",
    arti: "akur, harmonis (suami istri)",
  },
  {
    peribahasa: "bengeut nyangharep ati mungkir",
    arti: "tidak sesuai dengan hati",
  },
  {
    peribahasa: "beunghar memeh boga",
    arti: "loba kahayang nu teu saimbang",
  },
  {
    peribahasa: "beurat birit",
    arti: "susah diperintah, malas",
  },
  {
    peribahasa: "beurat nyuhun beurat nanggung",
    arti: "sangat menerima dengan penuh syukur",
  },
  {
    peribahasa: "beuteung anjingen",
    arti: "perut yang besar keatas",
  },
  {
    peribahasa: "beuteung mutiktrik berekat meunang",
    arti: "makan kenyang dipesta, pulang membawa oleh-oleh",
  },
  {
    peribahasa: "beuteung si eta mah ruas bungbas",
    arti: "tidak ada kenyangnya, banyak makan",
  },
  {
    peribahasa: "bihari ngalingling pasir, ayena ngalanglang pasar",
    arti: "jaman sudah berubah, manusia juga sudah banyak berganti pekerjaan dan tingkah lakunya",
  },
  {
    peribahasa: "bilatung ninggang dage",
    arti: "orang yang tidak jujur mendapat kedudukan atau kesempatan yang menguntungkan bagi dirinya",
  },
  {
    peribahasa: "bobot pangayon, timbang taraju",
    arti: "pengadilan",
  },
  {
    peribahasa: "boga pikir rangkepan",
    arti: "tidak mudah ditipu atau diperdaya",
  },
  {
    peribahasa: "boga sawah saicak",
    arti: "hanya punya sawah sekotak",
  },
  {
    peribahasa: "bogoh nogencang",
    arti: "bertepuk sebelah tangan, cinta ditolak",
  },
  {
    peribahasa: "caang bulan opat welas, jalan gede sasapuan",
    arti: "tidak ada halangan",
  },
  {
    peribahasa: "cacag nangkeuan",
    arti: "pekerjaan yang sering tertunda [pekerjaan atau cerita]",
  },
  {
    peribahasa: "cacah rucah atah warah",
    arti: "hina yang dianggap tidak bernilai serta bodoh",
  },
  {
    peribahasa: "cadu ngalantung kalisung",
    arti: "tidak mau bekerja cari upah",
  },
  {
    peribahasa: "cai asak tuak bari, kejo asa catang bobo",
    arti: "semua terasa tidak enak, karena sedang susah",
  },
  {
    peribahasa: "ceuli lentaheun",
    arti: "suka mendengarkan kejelekan orang lain",
  },
  {
    peribahasa: "cikaracak ninggang batu , laun laun jadi legok",
    arti: "karena tekun, akhirnya berhasil",
  },
  {
    peribahasa: "cilik putih clak herang",
    arti: "iklas, keluar dari hati yang bersih",
  },
  {
    peribahasa: "congo-congo ku amis, mun rek amis ge puhuna",
    arti: "anaknya tidak baik, karena tidak ada contoh dari orangtuanya",
  },
  {
    peribahasa: "cucuk rungkang",
    arti: "perkara kecil bisa menjadi perkara besar, jika dibiarkan",
  },
  {
    peribahasa: "cueut ka harep",
    arti: "mendekati ajal, karena sudah tua",
  },
  {
    peribahasa: "daharna sakeser daun",
    arti: "doyang atau sering makan",
  },
  {
    peribahasa: "dedenge tara",
    arti: "mendengar sebagian, atau mendenga sesuatu yang kurang",
  },
  {
    peribahasa: "dengdek tapi maliding sanak",
    arti: "pilih kasih, tidak adil",
  },
  {
    peribahasa: "deukeut deukeut anak taleus",
    arti: "berdekatan tidak tahu kalau bersaudara",
  },
  {
    peribahasa: "deungeun deungeun haseum",
    arti: " sebatang kara",
  },
  {
    peribahasa: "dibilang peuteuy",
    arti: "dihitung satu-satu",
  },
  {
    peribahasa: "dudagian ku seeng nyengsreng",
    arti: "diperlukan sekarang",
  },
  {
    peribahasa: "didago dago tilewu",
    arti: "sudah ditunggu, tetapi tidak datang",
  },
  {
    peribahasa: "dingding kelir",
    arti: "ditutup-tutupi, dirahasiakan",
  },
  {
    peribahasa: "endog sapataragan tara megar kabeh",
    arti: "diantara kaka beradik, ada rejekinya yang tidak bagus",
  },
  {
    peribahasa: "eleh deet",
    arti: "mengalah",
  },
  {
    peribahasa: "elmu ajug",
    arti: "bisa menasehati orang, tapi dirinya tidak bisa mengamalkan",
  },
  {
    peribahasa: "era parada",
    arti: "malu karena kelakuan atau omongan orang",
  },
  {
    peribahasa: "embung kalangkangan",
    arti: "tidak mau kalah dari orang lain",
  },
  {
    peribahasa: "garo singsat",
    arti: "menggaruk tetepi tidak gatal",
  },
  {
    peribahasa: "gentel keak",
    arti: "anak yang tidak mau lepas dari gendongan ibunya",
  },
  {
    peribahasa: "gede hulu",
    arti: "sombong",
  },
  {
    peribahasa: "geledug ces",
    arti: "ukur rame mimitina wungkul, kadituna mah jadi tiiseun",
  },
];

module.exports = kamus;
