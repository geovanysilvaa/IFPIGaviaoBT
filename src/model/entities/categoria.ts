import { ImageSourcePropType } from "react-native";

// ============================================================================
// DOMÍNIO: Entidade Categoria
// Representa uma categoria do cardápio (ex.: Comidas, Bebidas).
// Entidade pura: não conhece React, rotas, datasources nem infraestrutura.
// ============================================================================
export type Categoria = {
  id: string;
  nome: string;
  corBorda: string;
  corSeta: string;
  imagem: ImageSourcePropType;
};
