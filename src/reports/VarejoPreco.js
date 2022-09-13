import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function VarejoPreco(produtos) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dados = produtos.map((produtos) => {
    return [
      { text: produtos.nomeProduto.toUpperCase(), fontSize: 10, margin: [0, 2, 0, 2], alignment: 'left' },
      { text: Number(produtos.precoVenda).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), fontSize: 10, margin: [0, 2, 0, 2], alignment: 'left' }
    ]
  });

  const titleRelatorio = [
    {
      text: 'Lista de Preços Varejo',
      fontSize: 10,
      bold: false,
      alignment: 'center',
      margin: [0, 15, 0, 30]
    }
  ];

  const corpo = [
    {
      table: {
        headerRows: 1,
        widths: [450, '*', 'auto', '*'],
        body: [
          [
            { text: 'Produto', style: 'tableHeader' },
            { text: 'Valor Varejo', style: 'tableHeader' }
          ],
          ...dados
        ]
      },
      layout: 'lightHorizontalLines',
    }
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + ' / ' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0]
      }
    ]
  };

  const configDoc = {
    pageSize: 'A4',
    header: titleRelatorio,
    content: [corpo],
    footer: Rodape
  };

  pdfMake.createPdf(configDoc).open();
}

export default VarejoPreco