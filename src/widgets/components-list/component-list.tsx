import ComponentItem from "@/features/components-item/component-item";
import { ComponentItemType, data } from "./api/data";

interface IComponentList {
  onClick: (elem: ComponentItemType) => void;
}

const ComponentList = ({ onClick }: IComponentList) => {
  return (
    <div className='flex flex-wrap gap-10'>
      {data.map((elem) => {
        return (
          <ComponentItem
            key={elem.name}
            item={elem}
            onClick={onClick}></ComponentItem>
        );
      })}
    </div>
  );
};

export default ComponentList;
