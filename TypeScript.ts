interface ItemDeCompra {
    nome: string;
    quantidade: number;
    categoria: string;
    comprado: boolean;
  }
  
  let listaDeCompras: ItemDeCompra[] = [];
  
  function adicionarItem(): void {
    const nome: string | null = prompt('Digite o nome do item: ');
    const quantidadeStr: string | null = prompt('Digite a quantidade do item: ');
    const categoria: string | null = prompt('Digite a categoria do item: ');
  
    if (!nome || !quantidadeStr || !categoria) {
      console.log("Todos os campos são obrigatórios.");
      return;
    }
  
    const quantidade: number = parseInt(quantidadeStr);
    if (isNaN(quantidade)) {
      console.log("Quantidade inválida.");
      return;
    }
  
    listaDeCompras.push({
      nome: nome,
      quantidade: quantidade,
      categoria: categoria,
      comprado: false
    });
    console.log(`${nome} foi adicionado à lista de compras.`);
  }
  

  function removerItem(): void {
    const nome: string | null = prompt('Digite o nome do item para remover: ');
    if (!nome) {
      console.log("Nome do item é obrigatório.");
      return;
    }
    
    const index: number = listaDeCompras.findIndex(item => item.nome === nome);
  
    if (index !== -1) {
      listaDeCompras.splice(index, 1);
      console.log(`${nome} foi removido da lista de compras.`);
    } else {
      console.log(`${nome} não encontrado na lista de compras.`);
    }
  }

  function pesquisarItem(): void {
    const nome: string | null = prompt('Digite o nome do item para pesquisar: ');
    if (!nome) {
      console.log("Nome do item é obrigatório.");
      return;
    }
    
    const item: ItemDeCompra | undefined = listaDeCompras.find(item => item.nome === nome);
  
    if (item) {
      console.log(`${nome} está na lista de compras. Detalhes: Quantidade: ${item.quantidade}, Categoria: ${item.categoria}, Comprado: ${item.comprado ? 'Sim' : 'Não'}`);
    } else {
      console.log(`${nome} não está na lista de compras.`);
    }
  }

  function ordenarLista(): void {
    const criterio: string | null = prompt("Digite o critério de ordenação (alfabetica, categoria, quantidade): ");
    
    if (!criterio) {
      console.log("Critério de ordenação é obrigatório.");
      return;
    }
  
    switch (criterio) {
      case "alfabetica":
        listaDeCompras.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case "categoria":
        listaDeCompras.sort((a, b) => a.categoria.localeCompare(b.categoria));
        break;
      case "quantidade":
        listaDeCompras.sort((a, b) => a.quantidade - b.quantidade);
        break;
      default:
        console.log("Critério de ordenação inválido.");
        return;
    }
    console.log("Lista de compras ordenada.");
  }

  function marcarItem(): void {
    const nome: string | null = prompt('Digite o nome do item para marcar como comprado/não comprado: ');
    if (!nome) {
      console.log("Nome do item é obrigatório.");
      return;
    }
  
    const item: ItemDeCompra | undefined = listaDeCompras.find(item => item.nome === nome);
  
    if (item) {
      const status: string | null = prompt(`O item está atualmente marcado como ${item.comprado ? 'comprado' : 'não comprado'}. Deseja alterá-lo? (sim/nao): `);
      if (status && status.toLowerCase() === 'sim') {
        item.comprado = !item.comprado;
        console.log(`${nome} foi marcado como ${item.comprado ? 'comprado' : 'não comprado'}.`);
      }
    } else {
      console.log(`${nome} não encontrado na lista de compras.`);
    }
  }
  function exibirLista(): void {
    if (listaDeCompras.length === 0) {
      console.log("A lista de compras está vazia.");
    } else {
      console.log("Lista de compras:");
      listaDeCompras.forEach((item, index) => {
        console.log(`${index + 1}. ${item.nome} - Quantidade: ${item.quantidade}, Categoria: ${item.categoria}, Comprado: ${item.comprado ? 'Sim' : 'Não'}`);
      });
    }
  }
  function limparLista(): void {
    listaDeCompras = [];
    console.log("A lista de compras foi limpa.");
  }
  interface ResumoCategoria {
    Categoria: string;
    Quantidade: number;
  }
  
  function resumoLista(): void {
    const totalItens: number = listaDeCompras.length;
    const totalComprados: number = listaDeCompras.filter(item => item.comprado).length;
    const totalNaoComprados: number = totalItens - totalComprados;
  
    const categorias: { [key: string]: number } = {};
    listaDeCompras.forEach(item => {
      if (!categorias[item.categoria]) {
        categorias[item.categoria] = 0;
      }
      categorias[item.categoria]++;
    });
  
    const data: ResumoCategoria[] = Object.keys(categorias).map(key => ({
      Categoria: key,
      Quantidade: categorias[key]
    }));
  
    console.log(`Total de itens: ${totalItens}`);
    console.log(`Itens comprados: ${totalComprados}`);
    console.log(`Itens não comprados: ${totalNaoComprados}`);
    console.log("Itens por categoria:");
    console.table(data);
  }
  function main(): void {
    let opcao: string | null;
    do {
      console.log("\n+----------------------------+");
      console.log("|        Menu de Opções       |");
      console.log("+----------------------------+");
      console.log("| 1 | Adicionar um item       |");
      console.log("| 2 | Remover um item         |");
      console.log("| 3 | Pesquisar item          |");
      console.log("| 4 | Ordenar a lista         |");
      console.log("| 5 | Exibir lista            |");
      console.log("| 6 | Limpar a lista          |");
      console.log("| 7 | Marcar item como comprado|");
      console.log("| 8 | Exibir resumo da lista  |");
      console.log("| 9 | Encerrar programa       |");
      console.log("+----------------------------+");
  
      opcao = prompt('Escolha uma opção: ');
      
      if (!opcao) {
        console.log("Opção inválida. Tente novamente.");
        continue;
      }
  
      switch (opcao) {
        case "1":
          adicionarItem();
          break;
        case "2":
          removerItem();
          break;
        case "3":
          pesquisarItem();
          break;
        case "4":
          ordenarLista();
          break;
        case "5":
          exibirLista();
          break;
        case "6":
          limparLista();
          break;
        case "7":
          marcarItem();
          break;
        case "8":
          resumoLista();
          break;
        case "9":
          console.log("Encerrando o programa...");
          break;
        default:
          console.log("Opção inválida. Tente novamente.");
      }

    } while (opcao !== "9");
  }
    
  main()