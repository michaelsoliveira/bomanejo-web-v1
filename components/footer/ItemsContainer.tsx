import Item from "./Item";
import { resources, planejamento, estatistica, inventario } from "../Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 text-sm">
      <Item Links={resources} title="Recursos" />
      <Item Links={planejamento} title="Planejamento" />
      <Item Links={inventario} title="Inventário" />
      <Item Links={estatistica} title="Estatística" />
    </div>
  );
};

export default ItemsContainer;