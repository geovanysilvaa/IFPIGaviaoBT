import { Categoria } from "@/model/entities/categoria";
import { DataSourceError } from "@/model/errors";
import { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";

// ============================================================================
// INFRAESTRUTURA: CardapioCategoryDataSource
// Implementação concreta de ICategoryDataSource sobre um "banco" em memória
// com atraso assíncrono simulando latência. Erros técnicos são convertidos em
// DataSourceError, de modo que nenhum detalhe de infraestrutura vaze para cima.
// ============================================================================

const DELAY_MS = 600; // Simula 600ms de latência de consulta local

function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CATEGORIAS: Categoria[] = [
  {
    id: "comidas",
    nome: "Comidas",
    corBorda: "#501673",
    corSeta: "#501673",
    imagem: require("../../../assets/images/menu/categoria-comidas.png"),
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    corBorda: "#1b873f",
    corSeta: "#1b873f",
    imagem: require("../../../assets/images/menu/categoria-bebidas.png"),
  },
];

export class CardapioCategoryDataSource implements ICategoryDataSource {
  async buscarCategorias(): Promise<Categoria[]> {
    try {
      await esperar(DELAY_MS);
      return [...CATEGORIAS];
    } catch (causaOriginal: unknown) {
      throw new DataSourceError(
        "Não foi possível carregar as categorias do cardápio.",
        causaOriginal
      );
    }
  }

  async buscarCategoriaPorId(id: string): Promise<Categoria | undefined> {
    try {
      await esperar(DELAY_MS);
      return CATEGORIAS.find((categoria) => categoria.id === id);
    } catch (causaOriginal: unknown) {
      throw new DataSourceError(
        "Não foi possível carregar a categoria solicitada.",
        causaOriginal
      );
    }
  }
}
