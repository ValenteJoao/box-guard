import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function EstoqueRelatorio(produtos) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dados = produtos.map((produtos) => {
    return [
      { text: produtos.nomeProduto.toUpperCase(), fontSize: 10, margin: [0, 2, 0, 2], alignment: 'left' },
      { text: Number(produtos.precoCusto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), fontSize: 10, margin: [0, 2, 0, 2], alignment: 'right' },
      { text: produtos.estoque, fontSize: 10, margin: [0, 2, 0, 2], alignment: 'center' },
      { text: produtos.estoqueFuturo, fontSize: 10, margin: [0, 2, 0, 2], alignment: 'center' },
    ]
  });

  const titleRelatorio = [
    {
      text: 'Relatório Estoque',
      fontSize: 10,
      bold: false,
      alignment: 'center',
      margin: [0, 15, 0, 100]
    }
  ];

  const corpo = [
    {
      table: {
        headerRows: 1,
        widths: [300, 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Produto', style: 'tableHeader' },
            { text: 'Custo', style: 'tableHeader', alignment: 'right' },
            { text: 'Em Estoque', style: 'tableHeader', alignment: 'center' },
            { text: 'Estoque Futuro', style: 'tableHeader', alignment: 'center' }
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

export default EstoqueRelatorio