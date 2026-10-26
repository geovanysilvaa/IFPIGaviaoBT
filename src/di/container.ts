import { CardapioCategoryDataSource } from "@/infra/datasources/cardapioCategoryDataSource";
import { CardapioProductDataSource } from "@/infra/datasources/cardapioProductDataSource";
import { IMenuUseCases } from "@/usecase/iMenuUseCases";
import { MenuUseCases } from "@/usecase/menuUseCases";

// ============================================================================
// INJEÇÃO DE DEPENDÊNCIAS: container
// Ponto único de composição da aplicação. Instancia a infraestrutura concreta
// e a conecta aos Casos de Uso, expondo apenas a abstração (IMenuUseCases).
// As ViewModels recebem este objeto por parâmetro (com default daqui), o que
// permite substituí-lo por um dublê nos testes unitários.
// ============================================================================

const categoryDataSource = new CardapioCategoryDataSource();
const productDataSource = new CardapioProductDataSource();

const menuUseCases: IMenuUseCases = new MenuUseCases(
  categoryDataSource,
  productDataSource
);

export const container = {
  menuUseCases,
};
