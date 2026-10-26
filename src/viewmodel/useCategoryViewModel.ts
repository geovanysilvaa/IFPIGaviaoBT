import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { container } from "@/di/container";
import { Produto } from "@/model/entities/produto";
import { DomainError } from "@/model/errors";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { formatarPreco } from "./formatarPreco";

// ============================================================================
// VIEWMODEL: useCategoryViewModel
// Gerencia o estado da tela de listagem de itens de uma categoria. Lê apenas o
// parâmetro de rota "id" e delega toda a lógica aos Casos de Uso injetados
// (IMenuUseCases), sem conhecer datasources nem regras de negócio.
// ============================================================================

// Tipo de apresentação: o Produto do Model acrescido do preço já formatado,
// pronto para a View exibir sem precisar conhecer a regra de formatação.
export type ProdutoListItem = Produto & { precoFormatado: string };

export type CategoryState = {
  produtos: ProdutoListItem[];
  carregando: boolean;
  nomeCategoria: string;
  erro: string | null;
};

export type CategoryActions = {
  handleVoltar: () => void;
  handleSelecionarProduto: (produtoId: string) => void;
};

const NOME_CATEGORIA_PADRAO = "Cardápio";
const MENSAGEM_ERRO_PADRAO = "Não foi possível carregar os itens.";

export function useCategoryViewModel(
  useCases: IMenuUseCases = container.menuUseCases
): [CategoryState, CategoryActions] {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoriaId = Array.isArray(id) ? id[0] : id;

  const [produtos, setProdutos] = useState<ProdutoListItem[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [nomeCategoria, setNomeCategoria] = useState<string>(
    NOME_CATEGORIA_PADRAO
  );
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarProdutos() {
      if (!categoriaId) return;
      try {
        setCarregando(true);
        setErro(null);

        // Consultas independentes disparadas em paralelo para reduzir o
        // tempo total de espera da tela.
        const [resultadoProdutos, resultadoNomeCategoria] = await Promise.all([
          useCases.listarProdutosPorCategoria(categoriaId),
          useCases.obterNomeCategoria(categoriaId),
        ]);

        setProdutos(
          resultadoProdutos.map((produto) => ({
            ...produto,
            precoFormatado: formatarPreco(produto.preco),
          }))
        );
        setNomeCategoria(resultadoNomeCategoria);
      } catch (falha: unknown) {
        setErro(
          falha instanceof DomainError ? falha.message : MENSAGEM_ERRO_PADRAO
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, [categoriaId, useCases]);

  function handleVoltar() {
    router.back();
  }

  function handleSelecionarProduto(produtoId: string) {
    router.push(`/item/${produtoId}` as any);
  }

  return [
    { produtos, carregando, nomeCategoria, erro },
    { handleVoltar, handleSelecionarProduto },
  ];
}
