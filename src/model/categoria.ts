import { ImageSourcePropType } from "react-native";

// ============================================================================
// MODEL: Entidade Categoria
// Representa uma categoria do cardápio (ex.: Comidas, Bebidas).
// ============================================================================
export type Categoria = {
  id: string;
  nome: string;
  corBorda: string;
  corSeta: string;
  imagem: ImageSourcePropType;
};
