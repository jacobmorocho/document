
import fs from 'fs'
import pdfmake from 'pdfmake'
import { SearchDocument } from '../../services/mongo/search';
import moment from 'moment';
import { fonts, TypeDocuments, Currency, getBase64ImageFromURL, numeroALetras } from '../../services/sunat/util';
const createdocument = async (id, path, callback) => {

    let doc = await SearchDocument().ById(id);
    let content: any[] = [];

    /*content.push({
        columns: [
            { width: 100, image: await getBase64ImageFromURL("https://storage.googleapis.com/sspe-blnc-rscs/000005B6/PNG/IMG_LOGO_SAMISHOPEXPRESS_BLANCO.png") },
            { width: 300, text: "", style: 'paragraph' },
            {
                table: {
                    body: [
                        [{ text: doc.company.ruc, style: 'header', alignment: 'center' }],
                        [{ text: TypeDocuments(doc.tipoDoc), style: 'header', alignment: 'center' }],
                        [{ text: moment(doc.fechaEmision).format('DD-MM-YYYY'), alignment: 'center' }]
                    ]
                }
            }
        ]
    })
*/
    content.push({ text: doc.company.razonSocial, style: 'header' })
    content.push({ text: doc.company.address.direccion, style: 'paragraph' });
    content.push({ text: `${doc.company.address.departamento}-${doc.company.address.provincia}-${doc.company.address.distrito}`, style: 'paragraph' });
    content.push({ text: "\n" })
    content.push({ text: "Datos del Documento:", style: 'header' })


    content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 1 }] })
    content.push({ text: "\n" })
    content.push({ columns: [{ width: 100, text: 'Razón social :', style: 'paragraph' }, { width: 520, text: doc.client.rznSocial, style: 'paragraph' }] },)
    content.push({ columns: [{ width: 100, text: 'Dirección :', style: 'paragraph' }, { width: 520, text: doc.client.address.direccion, style: 'paragraph' }] },)
    content.push({ columns: [{ width: 100, text: 'Ubicación :', style: 'paragraph' }, { width: 520, text: doc.client.address.departamento, style: 'paragraph' }] },)

    content.push({ columns: [{ width: 100, text: 'RUC/DNI :', style: 'paragraph' }, { width: 520, text: doc.client.numDoc, style: 'paragraph' }] },)
    content.push({ columns: [{ width: 100, text: 'Fecha de Emisión :', style: 'paragraph' }, { width: 520, text: moment(doc.fechaEmision).format('DD-MM-YYYY'), style: 'paragraph' }] })
    content.push({ columns: [{ width: 100, text: 'Información de pago:', style: 'paragraph' }, { width: 520, text: doc.formaPago.tipo, style: 'paragraph' }] })
    content.push({ columns: [{ width: 100, text: 'Fecha de pago:', style: 'paragraph' }, { width: 520, text: moment(doc.fechaEmision).format('DD-MM-YYYY'), style: 'paragraph' }] })
    content.push({ columns: [{ width: 100, text: 'Monto neto pagado :', style: 'paragraph' }, { width: 520, text: Currency(doc.tipoMoneda, doc.valorVenta), style: 'paragraph' }] })
    content.push({ text: "\n" })
    content.push({ columns: [{ width: 80, text: 'Código', style: 'ItemHeader' }, { width: 350, text: 'Descripción', style: 'ItemHeader' }, { width: 50, text: 'V. Venta', style: 'ItemHeader', alignment: 'right' }] })

    doc.details.map(({ codProducto, unidad, descripcion, cantidad, mtoValorVenta, mtoValorUnitario, mtoDescuento = 0 }) => {
        content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 1 }] })
        content.push({ columns: [{ width: 80, text: codProducto, style: 'ItemTex' }, { width: 350, text: descripcion, style: 'ItemTex' }, { width: 50, text: Currency(doc.tipoMoneda, mtoValorVenta), style: 'ItemTex', alignment: 'right' }] })
        content.push({ text: `Un.Med.: ${unidad} |Cant.: ${cantidad}| P. Lista: ${Currency(doc.tipoMoneda, mtoValorVenta)} |Dscto.:${Currency(doc.tipoMoneda, mtoDescuento)}| V. Unit.: ${Currency(doc.tipoMoneda, mtoValorUnitario)}`, style: 'ItemTexBold' })
    })
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 1 }] })
    content.push({ text: "\n" })
    content.push({ columns: [{ width: 80, text: '', style: 'ItemHeader' }, { width: 350, text: 'Valor venta', style: 'ItemHeader' }, { width: 50, text: Currency(doc.tipoMoneda, doc.valorVenta), style: 'ItemHeader', alignment: 'right' }] },)
    content.push({ columns: [{ width: 80, text: '', style: 'ItemHeader' }, { width: 350, text: 'IGV 18.00%', style: 'ItemHeader' }, { width: 50, text: Currency(doc.tipoMoneda, doc.mtoIGV), style: 'ItemHeader', alignment: 'right' }] })
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 1 }] })
    content.push({ text: "\n" })
    content.push({ columns: [{ width: 80, text: '', style: 'ItemHeader' }, { width: 350, text: 'Precio total ', style: 'ItemHeader' }, { width: 50, text: Currency(doc.tipoMoneda, doc.mtoImpVenta), style: 'ItemHeader', alignment: 'right' }] })
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 1 }] })
    content.push({ text: "\n" })
    content.push({ text: 'Importe en letras', style: 'ItemHeader' })
    content.push({ text: "\n" })
    content.push({ text: numeroALetras().NumeroALetras(doc.mtoImpVenta / 3, doc.tipoMoneda), style: 'ItemHeader' })
    content.push({ text: 'Observaciones', style: 'ItemTexBold' })
    content.push({ text: doc.observacion })
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 1 }] })
    content.push({ text: "\n" })
    content.push({ qr: `${doc.company.ruc}|${doc.tipoDoc}|${doc.serie}|${doc.correlativo}|${doc.mtoIGV}|${doc.valorVenta}|${moment(doc.fechaEmision).format('DD-MM-YYYY')}|${doc.client.tipoDoc}|${doc.client.numDoc}|`, fit: 75, alignment: 'center' })
    content.push({ text: "\n" })
    content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 1 }] })
    content.push({ text: 'Representación impresa de la factura electrónica Autorizado mediante la Resolución de intendencia N°0340050007689 /SUNAT', style: 'subheader', alignment: 'center' })

    var printer = new pdfmake(fonts);
    var docDefinition = {
        pageSize: {
            width: 595.28,
            height: 'auto'
        },
        content: content,
        styles: {
            header: {
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 1]
            },
            subheader: {
                fontSize: 9,
                bold: true,
                margin: [0, 1, 0, 1]
            },
            paragraph: {
                fontSize: 8,
                color: 'black'
            },
            ItemHeader: {
                fontSize: 8,
                bold: true,
                color: 'black'
            },
            ItemTex: {
                fontSize: 6,
                bold: false,
                color: 'black',
                margin: [0, 5, 0, 0],
            },
            ItemTexBold: {
                fontSize: 7,
                bold: true,
                color: 'black',
                margin: [0, 5, 0, 0],
            }
        },
        patterns: {
            stripe45d: {
                boundingBox: [0, 0, 0, 0],
                xStep: 0,
                yStep: 0,
                pattern: '1 w 0 1 m 4 5 l s 2 0 m 5 3 l s'
            }
        }
    };
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(path));
    pdfDoc.end();
    callback(doc.numDoc);
}


export { createdocument }    