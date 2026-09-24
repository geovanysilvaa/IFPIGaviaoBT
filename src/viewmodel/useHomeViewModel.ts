import { useEffect, useState } from "react";
import { router } from "expo-router";
import { CardapioDataSource } from "@/model/cardapioDataSource";
import { Categoria } from "@/model/categoria";

// ============================================================================
// VIEWMODEL: useHomeViewModel
// Gerencia o estado da tela inicial (categorias) e a navegação até a
// categoria selecionada. A View (src/view/index.tsx) só lê o estado e
// dispara as ações — ela não sabe nada sobre o DataSource nem sobre rotas.
// ============================================================================

export type HomeState = {
  categorias: Categoria[];
  carregando: boolean;
};

export type HomeActions = {
  handleSelecionarCategoria: (categoriaId: string) => void;
};

// Instância criada uma única vez, no nível do módulo (e não dentro do hook),
// para não ser recriada a cada render da tela.
const dataSource = new CardapioDataSource();

export function useHomeViewModel(): [HomeState, HomeActions] {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        setCarregando(true);
        const resultado = await dataSource.buscarCategorias();
        setCategorias(resultado);
      } catch (erro: unknown) {
        console.error("Erro ao carregar categorias:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarCategorias();
  }, []);

  function handleSelecionarCategoria(categoriaId: string) {
    router.push(`/category/${categoriaId}` as any);
  }

  return [{ categorias, carregando }, { handleSelecionarCategoria }];
}
