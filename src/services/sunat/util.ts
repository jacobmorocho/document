import { createCanvas, loadImage } from 'canvas';

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto/Roboto-Regular.ttf',
        bold: 'fonts/Roboto/Roboto-Medium.ttf',
        italics: 'fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
    }
};
const Country = (money) => {
    let moneys = [{ name: "USD", value: "en-US" }, { name: "PEN", value: "es-PE" }];
    return moneys.filter((o) => { return o.name == money })[0].value
}
const TypeDocuments = (code) => {
    let dates = [
        { code: "01", value: "FACTURA ELECTRÓNICA" },
        { code: "03", value: "BOLETA DE VENTA ELECTRÓNICA" },
        { code: "07", value: "NOTA DE CREDITO ELECTRÓNICA" },
        { code: "08", value: "NOTA DE DEBITO ELECTRÓNICA" },
    ];
    return dates.filter((o) => { return o.code == code })[0].value
}
const Currency = (money, value) => {
    const formatter = new Intl.NumberFormat(Country(money), {
        style: 'currency',
        currency: money,
        minimumFractionDigits: 2
    })
    return formatter.format(value)
}
const getBase64ImageFromURL = (url) => {
    return loadImage(url).then(image => {
        const canvas = createCanvas(image.width, image.height);
        let ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return canvas.toDataURL();
    });
}
const MoneyTitle = (money) => {
    switch (money) {
        case "PEN":
            return {
                letrasCentavos: 'CENTAVOS',
                letrasMonedaPlural: 'SOLES',
                letrasMonedaSingular: 'SOLES',
                letrasMonedaCentavoPlural: 'CENTAVOS',
                letrasMonedaCentavoSingular: 'CENTAVO'
            }
        case "USD":
            return {
                letrasCentavos: 'CENTAVOS',
                letrasMonedaPlural: 'DÓLARES',
                letrasMonedaSingular: 'DÓLAR',
                letrasMonedaCentavoPlural: 'CENTS',
                letrasMonedaCentavoSingular: 'CENT'
            }
    }
}

const numeroALetras = () => {


    const Unidades = (num) => {

        switch (num) {
            case 1: return 'UN';
            case 2: return 'DOS';
            case 3: return 'TRES';
            case 4: return 'CUATRO';
            case 5: return 'CINCO';
            case 6: return 'SEIS';
            case 7: return 'SIETE';
            case 8: return 'OCHO';
            case 9: return 'NUEVE';
        }

        return '';
    }

    const Decenas = (num) => {

        let decena = Math.floor(num / 10);
        let unidad = num - (decena * 10);

        switch (decena) {
            case 1:
                switch (unidad) {
                    case 0: return 'DIEZ';
                    case 1: return 'ONCE';
                    case 2: return 'DOCE';
                    case 3: return 'TRECE';
                    case 4: return 'CATORCE';
                    case 5: return 'QUINCE';
                    default: return 'DIECI' + Unidades(unidad);
                }
            case 2:
                switch (unidad) {
                    case 0: return 'VEINTE';
                    default: return 'VEINTI' + Unidades(unidad);
                }
            case 3: return DecenasY('TREINTA', unidad);
            case 4: return DecenasY('CUARENTA', unidad);
            case 5: return DecenasY('CINCUENTA', unidad);
            case 6: return DecenasY('SESENTA', unidad);
            case 7: return DecenasY('SETENTA', unidad);
            case 8: return DecenasY('OCHENTA', unidad);
            case 9: return DecenasY('NOVENTA', unidad);
            case 0: return Unidades(unidad);
        }
    }

    const DecenasY = (strSin, numUnidades) => {
        if (numUnidades > 0)
            return strSin + ' Y ' + Unidades(numUnidades)

        return strSin;
    }

    const Centenas = (num) => {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch (centenas) {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + Decenas(decenas);
                return 'CIEN';
            case 2: return 'DOSCIENTOS ' + Decenas(decenas);
            case 3: return 'TRESCIENTOS ' + Decenas(decenas);
            case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
            case 5: return 'QUINIENTOS ' + Decenas(decenas);
            case 6: return 'SEISCIENTOS ' + Decenas(decenas);
            case 7: return 'SETECIENTOS ' + Decenas(decenas);
            case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
            case 9: return 'NOVECIENTOS ' + Decenas(decenas);
        }

        return Decenas(decenas);
    }

    const Seccion = (num, divisor, strSingular, strPlural) => {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let letras = '';

        if (cientos > 0)
            if (cientos > 1)
                letras = Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += '';

        return letras;
    }

    const Miles = (num) => {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
        let strCentenas = Centenas(resto);

        if (strMiles == '')
            return strCentenas;

        return strMiles + ' ' + strCentenas;
    }

    const Millones = (num) => {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
        let strMiles = Miles(resto);

        if (strMillones == '')
            return strMiles;

        return strMillones + ' ' + strMiles;
    }

    const NumeroALetras = (num: any, currency) => {
        currency = MoneyTitle(currency);
        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: 'CENTAVOS',
            letrasMonedaPlural: currency.plural || 'SOLES',
            letrasMonedaSingular: currency.singular || 'SOLES',
            letrasMonedaCentavoPlural: currency.centPlural || 'CENTAVOS',
            letrasMonedaCentavoSingular: currency.centSingular || 'CENTAVO'
        };

        if (data.centavos > 0) {
            data.letrasCentavos = 'CON ' + (function () {
                if (data.centavos == 1)
                    return Millones(data.centavos) + ' 0/100 ' + data.letrasMonedaCentavoSingular;
                else
                    return Millones(data.centavos) + '  0/100 ' + data.letrasMonedaCentavoPlural;
            })();
        };

        if (data.enteros == 0)
            return 'CERO ' + data.letrasMonedaPlural + '  0/100 ' + data.letrasCentavos;
        if (data.enteros == 1)
            return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + '  0/100 ' + data.letrasCentavos;
        else
            return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + '  0/100 ' + data.letrasCentavos;
    };
    return {
        NumeroALetras
    }

}
export { fonts, TypeDocuments, Currency, getBase64ImageFromURL, numeroALetras }