import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { CardapioDataSource } from "@/model/cardapioDataSource";
import { Produto } from "@/model/produto";
import { formatarPreco } from "./formatarPreco";

// ============================================================================
// VIEWMODEL: useCategoryViewModel
// Gerencia o estado da tela de listagem de itens de uma categoria: lê o
// parâmetro de rota "id", busca os produtos no DataSource e centraliza a
// navegação (voltar ao início / abrir detalhes de um produto).
// ============================================================================

// Tipo de apresentação: o Produto do Model acrescido do preço já formatado,
// pronto para a View exibir sem precisar conhecer a regra de formatação.
export type ProdutoListItem = Produto & { precoFormatado: string };

export type CategoryState = {
  produtos: ProdutoListItem[];
  carregando: boolean;
  nomeCategoria: string;
};

export type CategoryActions = {
  handleVoltar: () => void;
  handleSelecionarProduto: (produtoId: string) => void;
};

const dataSource = new CardapioDataSource();

export function useCategoryViewModel(): [CategoryState, CategoryActions] {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoriaId = Array.isArray(id) ? id[0] : id;

  const [produtos, setProdutos] = useState<ProdutoListItem[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  const nomeCategoria =
    categoriaId === "bebidas"
      ? "Bebidas"
      : categoriaId === "comidas"
      ? "Comidas"
      : "Cardápio";

  useEffect(() => {
    async function carregarProdutos() {
      if (!categoriaId) return;
      try {
        setCarregando(true);
        const resultado = await dataSource.buscarProdutosPorCategoria(
          categoriaId
        );
        setProdutos(
          resultado.map((produto) => ({
            ...produto,
            precoFormatado: formatarPreco(produto.preco),
          }))
        );
      } catch (erro: unknown) {
        console.error("Erro ao buscar produtos da categoria:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, [categoriaId]);

  function handleVoltar() {
    router.back();
  }

  function handleSelecionarProduto(produtoId: string) {
    router.push(`/item/${produtoId}` as any);
  }

  return [
    { produtos, carregando, nomeCategoria },
    { handleVoltar, handleSelecionarProduto },
  ];
}
