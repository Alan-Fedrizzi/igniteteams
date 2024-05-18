export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      // rota: parâmetro
      groups: undefined;
      new: undefined;
      // no caso do players, temos que saber qual group vamos adicionar
      players: {
        group: string;
      };
    }
  }
}
