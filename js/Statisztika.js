class Statisztika {

    constructor(lista) {
        this.lista = lista;
    }
    nemszerintSzama(nem) {
        let db = 0;
        this.lista.forEach((element) => {
            if (element.nem === nem) {
                db++;
            }
        });
        return db;
    }
    atlagEletkor() {
        if (this.lista.length == 0) {
            return -1;
        }

        let atlag = 0;
        let db = 0;

        this.lista.forEach((element) => {
            if (isNaN(element.kor) || element.kor === null || element.kor == "" || element.kor < 0) {
            } else {
                db++;
                atlag += Number(element.kor);
            }
        });
        return db > 0 ? atlag / db : -1;
    }
    nemszerintAtlagEletkora(nem) {
        if (this.lista.length == 0) {
            return -1;
        }

        let atlag = 0;
        let db = 0;
        this.lista.forEach((element) => {
            if (isNaN(element.kor) || element.kor === null || element.kor == "" || element.kor < 0) {
            } else {
                if (element.nem === nem) {
                    atlag += Number(element.kor);
                    db++;
                }
            }
        });
        return atlag / db;
    }
}

export default Statisztika;