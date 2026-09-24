import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { CardapioDataSource } from "@/model/cardapioDataSource";
import { Produto } from "@/model/produto";
import { formatarPreco } from "./formatarPreco";

// ============================================================================
// VIEWMODEL: useItemViewModel
// Gerencia o estado da tela de detalhes do produto: busca o produto no
// DataSource, controla a quantidade selecionada e centraliza a navegação
// de volta ao cardápio.
// ============================================================================

export type ItemState = {
  produto: (Produto & { precoFormatado: string }) | null;
  carregando: boolean;
  quantidade: number;
};

export type ItemActions = {
  handleVoltar: () => void;
  handleIncrementarQuantidade: () => void;
  handleDecrementarQuantidade: () => void;
};

const dataSource = new CardapioDataSource();

export function useItemViewModel(): [ItemState, ItemActions] {
  const { id } = useLocalSearchParams<{ id: string }>();
  const produtoId = Array.isArray(id) ? id[0] : id;

  const [produto, setProduto] = useState<
    (Produto & { precoFormatado: string }) | null
  >(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [quantidade, setQuantidade] = useState<number>(1);

  useEffect(() => {
    async function carregarDetalhes() {
      if (!produtoId) return;
      try {
        setCarregando(true);
        const resultado = await dataSource.buscarProdutoPorId(produtoId);
        setProduto(
          resultado
            ? { ...resultado, precoFormatado: formatarPreco(resultado.preco) }
            : null
        );
      } catch (erro: unknown) {
        console.error("Erro ao buscar detalhes do produto:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhes();
  }, [produtoId]);

  function handleVoltar() {
    router.back();
  }

  function handleIncrementarQuantidade() {
    setQuantidade((prev) => prev + 1);
  }

  function handleDecrementarQuantidade() {
    setQuantidade((prev) => (prev > 1 ? prev - 1 : prev));
  }

  return [
    { produto, carregando, quantidade },
    { handleVoltar, handleIncrementarQuantidade, handleDecrementarQuantidade },
  ];
}
