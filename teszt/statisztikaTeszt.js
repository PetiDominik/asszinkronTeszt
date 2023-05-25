import Statisztika from "../js/Statisztika.js";

QUnit.module('Tagfüggvények léteznek-e', function() {
    const STATISZTIKA = new Statisztika();

    QUnit.test('léteznek-e a tagfüggvények?', function(assert) {
      assert.ok(STATISZTIKA.nemszerintSzama, "Létezik-e a nemszerintSzama()?");
      assert.ok(STATISZTIKA.atlagEletkor, "Létezik-e a atlagEletkor()?");
      assert.ok(STATISZTIKA.nemszerintAtlagEletkora, "Létezik-e a nemszerintAtlagEletkora()?");
    });

    QUnit.test('függvény-e', function(assert) {
        assert.ok(typeof(STATISZTIKA.nemszerintSzama) === "function", "Függvény-e a nemszerintSzama ?");
        assert.ok(typeof(STATISZTIKA.atlagEletkor) === "function", "Függvény-e az atlagEletkor ?");
        assert.ok(typeof(STATISZTIKA.nemszerintAtlagEletkora) === "function", "Függvény-e a nemszerintAtlagEletkora ?");
    });
});

QUnit.module('Tagfüggvények ellenőrzése', function(hooks) {
    let stat;

    hooks.before(() => {
        stat = new Statisztika([]);
    });

    QUnit.test('nemszerintSzama()', function(assert) {
        const TESZTESETEK = [
            {
                adatok : [],
                vart : {
                    "ffi" : 0,
                    "nő" : 0,
                    "egyéb" : 0
                },
                kiiras : "Üres lista"
            },
            {
                adatok : [
                    {
                        nev : "Béla",
                        kor : 55,
                        nem : "ffi",
                    },
                ],
                vart : {
                    "ffi" : 1,
                    "nő" : 0,
                    "egyéb" : 0
                },
                kiiras : "1 elemű és az a keresett nem"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "nő",
                    },
                ], 
                vart : {
                    "ffi" : 0,
                    "nő" : 1,
                    "egyéb" : 0
                },
                kiiras : "1 elemű és nem a keresett nem"
            },
            {
                adatok : [
                    {
                        nev : "Bab",
                        kor : 55,
                        nem : "egyéb",
                    },
                ], 
                vart : {
                    "ffi" : 0,
                    "nő" : 0,
                    "egyéb" : 1
                },
                kiiras : "1 elemű és nem a keresett nem"
            },
            {
                adatok : [
                    {
                        nev : "Béla",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Dezső",
                        kor : 23,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "egyéb",
                    },
                ], 
                vart : {
                    "ffi" : 2,
                    "nő" : 1,
                    "egyéb" : 1
                },
                kiiras : "Több elemű és szerepel benne a keresett nem"
            },
            {
                adatok : [
                    {
                        nev : "Béla",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Dezső",
                        kor : 19,
                        nem : null,
                    },
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "nő",
                    },
                ], 
                vart : {
                    "ffi" : 1,
                    "nő" : 1,
                    "egyéb" : 0
                },
                kiiras : "Több elemű és szerepel benne a keresett nem van benne null érték is"
            },
            {
                adatok : [
                    {
                        nev : "Béla",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Dezső",
                        kor : 19,
                        nem : "",
                    },
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi",
                        kor : 45,
                        nem : "egyéb",
                    },
                ], 
                vart : {
                    "ffi" : 1,
                    "nő" : 1,
                    "egyéb" : 1
                },
                kiiras : "Több elemű és szerepel benne a keresett nem van benne \"\" érték is"
            },
            {
                adatok : [
                    {
                        nev : "Béla",
                        kor : 55,
                    },
                    {
                        nev : "Dezső",
                        kor : 19,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "nő",
                    },
                ], 
                vart : {
                    "ffi" : 1,
                    "nő" : 1,
                    "egyéb" : 0
                },
                kiiras : "Van benne férfi viszont az egyik objektumnak nincs \"nem\" kulcs"
            },
            {
                adatok : [
                    {
                        nev : "Béla",
                        kor : 55,
                        nem : "egyéb"
                    },
                    {
                        nev : "Dezső",
                        kor : 19,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "nő",
                    },
                ], 
                vart : {
                    "ffi" : 1,
                    "nő" : 1,
                    "egyéb" : 1
                },
                kiiras : "Van benne férfi viszont az egyik objektumnak nincs \"nem\" kulcs"
            },
            
        ];
        const NEMEK = ["ffi", "nő", "egyéb"];

        NEMEK.forEach(nem => {
            TESZTESETEK.forEach(teszteset => {
                stat.lista = teszteset.adatok;
                assert.equal(stat.nemszerintSzama(nem), teszteset.vart[nem], `${teszteset.kiiras} => ${nem}`);
            });
        });
    });

    QUnit.test('atlagEletkor()', function(assert) {
        const TESZTESETEK = [
            {
                adatok : [],
                vart : -1,
                kiiras : "Üres lista"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 50,
                        nem : "férfi",
                    },
                ],
                vart : 50,
                kiiras : "Egy elemű a lista"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 50,
                        nem : "férfi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 40,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                ],
                vart : 50,
                kiiras : "Több elemű a lista"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : null,
                        nem : "férfi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 40,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                ],
                vart : 50,
                kiiras : "A kor valahol null"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : null,
                        nem : "férfi",
                    },
                    {
                        nev : "Gizi2",
                        kor : null,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : null,
                        nem : "egyéb",
                    },
                ],
                vart : -1,
                kiiras : "A kor mindenhol null"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : "50",
                        nem : "férfi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 40,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                ],
                vart : 50,
                kiiras : "A kor valahol stringként van megadva"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 50,
                        nem : "férfi",
                    },
                    {
                        nev : "Gizi2",
                        kor : -5,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 40,
                        nem : "egyéb",
                    },
                ],
                vart : 45,
                kiiras : "A kor valahol minusz szám"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        nem : "férfi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 40,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                ],
                vart : 50,
                kiiras : "A \"kor\" kulcs valahol nem szerepel"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : "ötven",
                        nem : "férfi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 40,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                ],
                vart : 50,
                kiiras : "A kor helyett string meg van megadva"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : "",
                        nem : "férfi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 40,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                ],
                vart : 50,
                kiiras : "A kor üres stringként van megadva"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 0,
                        nem : "férfi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 0,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 0,
                        nem : "egyéb",
                    },
                ],
                vart : -1,
                kiiras : "A kor mindenhol 0-a"
            },
            
            
        ];

        TESZTESETEK.forEach(teszteset => {
            stat.lista = teszteset.adatok;
            assert.equal(stat.atlagEletkor(), teszteset.vart, teszteset.kiiras);
        });
    });

    QUnit.test('nemszerintAtlagEletkora()', function(assert) {
        const TESZTESETEK = [
            {
                adatok : [],
                vart : {
                    "ffi" : -1,
                    "nő" : -1,
                    "egyéb" : -1
                },
                kiiras : "Üres lista"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 45,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                ],
                vart : {
                    "ffi" : 55,
                    "nő" : 45,
                    "egyéb" : 60
                },
                kiiras : "Szerepel a listában egyszer"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        kor : null,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 45,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi2",
                        kor : null,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                    {
                        nev : "Gizi3",
                        kor : null,
                        nem : "egyéb",
                    },
                ],
                vart : {
                    "ffi" : 55,
                    "nő" : 45,
                    "egyéb" : 60
                },
                kiiras : "Valahol a kor null"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        kor : "45",
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 45,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi2",
                        kor : "55",
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                    {
                        nev : "Gizi3",
                        kor : "40",
                        nem : "egyéb",
                    },
                ],
                vart : {
                    "ffi" : 50,
                    "nő" : 50,
                    "egyéb" : 50
                },
                kiiras : "Valahol stringként van megadva"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        kor : -5,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 45,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi2",
                        kor : -5,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                    {
                        nev : "Gizi3",
                        kor : -5,
                        nem : "egyéb",
                    },
                ],
                vart : {
                    "ffi" : 55,
                    "nő" : 45,
                    "egyéb" : 60
                },
                kiiras : "Valahol mínusz szám"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        kor : "asd",
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 45,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi2",
                        kor : "kettő",
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                    {
                        nev : "Gizi3",
                        kor : "ötvenöt",
                        nem : "egyéb",
                    },
                ],
                vart : {
                    "ffi" : 55,
                    "nő" : 45,
                    "egyéb" : 60
                },
                kiiras : "Valahol string a szám"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi2",
                        kor : 45,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi2",
                        nem : "nő",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                    {
                        nev : "Gizi3",
                        nem : "egyéb",
                    },
                ],
                vart : {
                    "ffi" : 55,
                    "nő" : 45,
                    "egyéb" : 60
                },
                kiiras : "A \"kor\" kulcs valahol nem szerepel"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        nem : "ffi",
                        kor : 0,
                    },
                    {
                        nev : "Gizi2",
                        kor : 45,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi2",
                        nem : "nő",
                        kor : 0,
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                    {
                        nev : "Gizi3",
                        nem : "egyéb",
                        kor : 0,
                    },
                ],
                vart : {
                    "ffi" : 55,
                    "nő" : 45,
                    "egyéb" : 60
                },
                kiiras : "A kor valahol 0-a"
            },
            {
                adatok : [
                    {
                        nev : "Gizi",
                        kor : 55,
                        nem : "ffi",
                    },
                    {
                        nev : "Gizi",
                        nem : "ffi",
                        kor : "",
                    },
                    {
                        nev : "Gizi2",
                        kor : 45,
                        nem : "nő",
                    },
                    {
                        nev : "Gizi2",
                        nem : "nő",
                        kor : "",
                    },
                    {
                        nev : "Gizi3",
                        kor : 60,
                        nem : "egyéb",
                    },
                    {
                        nev : "Gizi3",
                        nem : "egyéb",
                        kor : "",
                    },
                ],
                vart : {
                    "ffi" : 55,
                    "nő" : 45,
                    "egyéb" : 60
                },
                kiiras : "A kor üres stringként van megadva"
            },
            
        ];
        const NEMEK = ["ffi", "nő", "egyéb"];

        NEMEK.forEach(nem => {
            TESZTESETEK.forEach(teszteset => {
                stat.lista = teszteset.adatok;
                assert.equal(stat.nemszerintAtlagEletkora(nem), teszteset.vart[nem], teszteset.kiiras + " => " + nem);
            });
        });
    });

});