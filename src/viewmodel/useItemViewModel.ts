import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { container } from "@/di/container";
import { Produto } from "@/model/entities/produto";
import { DomainError } from "@/model/errors";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { formatarPreco } from "./formatarPreco";

// ============================================================================
// VIEWMODEL: useItemViewModel
// Gerencia o estado da tela de detalhes do produto: delega a busca aos Casos de
// Uso injetados (IMenuUseCases), controla a quantidade selecionada e centraliza
// a navegação de volta. Não conhece datasources nem regras de domínio.
// ============================================================================

export type ItemState = {
  produto: (Produto & { precoFormatado: string }) | null;
  carregando: boolean;
  quantidade: number;
  erro: string | null;
};

export type ItemActions = {
  handleVoltar: () => void;
  handleIncrementarQuantidade: () => void;
  handleDecrementarQuantidade: () => void;
};

const MENSAGEM_ERRO_PADRAO = "Não foi possível carregar os detalhes do item.";

export function useItemViewModel(
  useCases: IMenuUseCases = container.menuUseCases
): [ItemState, ItemActions] {
  const { id } = useLocalSearchParams<{ id: string }>();
  const produtoId = Array.isArray(id) ? id[0] : id;

  const [produto, setProduto] = useState<
    (Produto & { precoFormatado: string }) | null
  >(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDetalhes() {
      if (!produtoId) return;
      try {
        setCarregando(true);
        setErro(null);
        const resultado = await useCases.obterProdutoPorId(produtoId);
        setProduto({
          ...resultado,
          precoFormatado: formatarPreco(resultado.preco),
        });
      } catch (falha: unknown) {
        setErro(
          falha instanceof DomainError ? falha.message : MENSAGEM_ERRO_PADRAO
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhes();
  }, [produtoId, useCases]);

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
    { produto, carregando, quantidade, erro },
    { handleVoltar, handleIncrementarQuantidade, handleDecrementarQuantidade },
  ];
}
