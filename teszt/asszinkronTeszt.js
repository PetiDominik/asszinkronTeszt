import Aszinkron from "../js/asszinkron.js";

QUnit.test("adatBe metódus tesztje", (assert) => {
    const DONE = assert.async();
    const ASSZINKRON = new Aszinkron();
    const VEGPONT = "../adatok.json";
    const CALLBACK_FUGGVENY = function (data) {
        assert.deepEqual(data, {
            szemelyek : [
                {
                    kor : 56,
                    nem : "ffi",
                    nev : "Béla",
                },
                {
                    kor : 16,
                    nem : "ffi",
                    nev : "Jenő",
                },
                {
                    kor : 33,
                    nem : "nő",
                    nev : "Rózsa",
                },
            ],
        });
        DONE();
    };

    ASSZINKRON.adatBe(VEGPONT, CALLBACK_FUGGVENY);

});