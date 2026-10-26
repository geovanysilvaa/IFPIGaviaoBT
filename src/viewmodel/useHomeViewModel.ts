import { useEffect, useState } from "react";
import { router } from "expo-router";
import { container } from "@/di/container";
import { Categoria } from "@/model/entities/categoria";
import { DomainError } from "@/model/errors";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";

// ============================================================================
// VIEWMODEL: useHomeViewModel
// Gerencia o estado da tela inicial (categorias) e a navegação até a
// categoria selecionada. Não conhece datasources, infraestrutura nem regras
// de negócio: depende apenas da abstração IMenuUseCases, injetada por
// parâmetro (com default do container de injeção de dependências).
// ============================================================================

export type HomeState = {
  categorias: Categoria[];
  carregando: boolean;
  erro: string | null;
};

export type HomeActions = {
  handleSelecionarCategoria: (categoriaId: string) => void;
};

const MENSAGEM_ERRO_PADRAO = "Não foi possível carregar as categorias.";

export function useHomeViewModel(
  useCases: IMenuUseCases = container.menuUseCases
): [HomeState, HomeActions] {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        setCarregando(true);
        setErro(null);
        const resultado = await useCases.listarCategorias();
        setCategorias(resultado);
      } catch (falha: unknown) {
        // Erros de domínio já trazem mensagem amigável ao usuário; qualquer
        // outro tipo (falha inesperada) cai na mensagem padrão.
        setErro(
          falha instanceof DomainError ? falha.message : MENSAGEM_ERRO_PADRAO
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarCategorias();
  }, [useCases]);

  function handleSelecionarCategoria(categoriaId: string) {
    router.push(`/category/${categoriaId}` as any);
  }

  return [{ categorias, carregando, erro }, { handleSelecionarCategoria }];
}
